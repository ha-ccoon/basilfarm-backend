FROM node:alpine

# Copy the reverse proxy configuration to the container
WORKDIR /source
COPY . /source

RUN npm install

EXPOSE 5000

CMD npm start