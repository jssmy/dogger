# Guía de Verificación y Configuración de Woodpecker Agent

Esta guía te ayudará a verificar y configurar correctamente Woodpecker Agent para que pueda ejecutar Docker en el host.

## Fase 1: VERIFICACIÓN

### Paso 1: Verificar que Woodpecker Agent está corriendo

```bash
# Listar contenedores relacionados con Woodpecker
docker ps | grep woodpecker

# Esperado: Deberías ver contenedores como woodpecker-agent o woodpecker-server
```

**¿Qué anotar?**
- ✏️ Nombre del contenedor del agent: `___________________`

---

### Paso 2: Inspeccionar configuración actual del Agent

```bash
# Reemplaza 'woodpecker-agent' con el nombre real de tu contenedor
docker inspect woodpecker-agent | grep -A 20 "Mounts"
```

**¿Qué buscar?**
- ✅ Debe existir un mount de `/var/run/docker.sock` → `/var/run/docker.sock`
- ❌ Si NO aparece, necesitarás reconfigurar

**Resultado:**
- [ ] SÍ tiene el volumen montado (puedes pasar a Fase 2)
- [ ] NO tiene el volumen montado (continúa con Paso 3)

---

### Paso 3: Ver el comando completo usado para crear el contenedor

```bash
# Ver cómo se creó el contenedor
docker inspect woodpecker-agent --format='{{json .Config}}' | jq
```

**O si usas docker-compose:**

```bash
# Buscar el archivo docker-compose.yml de Woodpecker
find /home -name "docker-compose.yml" 2>/dev/null | xargs grep -l "woodpecker"
find /opt -name "docker-compose.yml" 2>/dev/null | xargs grep -l "woodpecker"
find /root -name "docker-compose.yml" 2>/dev/null | xargs grep -l "woodpecker"

# Leer el archivo encontrado
cat /ruta/del/docker-compose.yml
```

**¿Qué anotar?**
- ✏️ Ubicación del docker-compose: `___________________`
- ✏️ Método de instalación: [ ] docker-compose [ ] docker run

---

### Paso 4: Verificar permisos del socket de Docker

```bash
# Ver permisos del socket
ls -la /var/run/docker.sock

# Resultado esperado:
# srw-rw---- 1 root docker 0 Oct 12 10:00 /var/run/docker.sock
```

**¿Qué anotar?**
- ✏️ Grupo del socket: `___________________` (debería ser `docker`)
- ✏️ GID del grupo docker: ejecuta `getent group docker` → `___________________`

---

### Paso 5: Probar acceso desde dentro del contenedor

```bash
# Entrar al contenedor de Woodpecker Agent
docker exec -it woodpecker-agent sh

# Dentro del contenedor, intentar ejecutar docker
docker ps

# Si funciona: ✅ Todo está correcto
# Si falla: ❌ Hay problemas de permisos
```

**Resultado:**
- [ ] Funciona correctamente (¡Estás listo!)
- [ ] Error de permisos (continúa con Fase 2)
- [ ] Comando docker no encontrado (continúa con Fase 2)

---

## Fase 2: CONFIGURACIÓN / CORRECCIÓN

### Escenario A: Si usas Docker Compose

#### Paso 6A: Editar docker-compose.yml

```bash
# Ubicación del archivo (usar la ruta que anotaste)
nano /ruta/del/docker-compose.yml
```

**Agregar/modificar la sección del agent:**

```yaml
services:
  woodpecker-agent:
    image: woodpeckerci/woodpecker-agent:latest
    restart: always
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock  # ← AGREGAR ESTA LÍNEA
    environment:
      - WOODPECKER_SERVER=${WOODPECKER_SERVER}
      - WOODPECKER_AGENT_SECRET=${WOODPECKER_AGENT_SECRET}
      - WOODPECKER_BACKEND=docker
      - WOODPECKER_MAX_WORKFLOWS=4
    # Agregar el GID del grupo docker (usar el GID que anotaste en Paso 4)
    group_add:
      - 999  # ← Cambiar por el GID real de tu grupo docker
```

#### Paso 7A: Aplicar cambios

```bash
# Ir al directorio del docker-compose
cd /ruta/del/directorio

# Recrear el contenedor
docker-compose down
docker-compose up -d

# Verificar que está corriendo
docker-compose ps
```

---

### Escenario B: Si usas Docker Run

#### Paso 6B: Obtener la configuración actual

```bash
# Ver las variables de entorno actuales
docker inspect woodpecker-agent --format='{{range .Config.Env}}{{println .}}{{end}}'
```

**¿Qué anotar?**
- ✏️ WOODPECKER_SERVER: `___________________`
- ✏️ WOODPECKER_AGENT_SECRET: `___________________`

#### Paso 7B: Recrear el contenedor

