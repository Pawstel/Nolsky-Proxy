From node:latest

RUN mkdir -p /src/app
RUN npm install -g grunt-cli

WORKDIR /src/app

COPY . /src/app

RUN npm install 

EXPOSE 3004

CMD  ["npm", "start"]