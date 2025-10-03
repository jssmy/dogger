# ESLint Configuration Guide

## 📋 Overview

Este proyecto está configurado con ESLint para mantener la calidad del código y evitar code smells. La configuración incluye reglas estrictas para TypeScript, Angular y mejores prácticas generales.

## 🚀 Scripts Disponibles

```bash
# Verificar problemas de linting
npm run lint:check

# Corregir automáticamente problemas que se pueden arreglar
npm run lint:fix-all

# Generar reporte HTML de problemas
npm run lint:report

# Usar el linter de Angular (recomendado para desarrollo)
npm run lint
npm run lint:fix
```

## 🔧 Configuración

### Archivos de Configuración

- **`eslint.config.js`** - Configuración principal de ESLint
- **`.vscode/settings.json`** - Configuración de VS Code para integración
- **`.vscode/extensions.json`** - Extensiones recomendadas

### Reglas Principales

#### Angular Rules
- ✅ Selectores de componentes con prefijo `app-`
- ✅ Selectores de directivas con prefijo `app`
- ✅ Uso de interfaces de lifecycle
- ✅ Preferencia por OnPush change detection
- ✅ Accesibilidad en templates

#### TypeScript Rules
- ✅ Variables no utilizadas (con patrón `^_` para ignorar)
- ✅ Uso de `any` como warning
- ✅ Preferencia por `const` sobre `let`
- ✅ Inferencia de tipos automática

#### Code Quality Rules
- ✅ Console statements como warnings
- ✅ No debugger statements
- ✅ Preferencia por arrow functions
- ✅ No nested ternaries
- ✅ Preferencia por template literals

#### Stylistic Rules
- ✅ Comillas simples
- ✅ Semicolons obligatorios
- ✅ Indentación de 2 espacios
- ✅ Línea máxima de 120 caracteres
- ✅ Trailing commas en multiline
- ✅ Espaciado consistente

## 🎯 Problemas Comunes y Soluciones

### 1. Variables No Utilizadas
```typescript
// ❌ Error
import { Component, OnInit } from '@angular/core';

// ✅ Solución
import { Component } from '@angular/core';
// O si necesitas OnInit pero no lo usas:
import { Component, OnInit as _OnInit } from '@angular/core';
```

### 2. Console Statements
```typescript
// ❌ Warning
console.log('Debug info');

// ✅ Solución - Usar un logger service o remover en producción
// Para desarrollo temporal, puedes usar:
// eslint-disable-next-line no-console
console.log('Debug info');
```

### 3. Change Detection Strategy
```typescript
// ❌ Warning
@Component({
  selector: 'app-example',
  template: '...'
})

// ✅ Solución
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-example',
  template: '...',
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 4. Template Accessibility
```html
<!-- ❌ Error -->
<img src="image.jpg">

<!-- ✅ Solución -->
<img src="image.jpg" alt="Descripción de la imagen">
```

### 5. Output Naming
```typescript
// ❌ Error
@Output() onSave = new EventEmitter();

// ✅ Solución
@Output() save = new EventEmitter();
```

## 🔍 Integración con VS Code

### Extensiones Recomendadas
- ESLint
- Prettier
- Angular Language Service
- TypeScript Importer

### Configuración Automática
- Auto-fix al guardar archivos
- Organización automática de imports
- Formateo automático

## 📊 Reportes

### Generar Reporte HTML
```bash
npm run lint:report
```
Esto genera un archivo `eslint-report.html` con todos los problemas encontrados.

### Integración con CI/CD
```yaml
# Ejemplo para GitHub Actions
- name: Run ESLint
  run: npm run lint:check
```

## 🛠️ Personalización

### Deshabilitar Reglas Específicas

#### Para un archivo completo:
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
```

#### Para una línea específica:
```typescript
// eslint-disable-next-line no-console
console.log('Debug info');
```

#### Para múltiples líneas:
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
const data: any = getData();
const result: any = processData(data);
/* eslint-enable @typescript-eslint/no-explicit-any */
```

### Agregar Reglas Personalizadas

Edita `eslint.config.js` para agregar o modificar reglas:

```javascript
rules: {
  // Tu regla personalizada
  'custom-rule': 'error',
  // Modificar regla existente
  'max-len': ['warn', { 'code': 150 }], // Cambiar de 120 a 150
}
```

## 📈 Métricas de Calidad

### Antes de ESLint
- **1807 problemas** detectados
- Múltiples code smells
- Inconsistencias de estilo

### Después de ESLint
- **188 problemas** restantes (94 errores, 94 warnings)
- **1600+ problemas** corregidos automáticamente
- Código más limpio y consistente

## 🎯 Próximos Pasos

1. **Revisar warnings restantes** - Muchos son sobre OnPush change detection
2. **Corregir errores de accesibilidad** - Agregar alt text a imágenes
3. **Implementar OnPush** - Para mejor performance
4. **Configurar pre-commit hooks** - Para evitar commits con errores

## 📚 Recursos Adicionales

- [ESLint Rules](https://eslint.org/docs/rules/)
- [Angular ESLint](https://github.com/angular-eslint/angular-eslint)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Angular Style Guide](https://angular.dev/style-guide)

## 🤝 Contribución

Al contribuir al proyecto:

1. Ejecuta `npm run lint:check` antes de hacer commit
2. Corrige todos los errores (no warnings)
3. Considera corregir warnings importantes
4. Usa `npm run lint:fix-all` para correcciones automáticas

---

**Nota**: Esta configuración está diseñada para mantener alta calidad de código. Si encuentras reglas muy restrictivas, discute con el equipo antes de deshabilitarlas.
