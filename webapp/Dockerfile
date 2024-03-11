FROM node:20

COPY . /app
WORKDIR /app

#Install the dependencies
RUN npm install

ARG REACT_APP_API_ENDPOINT
RUN echo "REACT_APP_API_ENDPOINT=$REACT_APP_API_ENDPOINT" > .env
#Create an optimized version of the webapp
RUN npm run build
RUN npm install serve

#Execute npm run prod to run the server
CMD [ "npm", "run", "prod" ]
#CMD ["npm", "start"]