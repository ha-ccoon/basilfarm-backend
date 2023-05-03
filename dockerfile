FROM node:20.0.0

WORKDIR /source
ADD . /source
VOLUME [ "/source" ]
RUN npm install

EXPOSE 5000

CMD node app.js