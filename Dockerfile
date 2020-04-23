FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 8080

CMD [ "node", "server/index.js" ]
