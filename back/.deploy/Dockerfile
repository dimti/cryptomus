FROM php:8.2-fpm

# Set working directory
ENV LARAVEL_PATH=/srv/app
WORKDIR $LARAVEL_PATH

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential cron curl locales zip unzip git

# Setup cron job
RUN (crontab -l ; echo "* * * * * /usr/local/bin/php /srv/app/artisan schedule:run >> /dev/null 2>&1") | crontab

# Install supervisord
COPY --from=ochinchina/supervisord:latest /usr/local/bin/supervisord /usr/local/bin/supervisord

# Install caddy
COPY --from=caddy:2.0.0 /usr/bin/caddy /usr/local/bin/caddy

# Install PHP extensions
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/
RUN install-php-extensions intl bcmath gd pdo_mysql pdo_pgsql opcache pcntl zip mysqli

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install composer & app dependencies
COPY --from=composer:2.7.2 /usr/bin/composer /usr/local/bin/composer
COPY ./back/composer.json composer.json
COPY ./back/composer.lock composer.lock
RUN composer install --prefer-dist --no-scripts --no-dev --no-autoloader && rm -rf /root/.composer

# Copy app
COPY --chown=www-data:www-data ./back $LARAVEL_PATH/
RUN chmod -R 775 $LARAVEL_PATH/storage
COPY ./.deploy $LARAVEL_PATH/.deploy

# Set any ENVs
ARG APP_DEBUG=${APP_DEBUG}
ARG APP_URL=${APP_URL}
ARG APP_TIMEZONE=${APP_TIMEZONE}

ARG SESSION_DOMAIN=${SESSION_DOMAIN}

# Start app
EXPOSE 80
COPY ./.deploy/entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
