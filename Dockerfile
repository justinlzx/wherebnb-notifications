FROM node:lts-alpine AS build
ARG EMAIL_USERNAME
ARG EMAIL_PASSWORD
ARG RABBIT_HOST
ARG RABBIT_PORT
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

EXPOSE 3006
CMD ["node", "index.js"]