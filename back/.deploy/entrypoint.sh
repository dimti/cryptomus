#!/bin/sh

echo "🎬 entrypoint.sh"

composer install

echo "🎬 artisan commands"

php artisan cache:clear
php artisan migrate --force
chown -R www-data:www-data $LARAVEL_PATH/storage/
chmod -R 775 $LARAVEL_PATH/storage/

echo "🎬 start supervisord"

supervisord -c $LARAVEL_PATH/.deploy/config/supervisor.conf
