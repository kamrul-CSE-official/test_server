FROM node:20

WORKDIR /index

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "index.mjs" ]