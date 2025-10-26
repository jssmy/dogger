// Configuración del servidor Node.js para SSR
export const serverConfig = {
  // Configuración de timeouts
  timeout: {
    request: 30000, // 30 segundos
    keepAlive: 5000, // 5 segundos
    headers: 10000   // 10 segundos
  },
  
  // Configuración de compresión
  compression: {
    enabled: true,
    level: 6,
    threshold: 1024
  },
  
  // Configuración de caché
  cache: {
    enabled: true,
    maxAge: 3600000, // 1 hora
    etag: true
  },
  
  // Configuración de logs
  logging: {
    level: 'info',
    format: 'combined'
  }
};
