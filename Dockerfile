FROM node:latest

WORKDIR /usr/app
COPY data/package.json .
RUN npm install --quiet
COPY data/* .
