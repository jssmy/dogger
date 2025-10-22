# Dockerfile optimizado con Nginx + Node.js para SSR
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

# Etapa 2: Preparar Node.js para SSR
FROM node:22-alpine AS nodejs-server

# Instalar dumb-init para manejo correcto de señales
RUN apk add --no-cache dumb-init

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

# Copiar solo los archivos necesarios para el servidor Node.js
COPY --from=build --chown=nextjs:nodejs /app/dist ./dist
COPY --from=build --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=build --chown=nextjs:nodejs /app/package-lock.json ./package-lock.json

# Instalar solo dependencias de producción para el servidor
RUN npm ci --only=production --silent --no-audit --no-fund && \
    npm cache clean --force

# Cambiar al usuario no-root
USER nextjs

# Exponer puerto interno para Node.js
EXPOSE 3000

# Comando para ejecutar el servidor Node.js
CMD ["dumb-init", "node", "dist/dogger/server/server.mjs"]

# Etapa 3: Nginx como servidor principal
FROM nginx:alpine AS production

# Instalar Node.js y dumb-init
RUN apk add --no-cache nodejs npm dumb-init

# Crear usuario no-root para Nginx
RUN addgroup -g 1001 -S nginx-user && \
    adduser -S nginx-user -u 1001 -G nginx-user

# Copiar configuración optimizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar archivos estáticos desde la etapa de build
COPY --from=build /app/dist/dogger/browser /usr/share/nginx/html

# Copiar carpeta public para assets
COPY --from=build /app/public /usr/share/nginx/html/public

# Crear directorio para logs y dar permisos
RUN mkdir -p /var/log/nginx && \
    chown -R nginx-user:nginx-user /var/log/nginx /var/cache/nginx /var/run /usr/share/nginx/html && \
    chmod -R 755 /var/log/nginx

# Copiar el servidor Node.js desde la etapa anterior
COPY --from=nodejs-server /app /app/nodejs-server

# Crear script de inicio simple
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'nginx -g "daemon off;" &' >> /start.sh && \
    echo 'cd /app/nodejs-server && node dist/dogger/server/server.mjs' >> /start.sh && \
    chmod +x /start.sh

# Cambiar al usuario no-root
USER nginx-user

# Exponer puerto 80
EXPOSE 80

# Health check optimizado
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Comando de inicio
CMD ["/start.sh"]





