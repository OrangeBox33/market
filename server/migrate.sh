#!/bin/bash
set -e

# Проверка: передан ли аргумент
if [ -z "$1" ]; then
  echo "Usage: ./migrate.sh <migration_name>"
  exit 1
fi

MIGRATION_NAME=$1

npx prisma migrate dev --schema server/prisma/schema.prisma --name "$MIGRATION_NAME"
npx prisma generate --schema server/prisma/schema.prisma