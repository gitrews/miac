# AGENTS.md

## Project Paths

- Production worktree: `/root/projects/miac` on branch `main`.
- Development worktree: `/root/projects/miac-dev` on branch `dev`.
- The production site is served from `/var/www/miac/dist` by Caddy for `https://yamiac.ru/`.
- The development site is served from `/var/www/miac-dev/dist` by Caddy for `http://dev.yamiac.ru/`.
- `dev.yamiac.ru` is intentionally HTTP-only until DNS is configured; after DNS points to this server, switch the Caddy site label from `http://dev.yamiac.ru` to `dev.yamiac.ru` to enable automatic HTTPS.
- Do not edit `/var/www/miac/dist` or `/var/www/miac-dev/dist` directly. They are deploy outputs.

## Updating Production

Deploy production from `main`:

```bash
cd /root/projects/miac
npm run deploy
```

`npm run deploy` runs the production build, creates a backup of the current live `dist`, and syncs the new build into `/var/www/miac/dist`.

Production backups are stored in:

```bash
/var/www/miac/.deploy-backups/
```

After deployment, verify the live site:

```bash
curl -I https://yamiac.ru/
```

Expected result: `HTTP/2 200`.

## Updating Development

Deploy development from `dev`:

```bash
cd /root/projects/miac-dev
npm run deploy:dev
```

`npm run deploy:dev` runs the production build for the dev branch, creates a backup of the current dev `dist`, and syncs the new build into `/var/www/miac-dev/dist`.

Development backups are stored in:

```bash
/var/www/miac-dev/.deploy-backups/
```

After deployment, verify the dev site:

```bash
curl -I http://dev.yamiac.ru/
```

Expected result after DNS is configured: `HTTP/1.1 200 OK`.

## Development Flow

- Make feature/source changes on branch `dev` in `/root/projects/miac-dev`.
- Merge `dev` into `main` only when changes are ready for production.
- Run `npm run build` before deploying when you want to verify build output without updating the live site.
- Run `npm run deploy:dev` to publish the current `dev` branch to the dev stand.
- Run `npm run deploy` only from `main` when changes are ready to publish to production.
- Commit project changes from `/root/projects/miac` or `/root/projects/miac-dev`; do not use `/var/www/miac` or `/var/www/miac-dev` as working repos.
