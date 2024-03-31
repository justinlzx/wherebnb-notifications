FROM node:lts-alpine AS build
ARG EMAIL_USERNAME
ARG EMAIL_PASSWORD
ARG RABBIT_HOST
ARG RABBIT_PORT
WORKDIR /app
COPY package*.json .
RUN npm install
RUN apk add --no-cache bash
COPY . .

RUN chmod +x ./wait-for-rabbitmq.sh

CMD [ "bash", "wait-for-rabbitmq.sh" ]