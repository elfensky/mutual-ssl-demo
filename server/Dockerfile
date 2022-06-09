FROM node:16

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install 

EXPOSE 4000
CMD [ "node", "server.js" ]