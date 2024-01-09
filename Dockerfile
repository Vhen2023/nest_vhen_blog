# node镜像
FROM node:20.8.1-alpine as my-blog-builder
WORKDIR /blog
ADD package*.json ./
RUN npm install --registry=https://registry.npm.taobao.org \
    && npm install
ADD ./ .
CMD npm run start:prod
EXPOSE 9000