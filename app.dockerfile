FROM php:7.2.9-fpm-stretch

RUN apt-get update && apt-get install -y libmcrypt-dev \
    curl mysql-client --no-install-recommends \
# libmagickwand-dev
#    && pecl install imagick \
#    && docker-php-ext-enable imagick \
&& docker-php-ext-install pdo_mysql
# curl
# json mbstring
# mcrypt