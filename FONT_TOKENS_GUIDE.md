# 🎨 Guía de Tokens de Fuentes - Sistema de Diseño

## 📋 Índice
- [Tokens de Fuentes](#tokens-de-fuentes)
- [Clases de Utilidad](#clases-de-utilidad)
- [Combinaciones Tipográficas](#combinaciones-tipográficas)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Mejores Prácticas](#mejores-prácticas)

---

## 🎯 Tokens de Fuentes

### Fuentes Principales (Títulos y Contenido Principal)
```scss
--font-primary: "Hornbil Black", "Arial Black", sans-serif;
--font-primary-bold: "Hornbil Bold", "Arial Black", sans-serif;
--font-primary-italic: "Hornbil Black Italic", "Arial Black", sans-serif;
--font-primary-bold-italic: "Hornbil Bold Italic", "Arial Black", sans-serif;
```

### Fuentes Secundarias (Subtítulos y Contenido Secundario)
```scss
--font-secondary: "BenjaminFranklin", "Times New Roman", serif;
--font-secondary-display: "Gord-Quick-Font", "Arial", sans-serif;
```

### Fuentes Decorativas (Títulos Especiales, Logos)
```scss
--font-decorative: "Retro Team", "Impact", sans-serif;
--font-decorative-outline: "KGRedHandsOutline", "Impact", sans-serif;
--font-decorative-solid: "KGRedHands", "Impact", sans-serif;
--font-decorative-display: "Nougat-ExtraBlack", "Impact", sans-serif;
```

### Fuentes Monoespaciadas (Código, Datos, Direcciones)
```scss
--font-mono: "JMH Typewriter", "Courier New", monospace;
--font-mono-bold: "JMH Typewriter bold", "Courier New", monospace;
--font-mono-black: "JMH Typewriter black", "Courier New", monospace;
--font-mono-thin: "JMH Typewriter Thin", "Courier New", monospace;
--font-mono-alt: "Mom Typewriter", "Courier New", monospace;
```

### Fuentes Especiales (Efectos, Temáticas)
```scss
--font-special: "Plane Cash", "Impact", sans-serif;
--font-special-alt: "Cacha-font", "Arial", sans-serif;
```

---

## 🛠️ Clases de Utilidad

### Fuentes Individuales
```html
<!-- Fuentes principales -->
<h1 class="font-primary">Título Principal</h1>
<h2 class="font-primary-bold">Título Secundario</h2>
<p class="font-primary-italic">Texto en cursiva</p>

<!-- Fuentes secundarias -->
<h3 class="font-secondary">Subtítulo</h3>
<p class="font-secondary-display">Texto de display</p>

<!-- Fuentes decorativas -->
<h1 class="font-decorative">Título Decorativo</h1>
<h2 class="font-decorative-outline">Título con Outline</h2>
<h3 class="font-decorative-solid">Título Sólido</h3>

<!-- Fuentes monoespaciadas -->
<code class="font-mono">código</code>
<pre class="font-mono-bold">código en negrita</pre>
<address class="font-mono-thin">dirección</address>

<!-- Fuentes especiales -->
<h1 class="font-special">Título Especial</h1>
<p class="font-special-alt">Texto alternativo</p>
```

---

## 🎨 Combinaciones Tipográficas

### Títulos
```html
<!-- Título principal con fuente decorativa -->
<h1 class="title-primary">DOGGER</h1>

<!-- Título secundario con fuente principal -->
<h2 class="title-secondary">The Ultimate Dog Companion</h2>
```

### Subtítulos
```html
<!-- Subtítulo con fuente secundaria -->
<h3 class="subtitle-primary">Características Principales</h3>

<!-- Subtítulo con fuente de display -->
<h4 class="subtitle-secondary">Información Adicional</h4>
```

### Texto de Cuerpo
```html
<!-- Texto principal -->
<p class="body-primary">Contenido principal del sitio web.</p>

<!-- Texto secundario -->
<p class="body-secondary">Información complementaria.</p>
```

### Código y Datos
```html
<!-- Código con fondo -->
<code class="code-primary">0x1234...5678</code>

<!-- Código en negrita -->
<pre class="code-bold">function example() { return true; }</pre>
```

### Etiquetas y Labels
```html
<!-- Etiqueta principal -->
<span class="label-primary">Nuevo</span>

<!-- Etiqueta secundaria -->
<span class="label-secondary">Opcional</span>
```

### Captions y Ayuda
```html
<!-- Caption principal -->
<small class="caption-primary">Información adicional</small>

<!-- Caption secundario -->
<small class="caption-secondary">Código: ABC123</small>
```

---

## 📝 Ejemplos de Uso

### Hero Section
```html
<section class="hero">
  <h1 class="title-primary">DOGGER</h1>
  <h2 class="subtitle-primary">The Ultimate Dog Companion</h2>
  <p class="body-primary">WE LOVE DOGS! WE PROTECT DOGS!</p>
  <code class="code-primary">0x1234...5678</code>
</section>
```

### Card Component
```html
<div class="card">
  <h3 class="title-secondary">Características</h3>
  <p class="body-secondary">Descripción del producto.</p>
  <span class="label-primary">Destacado</span>
  <small class="caption-primary">Más información</small>
</div>
```

### Formulario
```html
<form>
  <label class="label-primary">Dirección del Contrato</label>
  <input type="text" class="font-mono" placeholder="0x...">
  <small class="caption-secondary">Ingresa la dirección completa</small>
</form>
```

---

## ✅ Mejores Prácticas

### 1. **Jerarquía Visual**
- Usa `title-primary` para títulos principales
- Usa `title-secondary` para títulos de sección
- Usa `subtitle-primary` para subtítulos
- Usa `body-primary` para texto principal

### 2. **Consistencia**
- Mantén la misma fuente para el mismo tipo de contenido
- Usa las combinaciones tipográficas predefinidas
- Evita mezclar fuentes decorativas en el mismo contexto

### 3. **Legibilidad**
- Usa fuentes monoespaciadas para código y direcciones
- Mantén contraste adecuado con los colores del sistema
- Usa tamaños apropiados para cada contexto

### 4. **Accesibilidad**
- Siempre incluye fuentes de fallback
- Mantén ratios de contraste adecuados
- Usa tamaños de fuente legibles

### 5. **Performance**
- Las fuentes se cargan desde el archivo `_fonts.scss`
- Usa las fuentes de manera consistente
- Evita cargar fuentes innecesarias

---

## 🔧 Personalización

### Agregar Nueva Fuente
1. Agrega la definición `@font-face` en `_fonts.scss`
2. Crea el token en `__tokens.scss`
3. Agrega la clase de utilidad en `__typographic.scss`
4. Documenta el uso en esta guía

### Modificar Fuente Existente
1. Actualiza el token en `__tokens.scss`
2. La clase de utilidad se actualiza automáticamente
3. Verifica que no rompa el diseño existente

---

## 📚 Referencias

- [Archivo de Fuentes](../src/assets/fonts/_fonts.scss)
- [Tokens de Fuentes](../src/assets/foundations/__tokens.scss)
- [Clases Tipográficas](../src/assets/foundations/__typographic.scss)
- [Sistema de Colores](./COLOR_SYSTEM_GUIDE.md)
- [Guía de Espaciado](./SPACING_GUIDE.md)
