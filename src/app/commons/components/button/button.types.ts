/**
 * Button Component Types
 * 
 * Este archivo contiene todos los tipos utilizados por el componente Button
 * para mantener una mejor organización y reutilización de tipos.
 */

/**
 * Tipos de botón disponibles
 * 
 * - primary: Botón principal (azul)
 * - danger: Botón de peligro (rojo)
 * - info: Botón de información (azul claro)
 * - warning: Botón de advertencia (amarillo)
 * - success: Botón de éxito (verde)
 * - secondary: Botón secundario (gris)
 * - accent: Botón de acento (turquesa)
 * - brand-primary: Botón de marca primario
 * - brand-secondary: Botón de marca secundario
 * - brand-blue: Botón de marca azul
 * - primary-ghost: Botón primario fantasma
 * - danger-ghost: Botón de peligro fantasma
 * - info-ghost: Botón de información fantasma
 * - warning-ghost: Botón de advertencia fantasma
 * - success-ghost: Botón de éxito fantasma
 * - primary-outline: Botón primario con borde
 * - danger-outline: Botón de peligro con borde
 * - info-outline: Botón de información con borde
 * - warning-outline: Botón de advertencia con borde
 * - success-outline: Botón de éxito con borde
 */
export type ButtonType =
    | 'primary'
    | 'danger'
    | 'info'
    | 'warning'
    | 'success'
    | 'primary-ghost'
    | 'danger-ghost'
    | 'info-ghost'
    | 'warning-ghost'
    | 'success-ghost'
    | 'secondary'
    | 'accent'
    | 'brand-primary'
    | 'brand-secondary'
    | 'brand-blue'
    | 'primary-outline'
    | 'danger-outline'
    | 'info-outline'
    | 'warning-outline'
    | 'success-outline';

/**
 * Tipos de radio disponibles
 * 
 * - xs: Radio extra pequeño (8px)
 * - sm: Radio pequeño (16px)
 * - md: Radio mediano (24px) - por defecto
 * - lg: Radio grande (32px)
 * - xl: Radio extra grande (40px)
 * - none: Sin radio (0px)
 */
export type ButtonRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';

/**
 * Tipos de sombra disponibles
 * 
 * Sombras normales:
 * - none: Sin sombra
 * - sm: Sombra pequeña
 * - base: Sombra base
 * - md: Sombra mediana
 * - lg: Sombra grande
 * - xl: Sombra extra grande
 * - 2xl: Sombra 2x extra grande
 * - inner: Sombra interna
 * 
 * Sombras de hover:
 * - none-hover: Sin sombra en hover
 * - sm-hover: Sombra pequeña en hover
 * - base-hover: Sombra base en hover
 * - md-hover: Sombra mediana en hover
 * - lg-hover: Sombra grande en hover
 * - xl-hover: Sombra extra grande en hover
 * - 2xl-hover: Sombra 2x extra grande en hover
 * - inner-hover: Sombra interna en hover
 */
export type ButtonShadow =
    | 'none'
    | 'sm'
    | 'base'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | 'inner'
    | 'none-hover'
    | 'sm-hover'
    | 'base-hover'
    | 'md-hover'
    | 'lg-hover'
    | 'xl-hover'
    | '2xl-hover'
    | 'inner-hover';

/**
 * Configuración por defecto del componente Button
 */
export const BUTTON_DEFAULTS = {
    type: 'primary' as ButtonType,
    radius: 'md' as ButtonRadius,
    shadow: 'sm' as ButtonShadow,
} as const;

/**
 * Mapeo de tipos de botón a sus clases CSS correspondientes
 */
export const BUTTON_TYPE_CLASSES: Record<ButtonType, string> = {
    'primary': 'button-primary',
    'danger': 'button-danger',
    'warning': 'button-warning',
    'info': 'button-info',
    'success': 'button-success',
    'secondary': 'button-secondary',
    'accent': 'button-accent',
    'brand-primary': 'button-brand-primary',
    'brand-secondary': 'button-brand-secondary',
    'brand-blue': 'button-brand-blue',
    'primary-ghost': 'button-primary-ghost',
    'danger-ghost': 'button-danger-ghost',
    'info-ghost': 'button-info-ghost',
    'warning-ghost': 'button-warning-ghost',
    'success-ghost': 'button-success-ghost',
    'primary-outline': 'button-primary-outline',
    'danger-outline': 'button-danger-outline',
    'info-outline': 'button-info-outline',
    'warning-outline': 'button-warning-outline',
    'success-outline': 'button-success-outline',
} as const;

/**
 * Mapeo de tipos de radio a sus clases CSS correspondientes
 */
export const BUTTON_RADIUS_CLASSES: Record<ButtonRadius, string> = {
    'xs': 'radius-xs',
    'sm': 'radius-sm',
    'md': 'radius-md',
    'lg': 'radius-lg',
    'xl': 'radius-xl',
    'none': 'radius-none',
} as const;

/**
 * Mapeo de tipos de sombra a sus clases CSS correspondientes
 */
export const BUTTON_SHADOW_CLASSES: Record<ButtonShadow, string> = {
    'none': 'shadow-none',
    'sm': 'shadow-sm',
    'base': 'shadow',
    'md': 'shadow-md',
    'lg': 'shadow-lg',
    'xl': 'shadow-xl',
    '2xl': 'shadow-2xl',
    'inner': 'shadow-inner',
    'none-hover': 'shadow-hover-none',
    'sm-hover': 'shadow-hover-sm',
    'base-hover': 'shadow-hover',
    'md-hover': 'shadow-hover-md',
    'lg-hover': 'shadow-hover-lg',
    'xl-hover': 'shadow-hover-xl',
    '2xl-hover': 'shadow-hover-2xl',
    'inner-hover': 'shadow-hover-inner',
} as const;
