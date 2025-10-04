# 🎯 Button Types Guide

## 📋 **Descripción**

Este archivo contiene todos los tipos TypeScript utilizados por el componente Button para mantener una mejor organización, reutilización y type safety.

## 📁 **Archivo de Tipos**

**Ubicación:** `src/app/commons/components/button/button.types.ts`

## 🔧 **Tipos Disponibles**

### 1. **ButtonType**
Define todos los tipos de botón disponibles:

```typescript
export type ButtonType = 
  | 'primary'           // Botón principal (azul)
  | 'danger'            // Botón de peligro (rojo)
  | 'info'              // Botón de información (azul claro)
  | 'warning'           // Botón de advertencia (amarillo)
  | 'success'           // Botón de éxito (verde)
  | 'primary-ghost'     // Botón primario fantasma
  | 'danger-ghost'      // Botón de peligro fantasma
  | 'info-ghost'        // Botón de información fantasma
  | 'warning-ghost'     // Botón de advertencia fantasma
  | 'success-ghost'     // Botón de éxito fantasma
  | 'secondary'         // Botón secundario (gris)
  | 'accent'            // Botón de acento (turquesa)
  | 'brand-primary'     // Botón de marca primario
  | 'brand-secondary'   // Botón de marca secundario
  | 'brand-blue'        // Botón de marca azul
  | 'primary-outline'   // Botón primario con borde
  | 'danger-outline'    // Botón de peligro con borde
  | 'info-outline'      // Botón de información con borde
  | 'warning-outline'   // Botón de advertencia con borde
  | 'success-outline';  // Botón de éxito con borde
```

### 2. **ButtonRadius**
Define todos los tipos de radio disponibles:

```typescript
export type ButtonRadius = 
  | 'xs'    // Radio extra pequeño (8px)
  | 'sm'    // Radio pequeño (16px)
  | 'md'    // Radio mediano (24px) - por defecto
  | 'lg'    // Radio grande (32px)
  | 'xl'    // Radio extra grande (40px)
  | 'none'; // Sin radio (0px)
```

### 3. **ButtonShadow**
Define todos los tipos de sombra disponibles:

```typescript
export type ButtonShadow = 
  // Sombras normales
  | 'none'        // Sin sombra
  | 'sm'          // Sombra pequeña
  | 'base'        // Sombra base
  | 'md'          // Sombra mediana
  | 'lg'          // Sombra grande
  | 'xl'          // Sombra extra grande
  | '2xl'         // Sombra 2x extra grande
  | 'inner'       // Sombra interna
  // Sombras de hover
  | 'none-hover'  // Sin sombra en hover
  | 'sm-hover'    // Sombra pequeña en hover
  | 'base-hover'  // Sombra base en hover
  | 'md-hover'    // Sombra mediana en hover
  | 'lg-hover'    // Sombra grande en hover
  | 'xl-hover'    // Sombra extra grande en hover
  | '2xl-hover'   // Sombra 2x extra grande en hover
  | 'inner-hover'; // Sombra interna en hover
```

## ⚙️ **Configuración por Defecto**

```typescript
export const BUTTON_DEFAULTS = {
  type: 'primary' as ButtonType,
  radius: 'md' as ButtonRadius,
  shadow: 'sm' as ButtonShadow,
} as const;
```

## 🗺️ **Mapeos de Clases CSS**

### **BUTTON_TYPE_CLASSES**
Mapea cada tipo de botón a su clase CSS correspondiente:

```typescript
export const BUTTON_TYPE_CLASSES: Record<ButtonType, string> = {
  'primary': 'button-primary',
  'danger': 'button-danger',
  'warning': 'button-warning',
  // ... etc
} as const;
```

### **BUTTON_RADIUS_CLASSES**
Mapea cada tipo de radio a su clase CSS correspondiente:

