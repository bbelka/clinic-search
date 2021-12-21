FROM node:14

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]