FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libpq-dev \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_pgsql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy composer files first
COPY composer.json composer.lock* ./

# Install PHP dependencies (including dev dependencies for testing)
RUN composer install --optimize-autoloader --no-scripts

# Copy existing application directory contents
COPY . /var/www/html

# Create Laravel required directories before running composer scripts
RUN mkdir -p /var/www/html/bootstrap/cache \
    && mkdir -p /var/www/html/storage/app/public \
    && mkdir -p /var/www/html/storage/framework/cache \
    && mkdir -p /var/www/html/storage/framework/sessions \
    && mkdir -p /var/www/html/storage/framework/views \
    && mkdir -p /var/www/html/storage/logs

# Set basic ownership (permissions will be set at runtime)
RUN chown -R www-data:www-data /var/www/html

# Copy and set executable permissions for entrypoint script (after copying app files)
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN chown -R www-data:www-data /var/www/html

# Run composer scripts now that artisan exists
RUN composer dump-autoload --optimize

# Generate application key if not set
RUN php artisan key:generate --ansi

# Copy Apache virtual host configuration
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# Expose port 80
EXPOSE 80

# Start with entrypoint script
CMD ["/usr/local/bin/docker-entrypoint.sh"]