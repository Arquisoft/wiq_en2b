FROM nginx:bookworm

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx-selfsigned.key /etc/nginx/nginx-selfsigned.key
COPY ./nginx-certificate.crt /etc/nginx/nginx-certificate.crt
COPY ./ssl-params.conf /etc/nginx/ssl-params.conf
COPY ./dhparam.pem /etc/nginx/dhparam.pem