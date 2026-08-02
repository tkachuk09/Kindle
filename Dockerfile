# --- frontend build ---
FROM node:22-alpine AS frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# --- backend build ---
FROM golang:1.25-alpine AS backend
WORKDIR /app
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/ ./
RUN CGO_ENABLED=0 go build -o kindle .

# --- final image ---
FROM alpine:3.20
WORKDIR /app
COPY --from=backend /app/kindle ./kindle
COPY --from=frontend /app/dist ./web

ENV ADDR=:8080
ENV DB_PATH=/data/kindle.db
ENV STATIC_DIR=/app/web

VOLUME ["/data"]
EXPOSE 8080

ENTRYPOINT ["./kindle"]