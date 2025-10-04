# 🎨 Guía de Colores de Botones - Sistema de Diseño

## 📋 Índice
- [Clases de Botones](#clases-de-botones)
- [Categorías de Botones](#categorías-de-botones)
- [Variantes de Botones](#variantes-de-botones)
- [Tamaños de Botones](#tamaños-de-botones)
- [Estados de Botones](#estados-de-botones)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Mejores Prácticas](#mejores-prácticas)

---

## 🎯 Clases de Botones

### Botones Principales
```html
<button class="btn-primary">Botón Principal</button>
<button class="btn-secondary">Botón Secundario</button>
<button class="btn-accent">Botón de Acento</button>
```

### Botones de Estado
```html
<button class="btn-success">Éxito</button>
<button class="btn-warning">Advertencia</button>
<button class="btn-error">Error</button>
<button class="btn-info">Información</button>
```

### Botones de Marca
```html
<button class="btn-brand-primary">Marca Principal</button>
<button class="btn-brand-secondary">Marca Secundaria</button>
<button class="btn-brand-accent">Marca Acento</button>
<button class="btn-brand-blue">Marca Azul</button>
```

---

## 🎨 Categorías de Botones

### 1. **Botones Principales**
Basados en tokens de botones del sistema:
- `btn-primary` - Verde lima para acciones principales
- `btn-secondary` - Blanco para acciones secundarias
- `btn-accent` - Naranja-rojo para acciones de acento

### 2. **Botones de Estado**
Basados en tokens de estado y feedback:
- `btn-success` - Verde para acciones exitosas
- `btn-warning` - Naranja para advertencias
- `btn-error` - Rojo para errores
- `btn-info` - Azul para información

### 3. **Botones de Marca**
Basados en tokens de marca:
- `btn-brand-primary` - Verde vibrante de marca
- `btn-brand-secondary` - Rojo secundario de marca
- `btn-brand-accent` - Naranja de acento de marca
- `btn-brand-blue` - Azul principal de marca

### 4. **Botones de Colores Específicos**
Basados en la paleta extendida de colores:
- `btn-red` / `btn-red-dark` - Rojo
- `btn-blue` / `btn-blue-dark` - Azul
- `btn-green` / `btn-green-dark` - Verde
- `btn-yellow` / `btn-yellow-dark` - Amarillo
- `btn-purple` / `btn-purple-dark` - Púrpura
- `btn-orange` / `btn-orange-dark` - Naranja
- `btn-pink` / `btn-pink-dark` - Rosa
- `btn-teal` / `btn-teal-dark` - Teal

### 5. **Botones de Iconos**
Basados en tokens de iconos y plataformas:
- `btn-icon-pink` - Rosa/Púrpura
- `btn-icon-blue` - Azul estándar
- `btn-icon-teal` - Teal/Cian
- `btn-icon-indigo` - Azul oscuro
- `btn-icon-lime` - Verde claro
- `btn-icon-cyan` - Azul cian

### 6. **Botones Neutros**
Basados en tokens de grises:
- `btn-gray` - Gris medio
- `btn-gray-light` - Gris claro
- `btn-gray-dark` - Gris oscuro

---

## 🔄 Variantes de Botones

### **Outline (Contorno)**
Botones con fondo transparente y borde coloreado:
```html
<button class="btn-outline-primary">Outline Principal</button>
<button class="btn-outline-success">Outline Éxito</button>
<button class="btn-outline-warning">Outline Advertencia</button>
<button class="btn-outline-error">Outline Error</button>
<button class="btn-outline-info">Outline Información</button>
```

### **Ghost (Fantasma)**
Botones completamente transparentes:
```html
<button class="btn-ghost-primary">Ghost Principal</button>
<button class="btn-ghost-success">Ghost Éxito</button>
<button class="btn-ghost-warning">Ghost Advertencia</button>
<button class="btn-ghost-error">Ghost Error</button>
<button class="btn-ghost-info">Ghost Información</button>
```

---

## 📏 Tamaños de Botones

### **Tamaños del Componente Button**
```html
<button class="button button-sm">Pequeño</button>
<button class="button">Normal</button>
<button class="button button-lg">Grande</button>
<button class="button button-xl">Extra Grande</button>
```

### **Tamaños con Clases de Utilidad**
```html
<button class="btn-primary rounded-sm border-xs">Pequeño</button>
<button class="btn-primary rounded-md border-sm">Normal</button>
<button class="btn-primary rounded-lg border-md">Grande</button>
<button class="btn-primary rounded-xl border-lg">Extra Grande</button>
```

---

## ⚡ Estados de Botones

### **Estados Interactivos**
```html
<!-- Hover automático -->
<button class="btn-primary">Hover automático</button>

<!-- Focus automático -->
<button class="btn-primary">Focus automático</button>

<!-- Active automático -->
<button class="btn-primary">Active automático</button>

<!-- Disabled -->
<button class="btn-primary" disabled>Deshabilitado</button>
```

### **Estados con Clases de Utilidad**
```html
<!-- Con sombra -->
<button class="btn-primary shadow-md">Con Sombra</button>

<!-- Con sombra coloreada -->
<button class="btn-primary border-primary shadow-md-colored">Sombra Coloreada</button>
```

---

## 📝 Ejemplos de Uso

### **Formulario de Login**
```html
<form>
  <button type="submit" class="btn-primary">Iniciar Sesión</button>
  <button type="button" class="btn-outline-secondary">Cancelar</button>
</form>
```

### **Panel de Administración**
```html
<div class="admin-panel">
  <button class="btn-success">Guardar</button>
  <button class="btn-warning">Editar</button>
  <button class="btn-error">Eliminar</button>
  <button class="btn-info">Ver Detalles</button>
</div>
```

### **Navegación**
```html
<nav>
  <button class="btn-ghost-primary">Inicio</button>
  <button class="btn-ghost-primary">Productos</button>
  <button class="btn-ghost-primary">Contacto</button>
</nav>
```

### **Acciones de Marca**
```html
<div class="brand-actions">
  <button class="btn-brand-primary">Comprar Ahora</button>
  <button class="btn-brand-blue">Más Información</button>
  <button class="btn-outline-brand-accent">Ver Demo</button>
</div>
```

### **Botones de Redes Sociales**
```html
<div class="social-buttons">
  <button class="btn-icon-pink">Instagram</button>
  <button class="btn-icon-blue">Facebook</button>
  <button class="btn-icon-cyan">Twitter</button>
  <button class="btn-icon-lime">WhatsApp</button>
</div>
```

### **Combinaciones Avanzadas**
```html
<!-- Botón completo con todas las clases -->
<button class="btn-primary rounded-lg border-md shadow-lg-colored">
  Botón Completo
</button>

<!-- Botón con icono -->
<button class="btn-success button-icon">
  <i class="icon-check"></i>
</button>

<!-- Botón de tamaño personalizado -->
<button class="btn-brand-blue button-lg rounded-xl">
  Botón Grande
</button>
```

---

## ✅ Mejores Prácticas

### 1. **Jerarquía Visual**
- Usa `btn-primary` para la acción principal
- Usa `btn-secondary` para acciones secundarias
- Usa `btn-outline-*` para acciones terciarias
- Usa `btn-ghost-*` para acciones sutiles

### 2. **Consistencia de Colores**
- Mantén la misma paleta de colores en toda la aplicación
- Usa los tokens del sistema de diseño
- Evita colores personalizados fuera del sistema

### 3. **Accesibilidad**
- Siempre incluye texto descriptivo
- Usa contraste adecuado (automático con los tokens)
- Proporciona estados de focus visibles
- Incluye atributos ARIA cuando sea necesario

### 4. **Estados y Feedback**
- Usa `btn-success` para confirmaciones
- Usa `btn-warning` para advertencias
- Usa `btn-error` para errores
- Usa `btn-info` para información

### 5. **Tamaños Apropiados**
- Usa tamaños consistentes con el contexto
- Considera el espacio disponible
- Mantén proporciones adecuadas

### 6. **Performance**
- Las clases se basan en tokens CSS
- No hay JavaScript adicional requerido
- Transiciones suaves automáticas

---

## 🔧 Personalización

### **Agregar Nuevo Color de Botón**
1. Agrega el token de color en `__tokens.scss`
2. Crea la clase en `__colors.scss`
3. Documenta el uso en esta guía

### **Modificar Color Existente**
1. Actualiza el token en `__tokens.scss`
2. La clase se actualiza automáticamente
3. Verifica que no rompa el diseño existente

### **Crear Variante Personalizada**
```scss
.btn-custom {
  background-color: var(--color-custom);
  color: var(--color-text-on-primary);
  border-color: var(--color-custom);
}
```

---

## 🔧 Solución de Problemas

### **Error con @extend**
Si encuentras errores como "The target selector was not found" al usar `@extend`, esto se debe a que las clases no están disponibles en el scope del componente. 

**Solución recomendada**: Usar tokens CSS directamente en lugar de `@extend`:

```scss
// ❌ Problemático con @extend
.button-primary {
  @extend .btn-primary; // Error: selector not found
}

// ✅ Solución recomendada
.button-primary {
  background-color: var(--color-button-primary);
  color: var(--color-text-on-primary);
  border-color: var(--color-button-primary);
}
```

**Ventajas de usar tokens directamente**:
- No hay problemas de scope
- Mejor performance (menos CSS generado)
- Más fácil de debuggear
- Compatible con todos los bundlers

---

## 🎯 Uso del Componente Button

### **Tipos Disponibles:**

#### **Botones Principales:**
```html
<app-button type="primary">Botón Principal</app-button>
<app-button type="secondary">Botón Secundario</app-button>
<app-button type="accent">Botón de Acento</app-button>
```

#### **Botones de Estado:**
```html
<app-button type="success">Éxito</app-button>
<app-button type="warning">Advertencia</app-button>
<app-button type="danger">Peligro</app-button>
<app-button type="info">Información</app-button>
```

#### **Botones de Marca:**
```html
<app-button type="brand-primary">Marca Principal</app-button>
<app-button type="brand-secondary">Marca Secundaria</app-button>
<app-button type="brand-blue">Marca Azul</app-button>
```

#### **Botones Ghost:**
```html
<app-button type="primary-ghost">Ghost Principal</app-button>
<app-button type="success-ghost">Ghost Éxito</app-button>
<app-button type="danger-ghost">Ghost Peligro</app-button>
<app-button type="warning-ghost">Ghost Advertencia</app-button>
<app-button type="info-ghost">Ghost Información</app-button>
```

#### **Botones Outline:**
```html
<app-button type="primary-outline">Outline Principal</app-button>
<app-button type="success-outline">Outline Éxito</app-button>
<app-button type="danger-outline">Outline Peligro</app-button>
<app-button type="warning-outline">Outline Advertencia</app-button>
<app-button type="info-outline">Outline Información</app-button>
```

### **Ejemplos de Uso Real:**

#### **Formulario de Login:**
```html
<div class="login-form">
  <app-button type="primary">Iniciar Sesión</app-button>
  <app-button type="primary-outline">Cancelar</app-button>
</div>
```

#### **Panel de Administración:**
```html
<div class="admin-panel">
  <app-button type="success">Guardar</app-button>
  <app-button type="warning">Editar</app-button>
  <app-button type="danger">Eliminar</app-button>
  <app-button type="info">Ver Detalles</app-button>
</div>
```

#### **Navegación:**
```html
<nav class="navigation">
  <app-button type="primary-ghost">Inicio</app-button>
  <app-button type="primary-ghost">Productos</app-button>
  <app-button type="primary-ghost">Contacto</app-button>
</nav>
```

### **Control de Radius:**

El componente Button incluye un input `radius` para controlar el border-radius:

#### **Opciones de Radius:**
```html
<!-- Tamaños disponibles -->
<app-button type="primary" radius="xs">XS (8px)</app-button>
<app-button type="primary" radius="sm">SM (16px)</app-button>
<app-button type="primary" radius="md">MD (24px) - por defecto</app-button>
<app-button type="primary" radius="lg">LG (32px)</app-button>
<app-button type="primary" radius="xl">XL (40px)</app-button>
<app-button type="primary" radius="none">NONE (0px)</app-button>
```

#### **Ejemplos de Uso con Radius:**
```html
<!-- Formularios (radius pequeño) -->
<app-button type="primary" radius="sm">Guardar</app-button>
<app-button type="secondary" radius="sm">Cancelar</app-button>

<!-- Cards (radius grande) -->
<app-button type="success" radius="lg">Aceptar</app-button>
<app-button type="warning" radius="lg">Editar</app-button>

<!-- Navegación (sin radius) -->
<app-button type="primary-ghost" radius="none">Inicio</app-button>
<app-button type="primary-ghost" radius="none">Productos</app-button>
```

### **Control de Shadow:**

El componente Button incluye un input unificado para controlar las sombras:

#### **Nomenclatura de Shadow:**
- **Sombras normales**: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `inner`, `none`
- **Sombras de hover**: `xs-hover`, `sm-hover`, `md-hover`, `lg-hover`, `xl-hover`, `2xl-hover`, `inner-hover`, `none-hover`

#### **Opciones de Shadow:**
```html
<!-- Sombras normales -->
<app-button type="primary" shadow="none">Sin Sombra</app-button>
<app-button type="primary" shadow="sm">Sombra Pequeña (por defecto)</app-button>
<app-button type="primary" shadow="base">Sombra Base</app-button>
<app-button type="primary" shadow="md">Sombra Mediana</app-button>
<app-button type="primary" shadow="lg">Sombra Grande</app-button>
<app-button type="primary" shadow="xl">Sombra XL</app-button>
<app-button type="primary" shadow="2xl">Sombra 2XL</app-button>
<app-button type="primary" shadow="inner">Sombra Interna</app-button>

<!-- Sombras de hover -->
<app-button type="primary" shadow="sm-hover">Sombra SM solo en Hover</app-button>
<app-button type="primary" shadow="md-hover">Sombra MD solo en Hover</app-button>
<app-button type="primary" shadow="lg-hover">Sombra LG solo en Hover</app-button>
<app-button type="primary" shadow="xl-hover">Sombra XL solo en Hover</app-button>
```

#### **Ejemplos de Uso con Shadow:**
```html
<!-- Formularios (shadow pequeña) -->
<app-button type="primary" shadow="sm">Guardar</app-button>
<app-button type="secondary" shadow="sm">Cancelar</app-button>

<!-- Cards (shadow grande con hover) -->
<app-button type="success" shadow="lg">Aceptar</app-button>
<app-button type="warning" shadow="lg">Editar</app-button>

<!-- Navegación (sin shadow, hover mediano) -->
<app-button type="primary-ghost" shadow="md-hover">Inicio</app-button>
<app-button type="primary-ghost" shadow="md-hover">Productos</app-button>

<!-- Botones con sombra interna -->
<app-button type="secondary" shadow="inner">Botón Hundido</app-button>
<app-button type="info" shadow="inner-hover">Hover Hundido</app-button>
```

---

## 📚 Referencias

- [Tokens de Colores](../src/assets/foundations/__tokens.scss)
- [Clases de Colores](../src/assets/foundations/__colors.scss)
- [Componente Button](../src/app/commons/components/button/)
- [Demo de Botones](./button-colors-demo.html)
- [Sistema de Colores](./COLOR_SYSTEM_GUIDE.md)
- [Guía de Espaciado](./SPACING_GUIDE.md)
- [Guía de Fuentes](./FONT_TOKENS_GUIDE.md)
