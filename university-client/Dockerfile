FROM node:18.13-alpine

WORKDIR /client

ENV PATH="./node_modules/.bin:$PATH"

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build
CMD ["npm", "run", "dev", "--", "--host"]

