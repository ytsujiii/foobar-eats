FROM node:16

WORKDIR /home/src

COPY frontend/package.json frontend/package-lock.json /home/src/

RUN npm install

CMD ["npm", "start"]
