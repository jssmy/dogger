# Dockerfile optimizado para Angular SSR con Node.js únicamente
# Etapa 1: Construcción de la aplicación Angular
FROM node:22-alpine AS build

# Instalar dependencias del sistema necesarias para la compilación
RUN apk add --no-cache python3 make g++

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias primero para mejor cacheo de capas
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci && \
    npm cache clean --force

# Copiar el código fuente de la aplicación
COPY . .

ARG STAGE_BUILD=production
# Construir la aplicación Angular con optimizaciones
RUN npm run build:${STAGE_BUILD} && \
    # Limpiar archivos innecesarios después del build
    rm -rf node_modules/.cache && \
    find . -name "*.map" -delete

# Etapa 2: Imagen final solo con Node.js
FROM node:22-alpine

# Instalar wget para health checks
RUN apk add --no-cache wget

# Crear usuario no-root
RUN addgroup -g 1001 -S app-user && \
    adduser -S app-user -u 1001 -G app-user

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos estáticos desde la etapa de build
COPY --from=build /app/dist/bugzilo/browser /app/browser

# Copiar carpeta public para assets
COPY --from=build /app/public /app/browser/public

# Copiar servidor Node.js desde la etapa de build
COPY --from=build /app/dist/bugzilo/server /app/server
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json

# Instalar solo dependencias de producción para el servidor
RUN npm ci --only=production && \
    npm cache clean --force

# Dar permisos al usuario app-user
RUN chown -R app-user:app-user /app

# Cambiar a usuario no-root
USER app-user

# Variable de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Exponer puerto 3000
EXPOSE 3000

# Health check - usar wget o node con fetch
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Comando de inicio: solo Node.js SSR
CMD ["node", "/app/server/server.mjs"]
