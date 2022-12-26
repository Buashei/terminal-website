FROM node:18-alpine

WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm ci

COPY ./ /app

EXPOSE 2137

CMD ["npm", "run", "dev"]