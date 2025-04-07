FROM node:alpine3.21 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile && npm cache clean --force
COPY . .
RUN npm run build

FROM nginx:alpine3.21
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]