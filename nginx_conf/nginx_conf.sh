apt-get update -y
apt upgrade -y
apt install -y curl
apt-get install -y nginx openssl
curl -o /etc/nginx/nginx.conf https://raw.githubusercontent.com/Arquisoft/wiq_en2b/feat/https/nginx_conf/nginx.conf
mkdir /etc/nginx/certs
openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/certs/nginx-selfsigned.key -out /etc/nginx/certs/nginx-selfsigned.crt -subj '/CN=localhost'
mkdir /etc/nginx/snippets
curl -o /etc/nginx/snippets/self-signed.conf https://raw.githubusercontent.com/Arquisoft/wiq_en2b/feat/https/nginx_conf/self_signed.conf
curl -o /etc/nginx/snippets/ssl-params.conf 
service nginx start
tail -f > /dev/null