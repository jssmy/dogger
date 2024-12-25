# Etapa 1: Construcción de la aplicación Angular
FROM node:22 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código fuente de la aplicación al contenedor
COPY . .

# Construir la aplicación Angular en modo producción
RUN npm run build

# Etapa 2: Servir la aplicación con NGINX
FROM node:22 AS production

# Copiar el build de Angular desde la etapa de construcción a la carpeta de NGINX
COPY --from=build /app/dist ./dist

COPY --from=build /app/node_modules ./node_modules


EXPOSE 80

CMD [ "node","dist/dogger/server/server.mjs"]





