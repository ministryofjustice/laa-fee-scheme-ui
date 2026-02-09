FROM nginxinc/nginx-unprivileged:stable-alpine
COPY www /usr/share/nginx/html

EXPOSE 8080
