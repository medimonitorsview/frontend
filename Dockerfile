FROM node:10
ADD ./package.json ./package-lock.json /frontend/
WORKDIR /frontend
RUN npm ci
ADD . /frontend/
# RUN npm run build
# CMD ["npm","run", "start:static"]
CMD ["npm", "start"]