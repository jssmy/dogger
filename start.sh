#!/bin/sh
set -e

echo "🚀 Iniciando Dogger Application..."

# Crear directorios necesarios con permisos correctos
mkdir -p /var/run /var/cache/nginx /var/log/nginx
chown -R nginx-user:nginx-user /var/run /var/cache/nginx /var/log/nginx
chmod -R 755 /var/run /var/cache/nginx /var/log/nginx

echo "📁 Directorios creados con permisos correctos"

# Iniciar Nginx en segundo plano
echo "🌐 Iniciando Nginx..."
nginx -g "daemon off;" &

# Esperar un momento para que Nginx se inicie
sleep 2

# Verificar que Nginx esté funcionando
if ! pgrep nginx > /dev/null; then
    echo "❌ Error: Nginx no se pudo iniciar"
    exit 1
fi

echo "✅ Nginx iniciado correctamente"

# Iniciar el servidor Node.js
echo "🟢 Iniciando servidor Node.js..."
cd /app/nodejs-server

# Configurar variables de entorno para Node.js
export NODE_ENV=production
export PORT=3000
export TIMEOUT=30000

# Iniciar el servidor Node.js
node dist/dogger/server/server.mjs

echo "🎉 Aplicación Dogger iniciada correctamente"
