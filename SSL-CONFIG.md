# Configuración SSL con Subdominios - Bugzilo

## Arquitectura de Dominios

### Frontend
- **Dominio:** `bugzilo.com`
- **Puerto:** 443 (HTTPS)
- **Servidor:** Nginx + Angular SSR
- **Certificado:** `/etc/letsencrypt/live/bugzilo.com/`

### User API
- **Dominio:** `user.api.bugzilo.com`
- **Puerto:** 443 (HTTPS) → proxy a puerto 3000 del host
- **Servidor:** Backend API de usuarios (fuera del contenedor)
- **Certificado:** `/etc/letsencrypt/live/user.api.bugzilo.com/`

### Blog API
- **Dominio:** `blog.api.bugzilo.com`
- **Puerto:** 443 (HTTPS) → proxy a puerto 3001 del host
- **Servidor:** Backend API de blog (fuera del contenedor)
- **Certificado:** `/etc/letsencrypt/live/blog.api.bugzilo.com/`

## Endpoints Configurados

### User API (`user.api.bugzilo.com`)
- `/login`
- `/logout`
- `/control-access/page`
- `/control-access`
- `/control-access/permissions`
- `/permissions`
- `/user`
- `/register`
- `/roles`
- `/confirm-account`
- `/token/refresh`
- `/password/request`
- `/password/token`
- `/password/change`

### Blog API (`blog.api.bugzilo.com`)
- `/api/blog`

## Certificados SSL Requeridos

Debes generar certificados Let's Encrypt para los 3 dominios:

```bash
# 1. Certificado para el frontend
sudo certbot certonly --standalone -d bugzilo.com

# 2. Certificado para User API
sudo certbot certonly --standalone -d user.api.bugzilo.com

# 3. Certificado para Blog API
sudo certbot certonly --standalone -d blog.api.bugzilo.com
```

**Nota:** Asegúrate de tener los registros DNS configurados antes de ejecutar certbot.

## Configuración DNS Requerida

En tu proveedor de DNS, configura los siguientes registros A:

```
bugzilo.com              → IP_DEL_SERVIDOR
user.api.bugzilo.com     → IP_DEL_SERVIDOR
blog.api.bugzilo.com     → IP_DEL_SERVIDOR
```

## Servicios Backend Requeridos

Los siguientes servicios deben estar corriendo en el host:

1. **User API Backend** - Puerto 3000
   - Debe estar ejecutándose en el host (fuera del contenedor)
   - Accesible en `localhost:3000`

2. **Blog API Backend** - Puerto 3001
   - Debe estar ejecutándose en el host (fuera del contenedor)
   - Accesible en `localhost:3001`

## Flujo de Peticiones

### Frontend
```
Cliente → https://bugzilo.com
  ↓
Nginx (puerto 443)
  ↓
Angular SSR (puerto 3000 interno)
```

### User API
```
Cliente → https://user.api.bugzilo.com/login
  ↓
Nginx (puerto 443) en contenedor
  ↓
host.docker.internal:3000 (Backend en el host)
```

### Blog API
```
Cliente → https://blog.api.bugzilo.com/api/blog
  ↓
Nginx (puerto 443) en contenedor
  ↓
host.docker.internal:3001 (Backend en el host)
```

## Características de Seguridad

### SSL/TLS
- ✅ TLS 1.2 y 1.3 únicamente
- ✅ Cifrados modernos y seguros
- ✅ HTTP/2 habilitado
- ✅ Redirección automática HTTP → HTTPS

### Headers de Seguridad
- ✅ HSTS (max-age 1 año)
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection
- ✅ Referrer-Policy

### CORS (APIs)
- ✅ Access-Control-Allow-Origin: https://bugzilo.com
- ✅ Access-Control-Allow-Credentials: true
- ✅ Preflight requests manejados

## Despliegue

### 1. Generar certificados SSL
```bash
# Detener el contenedor si está corriendo
docker-compose down

# Generar certificados (uno por dominio)
sudo certbot certonly --standalone -d bugzilo.com
sudo certbot certonly --standalone -d user.api.bugzilo.com
sudo certbot certonly --standalone -d blog.api.bugzilo.com
```

### 2. Iniciar servicios backend
```bash
# Iniciar User API en puerto 3000
cd /ruta/al/backend-user
npm start # o el comando que uses

# Iniciar Blog API en puerto 3001
cd /ruta/al/backend-blog
npm start # o el comando que uses
```

### 3. Desplegar el frontend
```bash
# Reconstruir la imagen
docker-compose build

# Iniciar el contenedor
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### 4. Verificar
```bash
# Health checks
curl https://bugzilo.com/health
curl https://user.api.bugzilo.com/health
curl https://blog.api.bugzilo.com/health

# Verificar redirección HTTP → HTTPS
curl -I http://bugzilo.com
```

## Renovación de Certificados

Los certificados Let's Encrypt expiran cada 90 días. Configura renovación automática:

```bash
# Configurar cron para renovación automática
sudo crontab -e

# Agregar esta línea (renovar a las 2 AM todos los días)
0 2 * * * certbot renew --quiet --post-hook "docker-compose -f /ruta/al/proyecto/docker-compose.yml restart"
```

## Troubleshooting

### Error: "host.docker.internal: Temporary failure in name resolution"
```bash
# Verificar que docker-compose.yml tenga extra_hosts configurado
docker-compose config | grep -A 2 extra_hosts
```

### Error: "Permission denied" al leer certificados
```bash
# Verificar permisos de /etc/letsencrypt
ls -la /etc/letsencrypt/live/

# El contenedor debe correr como root para leer certificados SSL
```

### Los backends no responden
```bash
# Verificar que los servicios estén corriendo en el host
netstat -tulpn | grep :3000
netstat -tulpn | grep :3001

# Probar acceso desde el contenedor
docker exec node-bugzilo-front-container wget -O- http://host.docker.internal:3000/health
```

## Notas Importantes

1. **Permisos Root:** El contenedor debe ejecutarse como root para:
   - Vincular al puerto 443 (puerto privilegiado)
   - Leer certificados SSL desde `/etc/letsencrypt`
   - Nginx gestiona la seguridad internamente con procesos worker

2. **Certificados Montados:** Los certificados se montan como solo lectura (`:ro`)

3. **Host Gateway:** `host.docker.internal` permite al contenedor acceder a servicios del host

4. **Renovación:** Asegúrate de reiniciar el contenedor después de renovar certificados