```bash
# 1. Detener el contenedor actual
docker stop woodpecker-agent

# 2. Eliminarlo
docker rm woodpecker-agent

# 3. Recrear con la configuración correcta
# (Reemplazar los valores con los que anotaste)
docker run -d \
  --name woodpecker-agent \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --group-add 999 \
  -e WOODPECKER_SERVER=tu-woodpecker-server \
  -e WOODPECKER_AGENT_SECRET=tu-secret \
  -e WOODPECKER_BACKEND=docker \
  -e WOODPECKER_MAX_WORKFLOWS=4 \
  woodpeckerci/woodpecker-agent:latest

# 4. Verificar que está corriendo
docker ps | grep woodpecker-agent
```

---

## Fase 3: VERIFICACIÓN FINAL

### Paso 8: Probar nuevamente desde dentro del contenedor

```bash
# Entrar al contenedor
docker exec -it woodpecker-agent sh

# Probar comandos docker
docker ps
docker images

# Salir
exit
```

**Resultado esperado:**
```
CONTAINER ID   IMAGE            COMMAND     CREATED      STATUS
abc123def456   dogger-front     ...         2 hours ago  Up 2 hours
```

---

### Paso 9: Verificar logs del agent

```bash
# Ver logs en tiempo real
docker logs -f woodpecker-agent

# Buscar errores relacionados con Docker
docker logs woodpecker-agent 2>&1 | grep -i "docker\|error\|permission"
```

**¿Qué buscar?**
- ✅ No debe haber errores de "permission denied"
- ✅ No debe haber errores de "cannot connect to docker daemon"

---

### Paso 10: Hacer un push de prueba

```bash
# En tu máquina local (no en el VPS)
# Hacer un cambio mínimo y push para probar el pipeline

# Ejemplo:
echo "# Test" >> README.md
git add README.md
git commit -m "test: verificar pipeline de CI/CD"
git push origin master
```

**Monitorear en el VPS:**

```bash
# Ver logs del agent mientras se ejecuta el pipeline
docker logs -f woodpecker-agent

# En otra terminal, ver si se crea el contenedor
watch -n 2 'docker ps'
```

---

## Checklist Final ✅

- [ ] Woodpecker Agent tiene el volumen `/var/run/docker.sock` montado
- [ ] El contenedor tiene el grupo correcto (`--group-add` con GID de docker)
- [ ] Desde dentro del contenedor se pueden ejecutar comandos docker
- [ ] Los logs no muestran errores de permisos
- [ ] Un push a master dispara el pipeline correctamente
- [ ] El contenedor `node-dogger-front-container` se crea/actualiza

---

## Troubleshooting

### Error: "permission denied while trying to connect to Docker daemon socket"

**Solución:**
```bash
# Verificar GID del grupo docker
getent group docker

# Debe coincidir con el --group-add del contenedor
# Si no coincide, recrear el contenedor con el GID correcto
```

---

### Error: "Cannot connect to the Docker daemon"

**Solución:**
```bash
# Verificar que Docker está corriendo en el host
systemctl status docker

# Si está detenido
systemctl start docker
```

---

### El pipeline no se dispara automáticamente

**Solución:**
```bash
# Verificar webhooks en tu repositorio
# GitHub/GitLab/Gitea → Settings → Webhooks
# Debe existir un webhook apuntando a tu Woodpecker Server

# Verificar logs del Woodpecker Server
docker logs woodpecker-server
```

---

## Comandos Rápidos de Referencia

```bash
# Ver todos los contenedores de Woodpecker
docker ps -a | grep woodpecker

# Ver logs del agent
docker logs -f woodpecker-agent

# Reiniciar el agent
docker restart woodpecker-agent

# Ver el socket de Docker
ls -la /var/run/docker.sock

# Probar docker desde dentro del agent
docker exec -it woodpecker-agent docker ps

# Ver contenedor de tu aplicación
docker ps | grep dogger-front

# Ver logs de tu aplicación
docker logs -f node-dogger-front-container
```

---

## Notas Importantes

1. **Seguridad**: Dar acceso al socket de Docker es equivalente a dar acceso root al host. Asegúrate de que tu Woodpecker Server esté bien protegido.

2. **Backups**: Antes de hacer cambios, respalda tu configuración actual:
   ```bash
   docker inspect woodpecker-agent > woodpecker-agent-backup.json
   ```

3. **Persistencia**: Si usas docker-compose, asegúrate de que el archivo esté en un lugar seguro y versionado.

4. **Updates**: Al actualizar Woodpecker, mantén estas configuraciones en el nuevo contenedor.

---

**¿Necesitas ayuda?** Si algo no funciona, revisa los logs:
```bash
docker logs woodpecker-agent 2>&1 | tail -100
```

