FROM node:18.12.1-bullseye-slim

USER node

WORKDIR /app

COPY ./package.json /app

RUN npm install

COPY . /app

EXPOSE 2137

CMD ["npm", "run", "dev"]