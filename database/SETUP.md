# Google Cloud Database & API Setup

The API server lives in `api/server/` in this repo.

## 1. Create a Google Cloud Project

```bash
# Install the gcloud CLI if you haven't already:
# https://cloud.google.com/sdk/docs/install

gcloud auth login
gcloud projects create nordle-project --name="Nordle"
gcloud config set project nordle-project

# Enable required APIs
gcloud services enable \
  sqladmin.googleapis.com \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  secretmanager.googleapis.com
```

## 2. Create the Cloud SQL (MySQL) Instance

### Via gcloud CLI

```bash
# Create a MySQL 8.0 instance (db-f1-micro is the smallest/cheapest)
gcloud sql instances create nordle-sql \
  --database-version=MYSQL_8_0 \
  --tier=db-f1-micro \
  --region=europe-west1 \
  --storage-size=10GB \
  --storage-type=SSD

# Set the root password
gcloud sql users set-password root \
  --instance=nordle-sql \
  --password='<your-password>'

# Create a dedicated user
gcloud sql users create nordle-admin \
  --instance=nordle-sql \
  --password='<your-password>'

# Create the database
gcloud sql databases create nordle-leaderboard \
  --instance=nordle-sql
```

### Via Google Cloud Console

1. Go to [console.cloud.google.com/sql](https://console.cloud.google.com/sql).
2. Click **Create Instance** → **MySQL**.
3. Fill in:
   - **Instance ID**: `nordle-sql`
   - **Password** for `root` user: choose a strong password
   - **Region**: `europe-west1` (Belgium, closest to Norway)
   - **Machine type**: Shared core → `db-f1-micro`
   - **Storage**: 10 GB SSD
4. Click **Create**.
5. After it's ready, go to **Users** → **Add user account**:
   - Username: `nordle-admin`, set a password.
6. Go to **Databases** → **Create database**:
   - Name: `nordle-leaderboard`.

## 3. Run the Schema

### Option A: Cloud Shell

1. Open [Cloud Shell](https://console.cloud.google.com/?cloudshell=true).
2. Connect to the instance:
   ```bash
   gcloud sql connect nordle-sql --user=nordle-admin --database=nordle-leaderboard
   ```
3. Paste the contents of `database/schema.sql` and press Enter.

### Option B: Cloud SQL Auth Proxy (local machine)

```bash
# Download the proxy
# macOS:
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.11.0/cloud-sql-proxy.darwin.arm64
chmod +x cloud-sql-proxy

# Start the proxy (runs in the background)
./cloud-sql-proxy nordle-project:europe-west1:nordle-sql &

# Connect with mysql and run the schema
mysql -h 127.0.0.1 -P 3306 -u nordle-admin -p nordle-leaderboard < database/schema.sql
```

### Option C: Any MySQL client

Connect to `127.0.0.1:3306` (via the proxy) with your credentials and execute `schema.sql`.

## 4. Run the API Server Locally

```bash
cd api/server
npm install
```

Start the Cloud SQL Auth Proxy in a separate terminal (see step 3B), then:

```bash
# Set env vars for the local database connection
export CLOUD_SQL_USER=nordle-admin
export CLOUD_SQL_PASSWORD='<your-password>'
export CLOUD_SQL_DATABASE=nordle-leaderboard
export DB_HOST=127.0.0.1
export DB_PORT=3306

npm run dev
```

The API is now running at `http://localhost:8080/api`.

For mobile app development, set your `.env`:

```
API_BASE_URL=http://localhost:8080/api
```

## 5. Deploy to Cloud Run

### Store the DB password in Secret Manager

```bash
echo -n '<your-password>' | gcloud secrets create nordle-db-password \
  --data-file=- \
  --replication-policy=automatic
```

### Build and deploy

```bash
cd api/server

# Compile TypeScript
npm run build

# Deploy to Cloud Run
gcloud run deploy nordle-api \
  --source=. \
  --region=europe-west1 \
  --platform=managed \
  --allow-unauthenticated \
  --add-cloudsql-instances=nordle-project:europe-west1:nordle-sql \
  --set-env-vars="CLOUD_SQL_CONNECTION_NAME=nordle-project:europe-west1:nordle-sql" \
  --set-env-vars="CLOUD_SQL_DATABASE=nordle-leaderboard" \
  --set-env-vars="CLOUD_SQL_USER=nordle-admin" \
  --set-secrets="CLOUD_SQL_PASSWORD=nordle-db-password:latest"
```

Cloud Run will print the service URL (e.g. `https://nordle-api-abc123-ew.a.run.app`).

### Update the mobile app

Set the production URL in `.env` and EAS secrets:

```bash
# .env
API_BASE_URL=https://nordle-api-abc123-ew.a.run.app/api

# EAS Build
eas secret:create --name API_BASE_URL --value "https://nordle-api-abc123-ew.a.run.app/api"
```

## 6. API Endpoints

| Method | Path                        | Body / Query                                 |
|--------|-----------------------------|----------------------------------------------|
| POST   | `/api/register`             | `{ playerId, displayName }`                  |
| POST   | `/api/opt-out`              | `{ playerId }`                               |
| POST   | `/api/opt-in`               | `{ playerId }`                               |
| POST   | `/api/scores`               | `{ playerId, dailyStreak, totalWordsSolved }` |
| GET    | `/api/leaderboard/streak`   | `?playerId=...`                              |
| GET    | `/api/leaderboard/total`    | `?playerId=...`                              |
| GET    | `/api/profile`              | `?playerId=...`                              |

## 7. Verify

```bash
# Check the API is responding
curl https://nordle-api-abc123-ew.a.run.app/api/leaderboard/streak?playerId=test

# Check the database has the tables (via proxy)
mysql -h 127.0.0.1 -P 3306 -u nordle-admin -p nordle-leaderboard -e "SHOW TABLES;"
```

## Cost Estimate

| Resource                | Tier              | ~Monthly Cost |
|-------------------------|-------------------|---------------|
| Cloud SQL (MySQL)       | db-f1-micro       | ~$7           |
| Cloud Run               | Pay-per-request   | ~$0–5         |
| **Total**               |                   | **~$7–12/month** |

Cloud Run charges only for actual requests, so idle costs are near zero. Scale up the SQL instance if traffic grows.
