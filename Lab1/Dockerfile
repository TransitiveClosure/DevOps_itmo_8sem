FROM alpine:3.21.3

RUN apk add --no-cache openssl curl ca-certificates && \
    printf "%s%s%s%s\n" \
    "@nginx " \
    "http://nginx.org/packages/alpine/v" \
    `egrep -o '^[0-9]+\.[0-9]+' /etc/alpine-release` \
    "/main" \
    | tee -a /etc/apk/repositories && \
    curl -o /tmp/nginx_signing.rsa.pub https://nginx.org/keys/nginx_signing.rsa.pub && \
    openssl rsa -pubin -in /tmp/nginx_signing.rsa.pub -text -noout && \
    mv /tmp/nginx_signing.rsa.pub /etc/apk/keys/ && \
    apk add nginx@nginx && \
    mkdir -p /var/www/static_html && \
    chown -R nginx:nginx /var/www/static_html && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \ 
    mkdir -p /var/run && touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

COPY ./NginxConfig/nginx.conf /etc/nginx/nginx.conf
    
EXPOSE 80
USER nginx
CMD ["nginx", "-g", "daemon off;"]