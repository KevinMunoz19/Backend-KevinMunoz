FROM node:18-alpine3.15 as build

ENV REACT_APP_BACKEND_BASE_URL=http://localhost:6868

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

RUN npm run build

FROM nginx:1.23.2-alpine

COPY --from=build /opt/app/build /usr/share/nginx/html