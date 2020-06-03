# build

FROM node:13.12.0-alpine as build

LABEL maintainer="euidong jeoung <justicedong@naver.com>"

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

COPY . ./

RUN yarn install --slient

RUN yarn build

# nginx 서버

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]