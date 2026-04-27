# AGENTS.md

## Project Paths

- Work on the project in `/root/projects/miac`.
- The live site is served from `/var/www/miac/dist` by Caddy for `https://yamiac.ru/`.
- Do not edit `/var/www/miac/dist` directly. It is deploy output.

## Updating The Site

Use the deploy script from the working repository:

```bash
cd /root/projects/miac
npm run deploy
```

`npm run deploy` runs the production build, creates a backup of the current live `dist`, and syncs the new build into `/var/www/miac/dist`.

Backups are stored in:

```bash
/var/www/miac/.deploy-backups/
```

After deployment, verify the live site:

```bash
curl -I https://yamiac.ru/
```

Expected result: `HTTP/2 200`.

## Development Flow

- Make source changes only in `/root/projects/miac`.
- Run `npm run build` before deploying when you want to verify build output without updating the live site.
- Run `npm run deploy` only when the changes are ready to publish.
- Commit project changes from `/root/projects/miac`; do not use `/var/www/miac` as the working repo.
