# Build

FROM node:14.16.0 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
RUN rm -rf build/__snowpack__ build/_dist_ build/web_modules

# Runtime

FROM nginx:1.19.7-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

# RUN cat /etc/nginx/nginx.conf
# RUN cat /etc/nginx/conf.d/default.conf
