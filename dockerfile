FROM node:20.0.0
RUN mkdir /source
WORKDIR /source
ADD . /source
VOLUME [ "/source" ]
RUN npm install

EXPOSE 3000

CMD node app.js