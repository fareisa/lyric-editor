#Frontend

FROM node:22-bookworm-slim AS frontend-builder

WORKDIR /build/frontend

COPY frontend/package*.json ./

RUN npm ci

COPY frontend/ ./

RUN npm run build

#Backend

FROM node:22-bookworm-slim AS backend-builder

WORKDIR /build/backend

COPY backend/package*.json ./

RUN npm ci --omit=dev

COPY backend/ ./

#Runtime

FROM node:22-bookworm-slim

RUN apt-get update && \
  apt-get install -y --no-install-recommends nginx curl && \
  rm -f /etc/nginx/sites-enabled/default && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=backend-builder \
  /build/backend ./backend

COPY --from=frontend-builder \
  /build/frontend/dist /usr/share/nginx/html

COPY docker/nginx.conf \
  /etc/nginx/conf.d/default.conf

COPY docker/entrypoint.sh \
  /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT [ "/entrypoint.sh" ]
