FROM node:20.13.1-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 5000
COPY . .

CMD npm start
