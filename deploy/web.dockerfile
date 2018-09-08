FROM nginx:1.10

ADD deploy/nginx/vhost.conf /etc/nginx/conf.d/default.conf