```typescript
export const BUTTON_RADIUS_CLASSES: Record<ButtonRadius, string> = {
  'xs': 'radius-xs',
  'sm': 'radius-sm',
  'md': 'radius-md',
  // ... etc
} as const;
```

### **BUTTON_SHADOW_CLASSES**
Mapea cada tipo de sombra a su clase CSS correspondiente:

```typescript
export const BUTTON_SHADOW_CLASSES: Record<ButtonShadow, string> = {
  'none': 'shadow-none',
  'sm': 'shadow-sm',
  'base': 'shadow',
  'md-hover': 'shadow-hover-md',
  // ... etc
} as const;
```

## 🚀 **Uso en el Componente**

### **Importación:**
```typescript
import { ButtonType, ButtonRadius, ButtonShadow, BUTTON_DEFAULTS } from './button.types';
```

### **Definición de Inputs:**
```typescript
export class ButtonComponent {
  readonly type = input<ButtonType>(BUTTON_DEFAULTS.type);
  readonly radius = input<ButtonRadius>(BUTTON_DEFAULTS.radius);
  readonly shadow = input<ButtonShadow>(BUTTON_DEFAULTS.shadow);
}
```

## 💡 **Beneficios**

### 1. **Type Safety**
- ✅ Autocompletado en el IDE
- ✅ Detección de errores en tiempo de compilación
- ✅ Validación de valores válidos

### 2. **Mantenibilidad**
- ✅ Centralización de tipos
- ✅ Fácil actualización de valores
- ✅ Documentación integrada

### 3. **Reutilización**
- ✅ Tipos exportables para otros componentes
- ✅ Constantes reutilizables
- ✅ Mapeos consistentes

### 4. **Organización**
- ✅ Separación de responsabilidades
- ✅ Código más limpio
- ✅ Mejor legibilidad

## 📝 **Ejemplos de Uso**

### **En Templates:**
```html
<!-- Type safety garantizado -->
<app-button [type]="'primary'" [radius]="'md'" [shadow]="'sm-hover'">
  Botón
</app-button>
```

### **En Componentes:**
```typescript
// Importar tipos
import { ButtonType, ButtonRadius, ButtonShadow } from './button.types';

// Usar en propiedades
@Input() buttonType: ButtonType = 'primary';
@Input() buttonRadius: ButtonRadius = 'md';
@Input() buttonShadow: ButtonShadow = 'sm';
```

### **En Servicios:**
```typescript
// Crear botones dinámicamente
createButton(type: ButtonType, radius: ButtonRadius, shadow: ButtonShadow) {
  return {
    type,
    radius,
    shadow,
    classes: this.getButtonClasses(type, radius, shadow)
  };
}
```

## 🔄 **Actualización de Tipos**

Para agregar nuevos tipos:

1. **Actualizar el tipo union:**
```typescript
export type ButtonType = 
  | 'primary'
  | 'new-type'; // ← Agregar aquí
```

2. **Actualizar el mapeo:**
```typescript
export const BUTTON_TYPE_CLASSES: Record<ButtonType, string> = {
  'primary': 'button-primary',
  'new-type': 'button-new-type', // ← Agregar aquí
} as const;
```

3. **Actualizar la documentación:**
```typescript
/**
 * - new-type: Descripción del nuevo tipo
 */
```

## 🎯 **Mejores Prácticas**

1. **Siempre usar los tipos importados** en lugar de strings literales
2. **Mantener la documentación actualizada** cuando se agreguen nuevos tipos
3. **Usar las constantes de mapeo** para consistencia
4. **Validar tipos en tiempo de compilación** antes de runtime
5. **Exportar tipos que puedan ser reutilizados** por otros componentes

## 📊 **Estadísticas**

- **Total de tipos de botón:** 20
- **Total de tipos de radio:** 6
- **Total de tipos de sombra:** 16
- **Total de mapeos CSS:** 42
- **Configuraciones por defecto:** 3

---

**✅ Resultado:** Sistema de tipos robusto, type-safe y mantenible para el componente Button.
