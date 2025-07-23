#!/bin/bash

echo "=== Docker Entrypoint Script Started ==="

# Set Laravel database configuration
# Railway production: uses PGHOST, PGPORT, etc. OR DATABASE_URL
# Local development: uses DATABASE_HOST, DATABASE_PORT, etc. from docker-compose
# Fallback: uses values from .env file

if [ -n "$DATABASE_URL" ]; then
    # Railway environment with DATABASE_URL (simplest)
    echo "Using DATABASE_URL configuration"
    export DATABASE_URL=$DATABASE_URL
    echo "DATABASE_URL: ${DATABASE_URL:0:30}..." # Show only first 30 chars for security
elif [ -n "$PGHOST" ]; then
    # Railway environment with individual variables
    echo "Using Railway individual variables"
    export DB_CONNECTION=pgsql
    export DB_HOST=$PGHOST
    export DB_PORT=$PGPORT
    export DB_DATABASE=$PGDATABASE
    export DB_USERNAME=$PGUSER
    export DB_PASSWORD=$PGPASSWORD
    echo "DB_HOST: $DB_HOST"
    echo "DB_PORT: $DB_PORT"
    echo "DB_DATABASE: $DB_DATABASE"
    echo "DB_USERNAME: $DB_USERNAME"
elif [ -n "$DATABASE_HOST" ]; then
    # Local Docker Compose environment
    echo "Using local Docker Compose configuration"
    export DB_CONNECTION=pgsql
    export DB_HOST=$DATABASE_HOST
    export DB_PORT=${DATABASE_PORT:-5432}
    export DB_DATABASE=$DATABASE_NAME
    export DB_USERNAME=$DATABASE_USER
    export DB_PASSWORD=$DATABASE_PASSWORD
    echo "DB_HOST: $DB_HOST"
    echo "DB_PORT: $DB_PORT"
    echo "DB_DATABASE: $DB_DATABASE"
else
    echo "Using .env file configuration"
fi

# Wait for database to be ready
echo "Waiting for database connection..."
echo "Testing database connectivity..."

# Try to connect with a longer timeout and more detailed error reporting
attempt=1
max_attempts=30

until php artisan migrate:status 2>&1; do
    echo "Attempt $attempt/$max_attempts: Database not ready, retrying in 5 seconds..."
    if [ $attempt -eq $max_attempts ]; then
        echo "ERROR: Could not connect to database after $max_attempts attempts"
        echo "Current environment variables:"
        env | grep -E "(DATABASE|DB_|PG)" | sort
        echo "Laravel database config test:"
        php artisan config:show database
        exit 1
    fi
    sleep 5
    attempt=$((attempt + 1))
done
echo "Database connection established!"

# Run migrations
echo "Running database migrations..."
php artisan migrate --force
echo "Migrations completed!"

# Run seeders
echo "Running database seeders..."
php artisan db:seed --force
echo "Seeders completed!"

# Start Apache
echo "Starting Apache server..."
exec apache2-foreground
