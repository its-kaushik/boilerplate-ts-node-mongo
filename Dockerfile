FROM node:20-alpine
WORKDIR /src/app
COPY ./package.json /src/app
RUN npm install && npm install typescript -g
COPY . /src/app/
RUN tsc
ENTRYPOINT [ "sh","/src/app/entrypoint.sh" ]