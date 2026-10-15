FROM node:20-alpine AS builder

WORKDIR /home/app


COPY package*.json .

RUN npm install

COPY . .

RUN chown -R node:node .

USER node

RUN npm prune --production

EXPOSE 5000

CMD ["node","server.js"]