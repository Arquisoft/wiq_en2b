## Quick start guide

### Using docker

The fastest way for launching this sample project is using docker. Just clone the project:

```sh
git clone https://github.com/Arquisoft/wiq_en2b.git
```

and launch it with docker compose:

```sh
docker compose --profile dev up --build
```

This will start the following components:

 - The project database (using PostgreSQL).
 - The question generator module.
 - The API/backend.
 - The webapp.
 - The reverse proxy server used to serve HTTPS requests to the webapp.

Do note that, as it is, the project will expect SSL keys in certain places. You may check [the proxy configuration](./proxy_conf/config.conf) and [the application properties of the API](./api/src/main/resources/application.properties) to find out where (the keys are not included in the release or in the repository). You may also remove the reverse proxy and comment out or delete the relevant if you do not have your own keys. Do note the project code is given as-is.

### Starting Component by component

In the case you intend to run component by component, you will at the very least need your own SSL keys (see above how to bypass this requirement). Then, you may start starting the application.

First, start the database. Either install and run PostgreSQL or run it using docker:

```sh
docker run -d -p 27017:27017 postgres:latest
```

You may also host your own PostgreSQL instance in the cloud. Now, launch the API. Do note you may need to install the relevant dependencies first: your IDE should do this for you; if it does not or you do not have one then you must run the following command inside both `api` and `questiongenerator` modules:

```sh
mvn install
```

Lastly, go to the webapp directory and launch this component with 

```sh
npm install
```

followed by 

```sh
npm start
```

After all the components are launched, the app should be available in localhost in port 3000 and 8443 for the API, or whatever port configure the app to use.

## Deployment

For the deployment, we have several options. 

The first and more flexible is to deploy to a virtual machine using SSH. This will work with any cloud service (or with our own server). 

Other options include using the container services that most cloud services provide. This means, deploying our Docker containers directly. 

We are going to use the first approach, creating a virtual machine in a cloud service and after installing docker and docker-compose, deploy our containers there using GitHub Actions and SSH.

### Machine requirements for deployment

The machine for deployment can be created in services like Microsoft Azure or Amazon AWS. These are in general the settings that it must have:

- Linux machine with Ubuntu >= 20.04.
- Docker and docker-compose installed.
- Open ports for the applications installed (in this case, ports 3000 for the webapp and 8443 for the API, or whatever port configure the app to use).

Once you have the virtual machine created, you can install **docker** and **docker-compose** using the following instructions:

```ssh
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
sudo apt install docker-ce
sudo usermod -aG docker ${USER}
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Continuous delivery (GitHub Actions)

Once we have our machine ready, we could deploy by hand the application, taking our docker-compose file and executing it in the remote machine. 

In this repository, this process is done automatically using **GitHub Actions**. The idea is to trigger a series of actions when some condition is met in the repository. 

As you can see, unitary tests of each module and e2e tests are executed before pushing the docker images and deploying them. Using this approach we avoid deploying versions that do not pass the tests.

The deploy action that does not include the SSL service is the following:

```yml
deploy:
    name: Deploy over SSH
    runs-on: ubuntu-latest
    needs: [docker-push-api, docker-push-webapp, docker-push-question-generator, docker-push-kiwiq]
    steps:
    - name: Deploy over SSH
      uses: fifsky/ssh-action@master
      env:
        API_URI: ${{ secrets.DEPLOY_HOST }}
        DATABASE_USER: ${{ secrets.DATABASE_USER }}
        DATABASE_PASSWORD: ${{ secrets.DATABASE_PASSWORD }}
        JWT_SECRET: ${{ secrets.JWT_SECRET }}
      with:
        host: ${{ secrets.DEPLOY_HOST }}
        user: ${{ secrets.DEPLOY_USER }}
        key: ${{ secrets.DEPLOY_KEY }}
        command: |
          wget https://raw.githubusercontent.com/arquisoft/wiq_en2b/master/docker-compose.yml -O docker-compose.yml
          wget https://raw.githubusercontent.com/arquisoft/wiq_en2b/master/.env -O .env
          echo "DATABASE_USER=${{ secrets.DATABASE_USER }}" >> .env
          echo "DATABASE_PASSWORD=${{ secrets.DATABASE_PASSWORD }}" >> .env
          echo "JWT_SECRET=${{ secrets.JWT_SECRET }}" >> .env
          echo "API_URI=https://${{ secrets.DEPLOY_HOST }}:8443" >> .env
          echo "SSL_PASSWORD=${{ secrets.SSL_PASSWORD }}" >> .env
          docker compose --profile prod down
          docker compose --profile prod up -d --pull always
```

This action uses three secrets that must be configured in the repository:

- DEPLOY_HOST: IP of the remote machine.
- DEPLOY_USER: user with permission to execute the commands in the remote machine.
- DEPLOY_KEY: key to authenticate the user in the remote machine.
- DATABASE_USER: the default user of the database.
- DATABASE_PASSWORD: the password of the user.
- JWT_SECRET: the secret needed to generate the JWT tokens.
- SSL_PASSWORD: the password of the SSL keys
- API_URI: the URI the API is deployed to, port included.

Note that this action logs in the remote machine and downloads the docker-compose file from the repository and launches it. Obviously, previous actions have been executed which have uploaded the docker images to the GitHub Packages repository.
