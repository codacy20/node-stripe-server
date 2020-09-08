FROM node:carbon-alpine as dist
WORKDIR /tmp/
ENV .env /
COPY package*.json ./ 
COPY routes/ routes/
COPY public/ public/
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "start" ]