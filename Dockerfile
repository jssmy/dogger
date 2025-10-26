# Dockerfile optimizado para Angular SSR con Nginx
# Etapa 1: Construcción de la aplicación Angular
FROM node:22-alpine AS build

# Instalar dependencias del sistema necesarias para la compilación
RUN apk add --no-cache python3 make g++

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias primero para mejor cacheo de capas
COPY package.json package-lock.json ./

# Instalar dependencias con optimizaciones
RUN npm ci --silent --no-audit --no-fund && \
    npm cache clean --force

# Copiar el código fuente de la aplicación
COPY . .

ARG STAGE_BUILD=production
# Construir la aplicación Angular con optimizaciones
RUN npm run build:${STAGE_BUILD} && \
    # Limpiar archivos innecesarios después del build
    rm -rf node_modules/.cache && \
    find . -name "*.map" -delete

# Etapa 2: Imagen final con Nginx + Node.js
FROM nginx:alpine

# Instalar Node.js y dumb-init
RUN apk add --no-cache nodejs npm dumb-init

# Crear usuario no-root
RUN addgroup -g 1001 -S app-user && \
    adduser -S app-user -u 1001 -G app-user

# Copiar configuración optimizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar archivos estáticos desde la etapa de build
COPY --from=build /app/dist/dogger/browser /usr/share/nginx/html

# Copiar carpeta public para assets
COPY --from=build /app/public /usr/share/nginx/html/public

# Copiar servidor Node.js desde la etapa de build
COPY --from=build /app/dist/dogger/server /app/server
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json

# Instalar solo dependencias de producción para el servidor
WORKDIR /app
RUN npm ci --only=production --silent --no-audit --no-fund && \
    npm cache clean --force

# Crear directorios necesarios y dar permisos
RUN mkdir -p /var/log/nginx /var/run /var/cache/nginx && \
    chown -R app-user:app-user /var/log/nginx /var/cache/nginx /var/run /usr/share/nginx/html /app && \
    chmod -R 755 /var/log/nginx /var/run /var/cache/nginx && \
    chmod 777 /var/run

# Cambiar al usuario no-root
USER app-user

# Exponer puerto 80
EXPOSE 80

# Health check optimizado
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Comando de inicio optimizado
CMD ["sh", "-c", "mkdir -p /var/run && chmod 777 /var/run && nginx -g 'daemon off;' & NODE_ENV=production node /app/server/server.mjs"]
