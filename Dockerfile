FROM node:12-alpine

WORKDIR /tmp/app
COPY package.json yarn.lock ./
RUN yarn

COPY src/static static/

RUN yarn bundle

RUN rm -rf node_modules
RUN yarn --prod

EXPOSE 3000
CMD yarn run run
