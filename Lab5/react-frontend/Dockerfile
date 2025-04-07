FROM node:alpine3.21 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile && npm cache clean --force

FROM build
COPY . .
EXPOSE 80
CMD ["npm", "start"]