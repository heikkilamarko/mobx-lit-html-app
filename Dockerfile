FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
ENV NGINX_ENVSUBST_TEMPLATE_DIR=/etc/mobx-lit-html-app
ENV NGINX_ENVSUBST_OUTPUT_DIR=/usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/ /etc/mobx-lit-html-app/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# RUN cat /etc/nginx/nginx.conf
# RUN cat /etc/nginx/conf.d/default.conf
