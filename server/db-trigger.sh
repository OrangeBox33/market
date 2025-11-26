#!/bin/bash
set -e

echo "Setting up PostgreSQL triggers for Product table…"

npx prisma db execute --stdin <<'EOSQL'
-- Создаём функцию триггера
CREATE OR REPLACE FUNCTION notify_product_change()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('product_change', 'update');
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Создаём триггер, если его ещё нет
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'product_change_trigger'
  ) THEN
    CREATE TRIGGER product_change_trigger
    AFTER INSERT OR UPDATE OR DELETE ON "Product"
    FOR EACH STATEMENT
    EXECUTE FUNCTION notify_product_change();
  END IF;
END;
$$;
EOSQL

echo "✅ Triggers set up successfully."
