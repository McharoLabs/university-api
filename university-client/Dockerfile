FROM node:20.10.0-alpine

WORKDIR /client

ENV PATH="./node_modules/.bin:$PATH"

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build
CMD ["npm", "run", "dev", "--", "--host"]

