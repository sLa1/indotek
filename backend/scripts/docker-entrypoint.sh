#!/bin/bash

# Set Laravel database configuration
# Railway production: uses PGHOST, PGPORT, etc.
# Local development: uses DATABASE_HOST, DATABASE_PORT, etc. from docker-compose
# Fallback: uses values from .env file

if [ -n "$PGHOST" ]; then
    # Railway environment
    export DB_CONNECTION=pgsql
    export DB_HOST=$PGHOST
    export DB_PORT=$PGPORT
    export DB_DATABASE=$PGDATABASE
    export DB_USERNAME=$PGUSER
    export DB_PASSWORD=$PGPASSWORD
elif [ -n "$DATABASE_HOST" ]; then
    # Local Docker Compose environment
    export DB_CONNECTION=pgsql
    export DB_HOST=$DATABASE_HOST
    export DB_PORT=${DATABASE_PORT:-5432}
    export DB_DATABASE=$DATABASE_NAME
    export DB_USERNAME=$DATABASE_USER
    export DB_PASSWORD=$DATABASE_PASSWORD
fi

# Wait for database to be ready
until php artisan migrate:status > /dev/null 2>&1; do
    sleep 2
done

# Run migrations
php artisan migrate --force

# Run seeders
php artisan db:seed --force

# Start Apache
exec apache2-foreground
