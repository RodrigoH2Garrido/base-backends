docker exec -it base-laravel-frontend bash -c "
  if [ -d /var/www/html/node_modules ]; then
    echo 'node_modules directory does exist, skipping base installation.'
  else
    composer global require laravel/installer
    composer global show
    export PATH=\$PATH:/root/.config/composer/vendor/bin && laravel new example-app
    cp -r example-app/* /var/www/html/
    rm -rf example-app
  fi
"
# docker exec -it base-laravel-frontend bash -c "composer global require laravel/installer"
# docker exec -it base-laravel-frontend bash -c "composer global show"
# docker exec -it base-laravel-frontend bash -c "export PATH=\$PATH:/root/.config/composer/vendor/bin && laravel new example-app"
# docker exec -it base-laravel-frontend bash -c "cp -r example-app/* /var/www/html/"
# docker exec -it base-laravel-frontend bash -c "rm -rf example-app"
docker exec -it base-laravel-frontend bash -c "chmod -R 755 storage"
docker exec -it base-laravel-frontend bash -c "chmod -R g+s storage"
docker exec -it base-laravel-frontend bash -c "chown -R www-data:www-data storage"
docker exec -it base-laravel-frontend bash -c "chmod -R 755 bootstrap"
docker exec -it base-laravel-frontend bash -c "composer install"
docker exec -it base-laravel-frontend bash -c "php artisan optimize"
docker exec -it base-laravel-frontend bash -c "npm install"
docker exec -it base-laravel-frontend bash -c "npm run build"