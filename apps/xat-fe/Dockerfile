FROM my-base-image:nx-base AS builder

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN npx nx build xat-fe ${BUILD_FLAG}

FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/builder/dist/apps/xat-fe ./
COPY --from=builder /app/builder/apps/xat-fe/nginx.conf /etc/nginx/nginx.conf
