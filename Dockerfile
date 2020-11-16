
FROM node:latest
ENV NODE_ENV=production

WORKDIR /app

COPY ["./as-asoc.cl/package.json", "./as-asoc.cl/package-lock.json*", "./"]

RUN npm install

COPY as-asoc.cl/app/./ .

EXPOSE 3000

CMD [ "node", "index.js" ]
