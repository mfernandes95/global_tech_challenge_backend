FROM node:14.15.0-alpine3.10 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

FROM node:14.15.0-alpine3.10 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD node dist/main