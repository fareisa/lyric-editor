#Frontend

FROM node:22-bookworm-slim AS frontend-builder

WORKDIR /build/frontend

COPY frontend/packages*.json ./

RUN npm ci

COPY frontend/ ./

RUN npm run build

#Backend

FROM node:22-bookworm-slim AS backend-builder

WORKDIR /build/backend

COPY frontend/packages*.json ./

RUN npm ci --omit=dev