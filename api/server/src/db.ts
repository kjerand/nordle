import mysql from 'mysql2/promise';

const isCloudRun = !!process.env.CLOUD_SQL_CONNECTION_NAME;

export const pool = mysql.createPool(
    isCloudRun
        ? {
              user: process.env.CLOUD_SQL_USER,
              password: process.env.CLOUD_SQL_PASSWORD,
              database: process.env.CLOUD_SQL_DATABASE,
              socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
          }
        : {
              user: process.env.CLOUD_SQL_USER || 'nordle-admin',
              password: process.env.CLOUD_SQL_PASSWORD || '',
              database: process.env.CLOUD_SQL_DATABASE || 'nordle-leaderboard',
              host: process.env.DB_HOST || '34.62.240.80',
              port: parseInt(process.env.DB_PORT || '3306', 10)
          }
);
