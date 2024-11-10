FROM php:8.3.13-apache-bookworm

# arguments defined in the docker-compose.yaml file
ARG user
ARG uid

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y \
    procps \
    vim \
    git \
    unzip \
    supervisor \
    cron \
    libzip-dev \  
    libpq-dev \
    libreadline-dev \
    libicu-dev \
    sudo

RUN pecl install redis


RUN docker-php-ext-configure intl \
    && docker-php-ext-install intl \
    && docker-php-ext-install zip \
    && docker-php-ext-install sockets \
    && docker-php-ext-install opcache \
    && docker-php-ext-enable redis \
    && docker-php-ext-install bcmath
    # docker-php-ext-install pdo_pgsql \
    # && docker-php-ext-enable pdo_pgsql \
    # && docker-php-ext-install pgsql \
    # && docker-php-ext-enable pgsql \

    # 2. apache configs + document root
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Changing default por for VITE
RUN sed -i "s/Listen 80/Listen 8000/g" /etc/apache2/ports.conf
RUN sed -i "s/:80/:8000/g" /etc/apache2/sites-enabled/000-default.conf


# 3. mod_rewrite for URL rewrite and mod_headers for .htaccess extra headers like Access-Control-Allow-Origin-
RUN a2enmod rewrite headers

# 4. start with base php config, then add extensions
#RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
COPY docker/php/*.ini /usr/local/etc/php/conf.d/


# 5. composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 6. we need a user with the same UID/GID with host user
# so when we execute CLI commands, all the host file's ownership remains intact
# otherwise command from inside container will create root-owned files and directories


# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user && \
    chown -R $user:$user /var/www/html


WORKDIR /var/www/html

RUN apt-get update && apt-get install -y npm

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
RUN apt-get update && apt-get install -y nodejs
RUN npm install npm@10.2.5 -g


# Supervisor config & startup
# We need to modify this so we can select what services we want active!!!!!
COPY docker/supervisor/*.conf /etc/supervisor/conf.d/
#COPY docker/web/supervisor/workers/*.conf /etc/supervisor/conf.d/

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]

# Exposed ports
EXPOSE 8000
