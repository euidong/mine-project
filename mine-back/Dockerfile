FROM node:13.12.0-alpine

LABEL maintainer="euidong jeoung <justicedong@naver.com>"

RUN mkdir -p /app

WORKDIR /app

COPY package*.json .

RUN yarn install

COPY . .

# mysql db의 설정이 끝날 때까지 대기한다.
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

EXPOSE 8000

CMD /wait && yarn start