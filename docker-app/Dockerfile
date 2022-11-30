FROM node:14

WORKDIR /docker-app
COPY package.json .
RUN npm install
COPY . .
CMD npm start