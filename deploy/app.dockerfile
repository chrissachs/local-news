FROM php:7.2.9-fpm-stretch

RUN apt-get update && apt-get install -y libmcrypt-dev \
    curl mysql-client supervisor --no-install-recommends \
    && docker-php-ext-install pdo_mysql

COPY deploy/supervisor/* /etc/supervisor/conf.d/
COPY deploy/app-entry.sh /usr/local/bin/start
RUN chmod +x /usr/local/bin/start
#RUN service supervisor start
CMD ["/usr/local/bin/start"]
#RUN chmod -Rf 777 /var/www/bootstrap/cache