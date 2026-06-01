# Piano Auction

Monorepo for the Piano Auction MVP, built with Laravel backend and React/Vite frontend.

## Repository layout

- `backend/` — Laravel API, PHP backend, database, and server-side logic
- `frontend/` — React app with Vite bundler and UI components
- `.ai/skills/` — AI workspace support and local skill metadata
- `PROJECT_CONTEXT.md` — business context and product goals
- `ARCHITECTURE.md` — system architecture and integration notes

## Git strategy

- `main` — production-ready releases
- `development` — active integration branch for MVP development

### Recommended workflow

1. Develop on `development`
2. Merge or rebase into `main` only when the code is stable
3. Keep backend and frontend changes in the same repo, but clearly separate by folder

## Commit conventions

Use clean, conventional commit prefixes for rapid team review:

- `feat:` — new feature or capability
- `fix:` — bug fix
- `refactor:` — code refactor without behavior change
- `chore:` — maintenance, docs, tooling, or setup

## Safe Git workflow

- Use `development` as the active working branch for daily changes.
- Create pull requests into `development` for review and integration.
- Merge into `main` only for release-ready snapshots.
- Never run `git add`, `git commit`, `git push`, branch merge, or branch delete without explicit confirmation.
- Follow the commit prefixes exactly to keep changes clean and traceable.

### Examples

- `feat: add auction event listing endpoint`
- `fix: resolve login session issue`
- `refactor: simplify bid validation logic`
- `chore: add gitignore and workflow setup`

## Daily commit workflow

This project includes a GitHub Actions workflow that runs daily and records a daily check-in file.

- Workflow file: `.github/workflows/daily-commit.yml`
- Branch guard workflow: `.github/workflows/branch-management.yml`
- Target branch: `development`

> The workflow commits only when there is a change to `.github/daily-checkin.log`.
>
> The branch guard workflow helps enforce safe pushes and commit conventions, while still keeping the repository optimized for MVP development.

## Setup commands

### Initialize repository locally

```bash
cd piano-auction
git init
git add .
git commit -m "chore: initial repository setup"
git branch -M main
git branch development
```

### Connect GitHub remote

```bash
git remote add origin https://github.com/<your-org-or-user>/piano-auction.git
git push -u origin main
git push -u origin development
```

### Backend bootstrapping

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

### Frontend bootstrapping

```bash
cd frontend
npm install
npm run dev
```

## Notes

- Keep `backend/` and `frontend/` tracked in a single monorepo, but develop them as separate subsystems.
- Avoid checking in generated build artifacts, environment files, or package manager caches.
- Use `main` for stable releases and `development` for everyday feature integration.
