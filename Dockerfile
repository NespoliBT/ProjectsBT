FROM node:10.13.0-alpine
#app directory
WORKDIR	/usr/app
#Install app dependencies 
COPY package.json ./


RUN npm install
#for production run =>  RUN npm install --only=production

#add .dockerignore if you want ignore something
COPY . . 

RUN npm run build
COPY ormconfig.json ./dist/
COPY .env ./dist/
WORKDIR ./dist

EXPOSE 4000
CMD node src/index.js
