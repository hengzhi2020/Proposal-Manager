FROM node:11.10.0

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install
COPY . /app

EXPOSE 3000

CMD ["npm", "start"]