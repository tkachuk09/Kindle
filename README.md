# 🔥 Kindle

A personal habit & goal tracker, built to actually feel good to use — not another checkbox list.

Every day you check off a habit, you're kindling a small fire that keeps burning as long as you stay consistent. Miss a day and it dims, but it doesn't go out — the whole point is building real discipline without the all-or-nothing pressure that kills motivation.

## Status

🚧 **Early build.** Currently just the project skeleton — API, database, and frontend are wired together and running, but there are no habits yet. See [Roadmap](#roadmap).

## Stack

- **Backend:** Go, plain `net/http`, SQLite (pure-Go driver, no CGO)
- **Frontend:** React + Vite + Tailwind CSS + Framer Motion
- **Packaging:** single Docker image (multi-stage build), one container, one volume for the SQLite file — no external services, no domain, runs entirely on your machine

## Running it

```bash
docker compose up --build
```

Then open **http://localhost:8080**.

Data persists in a Docker volume (`kindle-data`) between restarts.

## Roadmap

- [x] **M0** — project skeleton: Go API + React + SQLite + Docker, end-to-end health check
- [ ] **M1** — habit CRUD (add / edit / delete)
- [ ] **M2** — daily check-ins, streaks, per-habit progress rings
- [ ] **M3** — aggregate Wellness Score with a living flame visual
- [ ] **M4** — design polish pass