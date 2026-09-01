# WintersNet

The wintersnet.net website. A modern rebuild of a site that has existed in one
form or another since 2003.

## Stack

- **Framework:** Next.js 16 (App Router, TypeScript, React 19)
- **Styling:** Tailwind CSS v4 with a custom theme + dark/light toggle
- **Hosting:** Hetzner + [Coolify](https://coolify.io) (Docker, standalone Next.js build) — migrated off Railway in May 2026, see [`../IRCx-Server/MIGRATE.md`](../IRCx-Server/MIGRATE.md) for the cross-service runbook
- **Auto-deploy:** Pushes to `main` deploy automatically.

## Pages

| Route         | Notes                                                     |
| ------------- | --------------------------------------------------------- |
| `/`           | Home                                                      |
| `/about`      | About Nathan                                              |
| `/history`    | History of MSN Chat (long-form, cited on Wikipedia)       |
| `/minecraft`  | Family Minecraft server                                   |
| `/projects`   | Active projects                                           |
| `/admin`      | CMS (password protected)                                  |
| `/history.php`| 301 redirect → `/history` (preserved for inbound links)   |
| `/about.php`  | 301 redirect → `/about`                                   |
| `/index.php`  | 301 redirect → `/`                                        |

The `.php` redirects are configured in [`next.config.ts`](./next.config.ts).

## CMS

The public site is driven by a file-based CMS at `/admin`. Sign in with
`CMS_PASSWORD`. Every page, the nav, the footer, and SEO fields are editable
with WYSIWYG editors; images upload into `data/uploads`.

Copy [`.env.example`](.env.example) to `.env.local` and set:

- `CMS_PASSWORD` — the admin password
- `CMS_SECRET` — a long random string used to sign the login cookie
- `DATA_DIR` — optional, defaults to `./data`

Live content is stored in `$DATA_DIR/content.json`. If that file is missing,
the committed seed in `src/lib/cms` is copied in on first request.

**Coolify:** add a persistent volume at `/app/data`. Without it, CMS edits
and uploaded images are lost on every deploy. Also set `CMS_PASSWORD` and
`CMS_SECRET` in the service environment.

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Production build (local)

```bash
npm run build
npm run start
```

## Docker

```bash
docker build -t wintersnet .
docker run -p 3000:3000 -v wintersnet-data:/app/data wintersnet
```

## Deploying

The repo is connected to Coolify (Hetzner). Pushes to `main` trigger an
automatic container build and deploy via the included `Dockerfile`.
