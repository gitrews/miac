#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="$PROJECT_ROOT/dist"
DEPLOY_DIR="${DEPLOY_DIR:-/var/www/miac/dist}"
BACKUP_ROOT="${BACKUP_ROOT:-/var/www/miac/.deploy-backups}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"

cd "$PROJECT_ROOT"
npm run build

if [[ ! -f "$BUILD_DIR/index.html" ]]; then
  echo "Build output is missing: $BUILD_DIR/index.html" >&2
  exit 1
fi

mkdir -p "$DEPLOY_DIR" "$BACKUP_ROOT"

if [[ -d "$DEPLOY_DIR" ]]; then
  mkdir -p "$BACKUP_ROOT/$TIMESTAMP"
  rsync -a --delete "$DEPLOY_DIR"/ "$BACKUP_ROOT/$TIMESTAMP"/
fi

rsync -a --delete "$BUILD_DIR"/ "$DEPLOY_DIR"/

echo "Deployed $BUILD_DIR -> $DEPLOY_DIR"
echo "Previous deploy backup: $BACKUP_ROOT/$TIMESTAMP"
