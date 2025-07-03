# Etapa 1: Construcción de la aplicación Angular
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- -c production

# Etapa 2: Servir la aplicación con http-server
FROM node:22
WORKDIR /app
RUN npm install -g http-server
COPY --from=build /app/dist/challenge-mindata-baez /app
EXPOSE 80
CMD ["http-server", "/app/challenge-mindata-baez/browser", "-p", "80"]
