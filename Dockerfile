FROM node:18
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}

WORKDIR /usr/src/app

ADD build /usr/src/app
ADD public /usr/src/app/public

ADD package.json /usr/src/app
RUN npm install

ADD start.sh /usr/src/app
ADD rotateKeys.sh /usr/src/app
RUN chmod +x /usr/src/app/start.sh
RUN chmod +x /usr/src/app/rotateKeys.sh

RUN apt-get update && apt-get install -y cron
COPY rotateKeysCron /etc/cron.d/cronjob
RUN chmod 0644 /etc/cron.d/cronjob
RUN crontab /etc/cron.d/cronjob

RUN env >> /etc/environment

CMD cron -f & /usr/src/app/start.sh

EXPOSE 5003
EXPOSE 5004
