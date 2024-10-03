FROM node:20-alpine

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 2900

CMD ["npm","run","start"]