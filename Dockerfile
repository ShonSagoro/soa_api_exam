FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY src ./src

RUN npm install

EXPOSE 8080

CMD ["tsnd","--respawn" ,"src/app.ts"]