FROM node:lts

WORKDIR /app

CMD npm i && npm run dev
