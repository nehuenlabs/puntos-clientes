
FROM node:latest
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY app/ .

EXPOSE 3000

CMD [ "node", "index.js" ]
