FROM node:alpine

WORKDIR /source
ADD . /source

RUN npm install

EXPOSE 5000

CMD node app.js