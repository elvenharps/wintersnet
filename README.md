# WintersNet

The wintersnet.net website. A modern rebuild of a site that has existed in one
form or another since 2003.

## Stack

- **Framework:** Next.js 16 (App Router, TypeScript, React 19)
- **Styling:** Tailwind CSS v4 with a custom theme + dark/light toggle
- **Hosting:** Railway (Docker, standalone Next.js build)
- **Auto-deploy:** Pushes to `main` deploy automatically.

## Pages

| Route         | Notes                                                     |
| ------------- | --------------------------------------------------------- |
| `/`           | Home                                                      |
| `/about`      | About Nathan                                              |
| `/history`    | History of MSN Chat (long-form, cited on Wikipedia)       |
| `/history.php`| 301 redirect → `/history` (preserved for inbound links)   |
| `/about.php`  | 301 redirect → `/about`                                   |
| `/index.php`  | 301 redirect → `/`                                        |

The `.php` redirects are configured in [`next.config.ts`](./next.config.ts).

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
docker run -p 3000:3000 wintersnet
```

## Deploying

The repo is connected to Railway. Pushes to `main` trigger an automatic
container build and deploy via the included `Dockerfile`.
