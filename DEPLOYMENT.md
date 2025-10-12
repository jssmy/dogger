# Configuración de Despliegue Automático con Woodpecker

Este documento explica cómo configurar el pipeline de CI/CD para desplegar automáticamente la aplicación Dogger en tu VPS.

## Requisitos Previos

1. Woodpecker CI instalado en tu VPS
2. Cuenta en Docker Hub
3. Docker y Docker Compose instalados en el VPS

## Configuración de Secrets en Woodpecker

Para que el pipeline funcione correctamente, debes configurar los siguientes secrets en Woodpecker:

### 1. `docker_username`
Tu nombre de usuario de Docker Hub.

**Ejemplo:** `jssmy`

### 2. `docker_password`
Tu contraseña de Docker Hub o (recomendado) un Access Token.

**Para crear un Access Token en Docker Hub:**
1. Ve a https://hub.docker.com/settings/security
2. Click en "New Access Token"
3. Dale un nombre descriptivo (ej: "woodpecker-ci")
4. Copia el token generado
5. Usa este token como valor del secret `docker_password`

### Cómo agregar secrets en Woodpecker

1. Abre la interfaz web de Woodpecker
2. Ve a tu repositorio
3. Click en "Settings" o "Configuración"
4. Ve a la sección "Secrets"
5. Agrega cada secret:
   - Name: `docker_username`
   - Value: tu usuario de Docker Hub
   - Event: `push` (opcional, pero recomendado)
   
   - Name: `docker_password`
   - Value: tu token de Docker Hub
   - Event: `push` (opcional, pero recomendado)

## Funcionamiento del Pipeline

Cuando hagas `git push` a la rama `master`, Woodpecker ejecutará automáticamente:

### Step 1: Build Docker Image
- Construye la imagen Docker usando el `Dockerfile`
- Etiqueta la imagen con:
  - `usuario/dogger:latest` (última versión)
  - `usuario/dogger:abc12345` (hash del commit)

### Step 2: Push to Registry
- Inicia sesión en Docker Hub
- Sube ambas etiquetas de la imagen
- Cierra sesión

### Step 3: Deploy
- Descarga la imagen actualizada (`docker compose pull`)
- Reinicia el contenedor con la nueva imagen (`docker compose up -d`)

## Variables de Entorno Utilizadas

El pipeline utiliza las siguientes variables de Woodpecker:

- `${CI_REPO_OWNER}` - Propietario del repositorio (ej: `jssmy`)
- `${CI_REPO_NAME}` - Nombre del repositorio (ej: `dogger`)
- `${CI_COMMIT_SHA}` - Hash del commit completo
- `${CI_WORKSPACE}` - Directorio de trabajo del pipeline

## Personalización

### Cambiar el nombre de la imagen

Si tu usuario de Docker Hub es diferente a `${CI_REPO_OWNER}`, o quieres usar otro nombre de imagen, edita en `.woodpecker/.woodpecker.yml`:

```yaml
- docker build -t tu-usuario/tu-imagen:latest -t tu-usuario/tu-imagen:${CI_COMMIT_SHA:0:8} --build-arg STAGE_BUILD=production .
```

Y actualiza `docker-compose.yml`:

```yaml
services:
  dogger-front:
    image: ${DOCKER_IMAGE:-tu-usuario/tu-imagen:latest}
```

### Desplegar en un puerto diferente

Edita `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Cambia 8080 por el puerto que prefieras
```

## Verificación

Después del primer despliegue exitoso, puedes verificar:

1. Que la imagen existe en Docker Hub:
   ```bash
   docker search tu-usuario/dogger
   ```

2. Que el contenedor está corriendo:
   ```bash
   docker ps | grep dogger
   ```

3. Que la aplicación responde:
   ```bash
   curl http://localhost/health
   ```

## Troubleshooting

### Error: "permission denied while trying to connect to Docker daemon"

Asegúrate de que el usuario que ejecuta Woodpecker tiene permisos para usar Docker:

```bash
sudo usermod -aG docker woodpecker-agent
sudo systemctl restart woodpecker-agent
```

### Error: "unauthorized: authentication required"

Verifica que los secrets `docker_username` y `docker_password` estén correctamente configurados en Woodpecker.

### El contenedor no se actualiza

Verifica los logs de Woodpecker para el step de deploy:

```bash
docker logs -f <woodpecker-agent-container>
```

## Rollback

Si necesitas volver a una versión anterior, puedes especificar el tag del commit:

```bash
cd /ruta/del/proyecto
DOCKER_IMAGE=tu-usuario/dogger:abc12345 docker compose up -d dogger-front
```

Donde `abc12345` es el hash corto del commit al que quieres volver.

