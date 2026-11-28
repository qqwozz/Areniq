# Areniq

A minimal full-stack application scaffold with a React and TypeScript frontend, a Go API, and Docker Compose.

## Requirements

- Node.js 20 or later
- Go 1.24 or later
- Docker with the Compose plugin (optional)

## Run locally

Start the API in one terminal:

```sh
cd backend
go run .
```

Start the frontend in another terminal:

```sh
cd frontend
npm install
npm run dev
```

Open <http://localhost:5173>. The Vite development server proxies `/api` requests to the Go service at `http://localhost:8080`.

## Run with Docker

From the repository root:

```sh
docker compose up --build
```

Open <http://localhost:8080>. The frontend container serves the application and proxies API requests to the backend container. Stop the services with `Ctrl+C` or `docker compose down`.

## API

- `GET /api/health` returns `{"status":"ok"}`.

Run the backend tests with `cd backend && go test ./...`.

## Project layout

```text
backend/      Go HTTP API and tests
frontend/     React + TypeScript application
docker/       Nginx configuration for the frontend container
compose.yaml  Local multi-container setup
```
