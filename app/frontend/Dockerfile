FROM node:24-alpine AS dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN apk add --no-cache iputils

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM    node:24-alpine AS build

WORKDIR /app

COPY    package*.json ./

RUN     npm install

COPY    . .

RUN     npm run build

FROM    node:24-alpine AS prod

WORKDIR /app

RUN     apk add --no-cache iputils

COPY    --from=build /app ./

EXPOSE  3000

CMD     ["npm", "start"]