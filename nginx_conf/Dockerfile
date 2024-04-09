FROM nginx:bookworm

COPY ./nginx.conf /etc/nginx/nginx.conf

RUN apt update -y && apt upgrade -y && apt install -y openssl && openssl dhparam -out /etc/nginx/dhparams.pem 2048