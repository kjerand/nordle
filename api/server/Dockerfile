FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY dist/ dist/

ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/index.js"]
