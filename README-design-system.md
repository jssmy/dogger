# 🎨 Design System - Dogger

Sistema de diseño completo para el proyecto Dogger, basado en principios de jerarquía visual, consistencia y escalabilidad.

## 📋 Tabla de Contenidos

- [Instalación](#instalación)
- [Estructura](#estructura)
- [Tokens de Color](#tokens-de-color)
- [Sistema de Colores](#sistema-de-colores)
- [Sistema de Espaciado](#sistema-de-espaciado)
- [Sistema de Radius](#sistema-de-radius)
- [Sistema de Grid](#sistema-de-grid)
- [Tipografía](#tipografía)
- [Uso en Componentes](#uso-en-componentes)
- [Mejores Prácticas](#mejores-prácticas)
- [Ejemplos](#ejemplos)

## 🚀 Instalación

### Importación Completa
```scss
// Importa todo el sistema de foundations
@import 'assets/foundations/__index.scss';
```

### Importación Selectiva
```scss
// Solo tokens de color
@import 'assets/foundations/__tokens.scss';

// Solo sistema de colores
@import 'assets/foundations/__colors.scss';

// Solo sistema de radius
@import 'assets/foundations/__radius.scss';

// Solo espaciado
@import 'assets/foundations/__spacing.scss';

// Solo tipografía
@import 'assets/foundations/__typographic.scss';

// Solo sistema de grid
@import 'assets/foundations/__grid.scss';
```

## 🏗️ Estructura

```
src/assets/foundations/
├── __index.scss          # Importación centralizada
├── __tokens.scss         # Tokens de diseño (colores, etc.)
├── __colors.scss         # Sistema de colores y clases utilitarias
├── __radius.scss         # Sistema de border-radius
├── __spacing.scss        # Sistema de espaciado (padding/margin)
├── __grid.scss           # Sistema de grid, flexbox y gaps
└── __typographic.scss    # Sistema tipográfico
```

### 📋 Organización por Funcionalidad

| Archivo | Responsabilidad | Contenido |
|---------|----------------|-----------|
| `__tokens.scss` | **Tokens base** | Variables CSS, colores, spacing, radius, fonts |
| `__colors.scss` | **Colores de fondo/bordes/estados** | Backgrounds, borders, hover/focus states, brand colors |
| `__spacing.scss` | **Espaciado de elementos** | Padding, margin utilities |
| `__grid.scss` | **Layout y gaps** | Grid system, flexbox, gap utilities |
| `__radius.scss` | **Border radius** | Radius utilities que referencian tokens |
| `__typographic.scss` | **Tipografía y colores de texto** | Font utilities, text colors, typography classes |

### ⚠️ Importante: Sin Duplicación

- **Text colors** están únicamente en `__typographic.scss` (`.content-high`, `.content-mid`, `.content-low`)
- **Background/Border colors** están únicamente en `__colors.scss`
- **Gap utilities** están únicamente en `__grid.scss`
- **Padding/Margin utilities** están únicamente en `__spacing.scss`
- **Tokens** están centralizados en `__tokens.scss`

## 🎨 Tokens de Color

### Jerarquía de Texto (Para Fondos Oscuros)

```scss
--color-content-high: #FFFFFF;  /* Títulos y texto principal */
--color-content-mid: #E0E0E0;   /* Texto secundario */
--color-content-low: #BDBDBD;   /* Texto terciario/ayuda */
```

### Colores de Fondo

```scss
--color-background-primary: #000000;    /* Fondo principal oscuro */
--color-background-secondary: #1A1A1A;  /* Fondo secundario */
--color-background-accent: #87CEEB;     /* Azul cielo para acentos */
```

### Colores de Marca

```scss
--color-brand-primary: #4CAF50;       /* Verde vibrante principal */
--color-brand-secondary: #F44336;     /* Rojo secundario */
--color-brand-accent: #FF9800;        /* Naranja de acento */
--color-brand-blue: #2196F3;          /* Azul principal */
--color-brand-dark: #1A237E;          /* Azul oscuro para fondos */
```

### Elementos Interactivos

```scss
--color-button-primary: #32CD32;        /* Verde lima para botones principales */
--color-button-secondary: #FFFFFF;      /* Blanco para botones secundarios */
--color-button-accent: #FF5722;         /* Naranja-rojo para botones de acento */
```

### Colores de Estado

```scss
--color-success: #4CAF50;               /* Verde para éxito */
--color-warning: #FF9800;               /* Naranja para advertencias */
--color-error: #F44336;                 /* Rojo para errores */
--color-info: #2196F3;                  /* Azul para información */
```

### Colores de Iconos

```scss
--color-icon-pink: #E91E63;           /* Rosa/Púrpura */
--color-icon-blue: #2196F3;           /* Azul estándar */
--color-icon-teal: #00BCD4;           /* Teal/Cian */
--color-icon-indigo: #3F51B5;         /* Azul oscuro */
--color-icon-lime: #8BC34A;           /* Verde claro */
--color-icon-cyan: #1DA1F2;           /* Azul cian */
```

### Texto en Fondos Coloreados

```scss
--color-text-on-dark: #FFFFFF;         /* Texto blanco para fondos oscuros */
--color-text-on-light: #000000;        /* Texto negro para fondos claros */
--color-text-on-primary: #FFFFFF;      /* Texto blanco para fondos primarios */
```

## 🎨 Sistema de Colores

Sistema completo de clases utilitarias de colores basado en los tokens de diseño, organizadas por categorías y funcionalidad.

### Text Colors (Colores de Texto)

#### Jerarquía de Contenido
> **Nota:** Los colores de texto principales están en el sistema tipográfico (`__typographic.scss`)
```scss
.content-high     /* color: var(--color-content-high) - #FFFFFF */
.content-mid      /* color: var(--color-content-mid) - #E0E0E0 */
.content-low      /* color: var(--color-content-low) - #BDBDBD */
```

#### Texto en Fondos Coloreados
```scss
.text-on-dark     /* color: var(--color-text-on-dark) - #FFFFFF */
.text-on-light    /* color: var(--color-text-on-light) - #000000 */
.text-on-primary  /* color: var(--color-text-on-primary) - #FFFFFF */
```

### Background Colors (Colores de Fondo)

```scss
.bg-primary       /* background-color: var(--color-background-primary) - #000000 */
.bg-secondary     /* background-color: var(--color-background-secondary) - #1A1A1A */
.bg-accent        /* background-color: var(--color-background-accent) - #87CEEB */
```

### Brand Colors (Colores de Marca)

#### Colores de Marca - Texto
```scss
.brand-primary    /* color: var(--color-brand-primary) - #4CAF50 */
.brand-secondary  /* color: var(--color-brand-secondary) - #F44336 */
.brand-accent     /* color: var(--color-brand-accent) - #FF9800 */
.brand-blue       /* color: var(--color-brand-blue) - #2196F3 */
.brand-dark       /* color: var(--color-brand-dark) - #1A237E */
```

#### Colores de Marca - Fondo
```scss
.bg-brand-primary    /* background-color: var(--color-brand-primary) */
.bg-brand-secondary  /* background-color: var(--color-brand-secondary) */
.bg-brand-accent     /* background-color: var(--color-brand-accent) */
.bg-brand-blue       /* background-color: var(--color-brand-blue) */
.bg-brand-dark       /* background-color: var(--color-brand-dark) */
```

### Interactive Element Colors (Elementos Interactivos)

#### Colores de Botones - Texto
```scss
.button-primary   /* color: var(--color-button-primary) - #32CD32 */
.button-secondary /* color: var(--color-button-secondary) - #FFFFFF */
.button-accent    /* color: var(--color-button-accent) - #FF5722 */
```

#### Colores de Botones - Fondo
```scss
.bg-button-primary   /* background-color: var(--color-button-primary) */
.bg-button-secondary /* background-color: var(--color-button-secondary) */
.bg-button-accent    /* background-color: var(--color-button-accent) */
```

### Icon and Platform Colors (Iconos y Plataformas)

#### Iconos - Texto
```scss
.icon-pink     /* color: var(--color-icon-pink) - #E91E63 */
.icon-blue     /* color: var(--color-icon-blue) - #2196F3 */
.icon-teal     /* color: var(--color-icon-teal) - #00BCD4 */
.icon-indigo   /* color: var(--color-icon-indigo) - #3F51B5 */
.icon-lime     /* color: var(--color-icon-lime) - #8BC34A */
.icon-cyan     /* color: var(--color-icon-cyan) - #1DA1F2 */
```

#### Iconos - Fondo
```scss
.bg-icon-pink     /* background-color: var(--color-icon-pink) */
.bg-icon-blue     /* background-color: var(--color-icon-blue) */
.bg-icon-teal     /* background-color: var(--color-icon-teal) */
.bg-icon-indigo   /* background-color: var(--color-icon-indigo) */
.bg-icon-lime     /* background-color: var(--color-icon-lime) */
.bg-icon-cyan     /* background-color: var(--color-icon-cyan) */
```

### Status and Feedback Colors (Estado y Feedback)

#### Estados - Texto
```scss
.success   /* color: var(--color-success) - #4CAF50 */
.warning   /* color: var(--color-warning) - #FF9800 */
.error     /* color: var(--color-error) - #F44336 */
.info      /* color: var(--color-info) - #2196F3 */
```

#### Estados - Fondo
```scss
.bg-success   /* background-color: var(--color-success) */
.bg-warning   /* background-color: var(--color-warning) */
.bg-error     /* background-color: var(--color-error) */
.bg-info      /* background-color: var(--color-info) */
```

### Border Colors (Colores de Borde)

```scss
.border-primary    /* border-color: var(--color-brand-primary) */
.border-secondary  /* border-color: var(--color-brand-secondary) */
.border-accent     /* border-color: var(--color-brand-accent) */
.border-blue       /* border-color: var(--color-brand-blue) */
.border-dark       /* border-color: var(--color-brand-dark) */
.border-success    /* border-color: var(--color-success) */
.border-warning    /* border-color: var(--color-warning) */
.border-error      /* border-color: var(--color-error) */
.border-info       /* border-color: var(--color-info) */
```

### Hover States (Estados Hover)

#### Hover - Texto
```scss
.hover-primary:hover     /* color: var(--color-brand-primary) */
.hover-secondary:hover   /* color: var(--color-brand-secondary) */
.hover-accent:hover      /* color: var(--color-brand-accent) */
.hover-blue:hover        /* color: var(--color-brand-blue) */
```

#### Hover - Fondo
```scss
.hover-bg-primary:hover     /* background-color: var(--color-brand-primary) */
.hover-bg-secondary:hover   /* background-color: var(--color-brand-secondary) */
.hover-bg-accent:hover      /* background-color: var(--color-brand-accent) */
.hover-bg-blue:hover        /* background-color: var(--color-brand-blue) */
```

### Focus States (Estados Focus)

```scss
.focus-primary:focus     /* outline: 2px solid var(--color-brand-primary) */
.focus-secondary:focus   /* outline: 2px solid var(--color-brand-secondary) */
.focus-accent:focus      /* outline: 2px solid var(--color-brand-accent) */
.focus-blue:focus        /* outline: 2px solid var(--color-brand-blue) */
```

### Utility Classes (Clases Utilitarias)

#### Transparencia
```scss
.opacity-25    /* opacity: 0.25 */
.opacity-50    /* opacity: 0.5 */
.opacity-75    /* opacity: 0.75 */
.opacity-100   /* opacity: 1 */
```

#### Utilidades Especiales
```scss
.invert        /* filter: invert(1) */
.no-color      /* color: inherit */
.no-bg         /* background-color: transparent */
.no-border     /* border-color: transparent */
```

### Uso en HTML

```html
<!-- Ejemplo de uso básico -->
<div class="bg-primary text-on-dark">
  <h1 class="content-high">Título Principal</h1>
  <p class="content-mid">Texto secundario</p>
  <span class="content-low">Texto de ayuda</span>
</div>

<!-- Botones con colores de marca -->
<button class="bg-brand-primary text-on-primary">Botón Primario</button>
<button class="bg-button-secondary brand-primary">Botón Secundario</button>

<!-- Estados de feedback -->
<div class="bg-success text-on-primary">Éxito</div>
<div class="bg-warning text-on-light">Advertencia</div>
<div class="bg-error text-on-primary">Error</div>

<!-- Iconos con colores -->
<i class="icon-pink">❤️</i>
<i class="icon-blue">🐦</i>
<i class="icon-teal">💬</i>

<!-- Elementos interactivos -->
<a href="#" class="hover-primary">Enlace con hover</a>
<button class="bg-brand-primary hover-bg-accent focus-primary">
  Botón con estados
</button>
```

### Uso en CSS

```scss
/* Combinando con otras utilidades */
.card {
  @extend .bg-secondary;
  @extend .border-primary;
  @extend .radius-lg;
  padding: var(--space-4);
  
  .card-title {
    @extend .content-high;
    @extend .brand-primary;
  }
  
  .card-content {
    @extend .content-mid;
  }
}

/* Estados personalizados */
.button {
  @extend .bg-button-primary;
  @extend .text-on-primary;
  @extend .radius-md;
  padding: var(--space-2) var(--space-4);
  
  &:hover {
    @extend .hover-bg-accent;
  }
  
  &:focus {
    @extend .focus-primary;
  }
}
```

## 📏 Sistema de Espaciado

Basado en una unidad base de **4px**:

```scss
--space-1: 4px;    /* Espaciado mínimo */
--space-2: 8px;    /* Espaciado pequeño */
--space-3: 12px;   /* Espaciado mediano */
--space-4: 16px;   /* Espaciado grande */
--space-5: 20px;   /* Espaciado extra grande */
--space-6: 24px;   /* Espaciado muy grande */
--space-7: 28px;   /* Espaciado máximo */
--space-8: 32px;   /* Espaciado ultra grande */
```

### Uso en CSS

```scss
.card {
  padding: var(--space-3);        /* 12px */
  margin-bottom: var(--space-4);  /* 16px */
  gap: var(--space-2);            /* 8px */
}
```

## 🔲 Sistema de Radius

### Tokens de Radius

```scss
--radius-tiny: 4px;     /* Muy pequeño - para elementos sutiles */
--radius-small: 6px;    /* Pequeño - usa --space-1 */
--radius-medium: 8px;   /* Medio - usa --space-2 */
--radius-large: 12px;   /* Grande - usa --space-3 */
--radius-xl: 16px;      /* Extra grande - usa --space-4 */
```

### Clases Utilitarias

#### Radius Completo (Todos los lados)
```scss
.radius-xs     /* 4px en todos los lados */
.radius-sm     /* 6px en todos los lados */
.radius-md     /* 8px en todos los lados */
.radius-lg     /* 12px en todos los lados */
.radius-xl     /* 16px en todos los lados */
```

#### Radius por Lados
```scss
/* Esquinas superiores */
.radius-top-xs, .radius-top-sm, .radius-top-md, .radius-top-lg, .radius-top-xl

/* Esquinas inferiores */
.radius-bottom-xs, .radius-bottom-sm, .radius-bottom-md, .radius-bottom-lg, .radius-bottom-xl

/* Esquinas izquierdas */
.radius-left-xs, .radius-left-sm, .radius-left-md, .radius-left-lg, .radius-left-xl

/* Esquinas derechas */
.radius-right-xs, .radius-right-sm, .radius-right-md, .radius-right-lg, .radius-right-xl
```

### Uso Directo en CSS

```scss
.button {
  border-radius: var(--radius-medium);  /* 8px */
}

.card {
  border-radius: var(--radius-large);   /* 12px */
}
```

## 🏗️ Sistema de Grid

Sistema de grid responsivo basado en Flexbox con breakpoints estándar y integración completa con el sistema de spacing.

### Breakpoints

```scss
--breakpoint-xs: 0px;        /* Extra small devices (portrait phones) */
--breakpoint-sm: 576px;      /* Small devices (landscape phones) */
--breakpoint-md: 768px;      /* Medium devices (tablets) */
--breakpoint-lg: 992px;      /* Large devices (desktops) */
--breakpoint-xl: 1200px;     /* Extra large devices (large desktops) */
--breakpoint-xxl: 1400px;    /* Extra extra large devices */
```

### Container

```scss
.container {
  /* Contenedor con max-width responsivo */
  /* Mobile: sin max-width, padding var(--space-3) */
  /* Tablet: max-width 720px, padding var(--space-4) */
  /* Desktop: max-width 1140px */
}

.container-fluid {
  /* Contenedor sin max-width */
}
```

### Grid Layout

#### Filas y Columnas Básicas

```html
<div class="container">
  <div class="row">
    <div class="col-12">Columna completa</div>
  </div>
  
  <div class="row">
    <div class="col-6">Mitad izquierda</div>
    <div class="col-6">Mitad derecha</div>
  </div>
  
  <div class="row">
    <div class="col-4">Un tercio</div>
    <div class="col-4">Un tercio</div>
    <div class="col-4">Un tercio</div>
  </div>
</div>
```

#### Columnas Específicas

```scss
.col-1    /* 8.33% */
.col-2    /* 16.67% */
.col-3    /* 25% */
.col-4    /* 33.33% */
.col-5    /* 41.67% */
.col-6    /* 50% */
.col-7    /* 58.33% */
.col-8    /* 66.67% */
.col-9    /* 75% */
.col-10   /* 83.33% */
.col-11   /* 91.67% */
.col-12   /* 100% */
.col-auto /* Ancho automático */
```

### Grid Responsivo

#### Breakpoints por Dispositivo

```html
<!-- Responsive: 12 cols móvil, 6 cols tablet, 3 cols desktop -->
<div class="row">
  <div class="col-12 col-sm-6 col-lg-3">Card 1</div>
  <div class="col-12 col-sm-6 col-lg-3">Card 2</div>
  <div class="col-12 col-sm-6 col-lg-3">Card 3</div>
  <div class="col-12 col-sm-6 col-lg-3">Card 4</div>
</div>
```

#### Clases Responsivas

```scss
/* Small devices (≥576px) */
.col-sm-1, .col-sm-2, ..., .col-sm-12

/* Medium devices (≥768px) */
.col-md-1, .col-md-2, ..., .col-md-12

/* Large devices (≥992px) */
.col-lg-1, .col-lg-2, ..., .col-lg-12

/* Extra large devices (≥1200px) */
.col-xl-1, .col-xl-2, ..., .col-xl-12

/* Extra extra large devices (≥1400px) */
.col-xxl-1, .col-xxl-2, ..., .col-xxl-12
```

### Gutters (Espaciado entre Columnas)

#### Gutters por Defecto
```scss
/* Usa --space-2 (8px) por defecto */
.row {
  margin-left: calc(var(--space-2) * -0.5);
  margin-right: calc(var(--space-2) * -0.5);
}
```

#### Gutters Personalizados

```html
<!-- Sin gutters -->
<div class="row no-gutters">
  <div class="col-6">Columna 1</div>
  <div class="col-6">Columna 2</div>
</div>

<!-- Gutters pequeños -->
<div class="row gutter-1">
  <div class="col-6">Columna 1</div>
  <div class="col-6">Columna 2</div>
</div>

<!-- Gutters grandes -->
<div class="row gutter-4">
  <div class="col-6">Columna 1</div>
  <div class="col-6">Columna 2</div>
</div>
```

### Utilidades Flexbox

#### Display Flex

```scss
.d-flex         /* display: flex */
.d-inline-flex  /* display: inline-flex */
```

#### Flex Direction

```scss
.flex-row              /* flex-direction: row */
.flex-row-reverse      /* flex-direction: row-reverse */
.flex-column           /* flex-direction: column */
.flex-column-reverse   /* flex-direction: column-reverse */
```

#### Justify Content

```scss
.justify-content-start     /* justify-content: flex-start */
.justify-content-end       /* justify-content: flex-end */
.justify-content-center    /* justify-content: center */
.justify-content-between   /* justify-content: space-between */
.justify-content-around    /* justify-content: space-around */
.justify-content-evenly    /* justify-content: space-evenly */
```

#### Align Items

```scss
.align-items-start     /* align-items: flex-start */
.align-items-end       /* align-items: flex-end */
.align-items-center    /* align-items: center */
.align-items-baseline  /* align-items: baseline */
.align-items-stretch   /* align-items: stretch */
```

#### Gap Utilities

```scss
.gap-0  /* gap: 0 */
.gap-1  /* gap: var(--space-1) - 4px */
.gap-2  /* gap: var(--space-2) - 8px */
.gap-3  /* gap: var(--space-3) - 12px */
.gap-4  /* gap: var(--space-4) - 16px */
.gap-5  /* gap: var(--space-5) - 20px */
.gap-6  /* gap: var(--space-6) - 24px */
.gap-7  /* gap: var(--space-7) - 28px */
.gap-8  /* gap: var(--space-8) - 32px */

/* Gap específicos por dirección */
.row-gap-0, .row-gap-1, .row-gap-2, .row-gap-3, .row-gap-4, .row-gap-5, .row-gap-6, .row-gap-7, .row-gap-8
.column-gap-0, .column-gap-1, .column-gap-2, .column-gap-3, .column-gap-4, .column-gap-5, .column-gap-6, .column-gap-7, .column-gap-8
```

#### Order Utilities

```scss
.order-first  /* order: -1 */
.order-last   /* order: 9999 */
.order-0      /* order: 0 */
.order-1      /* order: 1 */
.order-2      /* order: 2 */
.order-3      /* order: 3 */
.order-4      /* order: 4 */
.order-5      /* order: 5 */
```

### Offset Utilities

```scss
.offset-1   /* margin-left: 8.333333% */
.offset-2   /* margin-left: 16.666667% */
.offset-3   /* margin-left: 25% */
.offset-4   /* margin-left: 33.333333% */
.offset-5   /* margin-left: 41.666667% */
.offset-6   /* margin-left: 50% */
```

### Uso en CSS

```scss
.custom-layout {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-3) 0;
  }
  
  .main-content {
    display: flex;
    gap: var(--space-4);
    
    .sidebar {
      flex: 0 0 250px;
    }
    
    .content {
      flex: 1;
    }
  }
}
```

## 📝 Tipografía

### Jerarquía Alta (Títulos, Encabezados)

```scss
--font-high-xs: 0.875rem;  /* 14px */
--font-high-s: 1rem;       /* 16px */
--font-high-m: 1.25rem;    /* 20px */
--font-high-l: 1.5rem;     /* 24px */
--font-high-xl: 2rem;      /* 32px */
```

### Jerarquía Baja (Texto Secundario, Ayuda, Labels)

```scss
--font-low-xs: 0.75rem;    /* 12px */
--font-low-s: 0.875rem;    /* 14px */
--font-low-m: 1rem;        /* 16px */
--font-low-l: 1.125rem;    /* 18px */
```

### Pesos de Fuente

```scss
--font-weight-normal: 400;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Uso en CSS

```scss
h1 {
  font-size: var(--font-high-xl);     /* 32px */
  font-weight: var(--font-weight-bold);
  color: var(--color-content-high);
}

p {
  font-size: var(--font-high-s);      /* 16px */
  color: var(--color-content-mid);
}

.small-text {
  font-size: var(--font-low-xs);      /* 12px */
  color: var(--color-content-low);
}
```

## 🧩 Uso en Componentes

### Botón Principal

```scss
.btn-primary {
  background: var(--color-button-primary);
  color: var(--color-text-on-primary);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-medium);
  font-size: var(--font-high-s);
  font-weight: var(--font-weight-semibold);
  border: none;
  cursor: pointer;
  
  &:hover {
    background: var(--color-brand-primary);
  }
}
```

### Card

```scss
.card {
  background: var(--color-background-secondary);
  border-radius: var(--radius-large);
  padding: var(--space-4);
  margin-bottom: var(--space-4);
  
  .card-title {
    font-size: var(--font-high-m);
    font-weight: var(--font-weight-bold);
    color: var(--color-content-high);
    margin-bottom: var(--space-2);
  }
  
  .card-content {
    font-size: var(--font-high-s);
    color: var(--color-content-mid);
    line-height: 1.5;
  }
}
```

### Input

```scss
.input {
  background: var(--color-background-primary);
  border: 2px solid var(--color-brand-blue);
  border-radius: var(--radius-small);
  padding: var(--space-2) var(--space-3);
  color: var(--color-content-high);
  font-size: var(--font-high-s);
  
  &:focus {
    border-color: var(--color-brand-primary);
    outline: none;
  }
  
  &::placeholder {
    color: var(--color-content-low);
  }
}
```

## ✅ Mejores Prácticas

### 1. **Siempre usa tokens en lugar de valores hardcodeados**

❌ **Mal:**
```scss
.button {
  background: #4CAF50;
  padding: 12px 24px;
  border-radius: 8px;
}
```

✅ **Bien:**
```scss
.button {
  background: var(--color-brand-primary);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-medium);
}
```

### 2. **Respeta la jerarquía de colores**

```scss
/* Para títulos principales */
.title {
  color: var(--color-content-high);
}

/* Para texto secundario */
.subtitle {
  color: var(--color-content-mid);
}

/* Para texto de ayuda */
.help-text {
  color: var(--color-content-low);
}
```

### 3. **Usa el sistema de espaciado consistente**

```scss
.container {
  padding: var(--space-4);
  margin: var(--space-2) 0;
  gap: var(--space-3);
}
```

### 4. **Combina radius con espaciado**

```scss
.card {
  border-radius: var(--radius-large);  /* 12px */
  padding: var(--space-3);             /* 12px - mismo valor */
}
```

### 5. **Evita duplicación de utilidades**

❌ **Mal:**
```scss
/* NO crear gaps en __spacing.scss si ya existen en __grid.scss */
.gap-1 { gap: var(--space-1); }
```

✅ **Bien:**
```scss
/* Usar las utilidades existentes del sistema */
.flex-container {
  display: flex;
  gap: var(--space-3);  /* O usar .gap-3 */
}
```

### 6. **Respeta la organización por archivo**

```scss
/* __typographic.scss - Solo colores de texto y tipografía */
.content-high { color: var(--color-content-high); }
.high-xl { font-size: var(--font-high-xl); }

/* __spacing.scss - Solo padding y margin */
.p-1 { padding: var(--space-1); }
.m-2 { margin: var(--space-2); }

/* __colors.scss - Solo colores de fondo, bordes, estados */
.bg-primary { background-color: var(--color-background-primary); }
.border-primary { border-color: var(--color-brand-primary); }

/* __grid.scss - Solo gaps y layout */
.gap-3 { gap: var(--space-3); }
.d-flex { display: flex; }
```

## 🎯 Ejemplos

### Header de Navegación

```scss
.header {
  background: var(--color-background-primary);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-brand-blue);
  
  .logo {
    font-size: var(--font-high-l);
    font-weight: var(--font-weight-bold);
    color: var(--color-content-high);
  }
  
  .nav-link {
    color: var(--color-content-mid);
    font-size: var(--font-high-s);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-small);
    
    &:hover {
      background: var(--color-background-secondary);
      color: var(--color-content-high);
    }
  }
}
```

### Layout Principal con Grid

```html
<div class="container">
  <!-- Header -->
  <header class="d-flex justify-content-between align-items-center py-4">
    <div class="logo">
      <h1>Mi Aplicación</h1>
    </div>
    <nav class="d-flex gap-3">
      <a href="#" class="nav-link">Inicio</a>
      <a href="#" class="nav-link">Productos</a>
      <a href="#" class="nav-link">Contacto</a>
    </nav>
  </header>
  
  <!-- Main Content -->
  <main class="row gutter-4">
    <aside class="col-12 col-lg-3">
      <div class="sidebar">
        <h3>Sidebar</h3>
        <p>Contenido del sidebar</p>
      </div>
    </aside>
    
    <section class="col-12 col-lg-9">
      <div class="content">
        <h2>Contenido Principal</h2>
        <p>Aquí va el contenido principal de la página</p>
      </div>
    </section>
  </main>
  
  <!-- Cards Grid -->
  <section class="row gutter-3 mt-5">
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="card">
        <h3>Card 1</h3>
        <p>Descripción de la card</p>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="card">
        <h3>Card 2</h3>
        <p>Descripción de la card</p>
      </div>
    </div>
    <div class="col-12 col-sm-12 col-lg-4">
      <div class="card">
        <h3>Card 3</h3>
        <p>Descripción de la card</p>
      </div>
    </div>
  </section>
</div>
```

### Modal

```scss
.modal {
  background: var(--color-background-secondary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  .modal-header {
    margin-bottom: var(--space-4);
    
    .modal-title {
      font-size: var(--font-high-m);
      font-weight: var(--font-weight-bold);
      color: var(--color-content-high);
    }
  }
  
  .modal-body {
    margin-bottom: var(--space-4);
    color: var(--color-content-mid);
    font-size: var(--font-high-s);
  }
  
  .modal-footer {
    display: flex;
    gap: var(--space-2);
    justify-content: flex-end;
  }
}
```

### Dashboard con Grid

```html
<div class="container-fluid">
  <!-- Stats Row -->
  <div class="row gutter-4 mb-4">
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="stat-card">
        <h4>Usuarios</h4>
        <p class="stat-number">1,234</p>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="stat-card">
        <h4>Ventas</h4>
        <p class="stat-number">$5,678</p>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="stat-card">
        <h4>Pedidos</h4>
        <p class="stat-number">89</p>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="stat-card">
        <h4>Conversión</h4>
        <p class="stat-number">3.2%</p>
      </div>
    </div>
  </div>
  
  <!-- Charts Row -->
  <div class="row gutter-4">
    <div class="col-12 col-lg-8">
      <div class="chart-container">
        <h3>Gráfico Principal</h3>
        <!-- Chart content -->
      </div>
    </div>
    <div class="col-12 col-lg-4">
      <div class="side-panel">
        <h3>Panel Lateral</h3>
        <!-- Side panel content -->
      </div>
    </div>
  </div>
</div>
```

### Formulario con Grid

```html
<div class="container">
  <form class="row gutter-3">
    <div class="col-12 col-md-6">
      <label for="firstName">Nombre</label>
      <input type="text" id="firstName" class="form-input" />
    </div>
    <div class="col-12 col-md-6">
      <label for="lastName">Apellido</label>
      <input type="text" id="lastName" class="form-input" />
    </div>
    <div class="col-12">
      <label for="email">Email</label>
      <input type="email" id="email" class="form-input" />
    </div>
    <div class="col-12 col-md-8">
      <label for="address">Dirección</label>
      <input type="text" id="address" class="form-input" />
    </div>
    <div class="col-12 col-md-4">
      <label for="zipCode">Código Postal</label>
      <input type="text" id="zipCode" class="form-input" />
    </div>
    <div class="col-12">
      <div class="d-flex justify-content-end gap-3">
        <button type="button" class="btn btn-secondary">Cancelar</button>
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </div>
  </form>
</div>
```

## 🔧 Personalización

### Agregar Nuevos Colores

```scss
/* En __tokens.scss */
:root {
  /* Tus colores existentes... */
  
  // Nuevos colores personalizados
  --color-custom-purple: #9C27B0;
  --color-custom-amber: #FFC107;
}
```

### Extender el Sistema de Radius

```scss
/* En __tokens.scss */
:root {
  /* Radius existentes... */
  
  // Nuevos tamaños
  --radius-xxl: 24px;     /* Extra extra grande */
  --radius-none: 0px;     /* Sin radius */
}
```

### Agregar Nuevas Clases

```scss
/* En __radius.scss */
.radius-xxl {
  border-radius: var(--radius-xxl);
}

.radius-none {
  border-radius: var(--radius-none);
}
```

### Personalizar el Sistema de Grid

#### Agregar Nuevos Breakpoints

```scss
/* En __grid.scss */
:root {
  /* Breakpoints existentes... */
  
  // Nuevos breakpoints personalizados
  --breakpoint-xs: 480px;     /* Móvil personalizado */
  --breakpoint-2xl: 1600px;   /* Pantallas extra grandes */
}

/* Agregar media queries para nuevos breakpoints */
@media (min-width: 1600px) {
  .col-2xl-1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
  .col-2xl-2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
  /* ... resto de columnas */
}
```

#### Crear Gutters Personalizados

```scss
/* En __grid.scss */
.row {
  /* Gutters existentes... */
  
  // Gutters personalizados
  &.gutter-0 {
    margin-left: 0;
    margin-right: 0;
    
    > .col,
    > [class*="col-"] {
      padding-left: 0;
      padding-right: 0;
    }
  }
  
  &.gutter-custom {
    margin-left: calc(var(--space-6) * -0.5);
    margin-right: calc(var(--space-6) * -0.5);
    
    > .col,
    > [class*="col-"] {
      padding-left: calc(var(--space-6) * 0.5);
      padding-right: calc(var(--space-6) * 0.5);
    }
  }
}
```

#### Agregar Utilidades Flexbox Personalizadas

```scss
/* En __grid.scss */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.flex-responsive {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  
  @media (min-width: 768px) {
    flex-wrap: nowrap;
    gap: var(--space-4);
  }
}
```

## 📚 Recursos Adicionales

- [Figma Design Tokens Plugin](https://www.figma.com/community/plugin/843461159747178946/Design-Tokens)
- [CSS Custom Properties MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Design Systems Handbook](https://www.designbetter.co/design-systems-handbook)

## 🤝 Contribución

Para contribuir al sistema de diseño:

1. **Mantén la consistencia** con los patrones existentes
2. **Documenta** cualquier nuevo token o clase
3. **Usa nombres semánticos** en lugar de valores específicos
4. **Actualiza** este README cuando agregues nuevas funcionalidades

---

**Versión:** 1.2.1  
**Última actualización:** Diciembre 2024  
**Mantenido por:** Equipo Dogger

### 📋 Changelog

#### v1.2.1 (Diciembre 2024)
- 🧹 **Corrección:** Eliminada duplicación de text colors entre `__colors.scss` y `__typographic.scss`
- 📋 **Organización:** Text colors únicamente en `__typographic.scss` (`.content-high`, `.content-mid`, `.content-low`)
- 📚 **Documentación:** Actualizada para reflejar la organización correcta de colores

#### v1.2.0 (Diciembre 2024)
- 🎨 **Nuevo:** Sistema completo de colores con clases utilitarias
- 🎯 **Características:** Background colors, borders, hover/focus states, brand colors
- 📚 **Documentación:** Guía completa de uso del sistema de colores
- 🔧 **Organización:** Separación clara entre tokens y clases utilitarias

#### v1.1.1 (Diciembre 2024)
- 🧹 **Corrección:** Eliminada duplicación de gap utilities
- 📋 **Organización:** Clarificada responsabilidad de cada archivo
- 📚 **Documentación:** Actualizada estructura y organización del sistema

#### v1.1.0 (Diciembre 2024)
- ✅ Agregado sistema de grid completo con Flexbox
- ✅ Breakpoints responsivos estándar (xs, sm, md, lg, xl, xxl)
- ✅ Utilidades flexbox completas
- ✅ Sistema de gutters personalizables
- ✅ Gap utilities integradas con spacing system
- ✅ Offset utilities para columnas
- ✅ Ejemplos prácticos de layouts
- ✅ Documentación completa del sistema de grid

#### v1.0.0 (Diciembre 2024)
- ✅ Sistema de tokens de color con jerarquía
- ✅ Sistema de spacing (4px base unit)
- ✅ Sistema de radius con nomenclatura semántica
- ✅ Sistema tipográfico escalable
- ✅ Documentación inicial
