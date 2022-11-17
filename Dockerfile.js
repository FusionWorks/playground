FROM node:18-alpine
WORKDIR /app
COPY . /app
RUN npm install --omit=dev
RUN rm -rf /root/.npm/_cacache 
CMD npm run start