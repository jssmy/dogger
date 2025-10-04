import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { BUTTON_DEFAULTS, ButtonRadius, ButtonShadow, ButtonType } from './button.types';

@Component({
  selector: 'app-button',
  imports: [
    CommonModule,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  readonly type = input<ButtonType>(BUTTON_DEFAULTS.type);

  readonly radius = input<ButtonRadius>(BUTTON_DEFAULTS.radius);

  readonly shadow = input<ButtonShadow>(BUTTON_DEFAULTS.shadow);

  readonly allClasses = computed(() => {
    const type = this.type();
    const radius = this.radius();
    const shadowValue = this.shadow();

    // Parse shadow value to determine normal and hover shadows
    const isHoverShadow = shadowValue.includes('-hover');
    const shadowSize = shadowValue.replace('-hover', '');

    // Map shadow sizes to their corresponding classes
    const getShadowClass = (size: string, isHover: boolean = false) => {
      const prefix = isHover ? 'shadow-hover' : 'shadow';
      switch (size) {
        case 'none': return `${prefix}-none`;
        case 'sm': return isHover ? `${prefix}-sm` : `${prefix}-sm`;
        case 'base': return isHover ? `${prefix}` : 'shadow';
        case 'md': return `${prefix}-md`;
        case 'lg': return `${prefix}-lg`;
        case 'xl': return `${prefix}-xl`;
        case '2xl': return `${prefix}-2xl`;
        case 'inner': return `${prefix}-inner`;
        default: return null;
      }
    };

    // Only apply the appropriate class based on whether it's a hover shadow or not
    const shadowClass = isHoverShadow ? null : getShadowClass(shadowSize, false);
    const shadowHoverClass = isHoverShadow ? getShadowClass(shadowSize, true) : null;

    return {
      // Button type classes
      'button-primary': type === 'primary',
      'button-danger': type === 'danger',
      'button-warning': type === 'warning',
      'button-info': type === 'info',
      'button-success': type === 'success',
      'button-secondary': type === 'secondary',
      'button-accent': type === 'accent',
      'button-brand-primary': type === 'brand-primary',
      'button-brand-secondary': type === 'brand-secondary',
      'button-brand-blue': type === 'brand-blue',
      'button-primary-ghost': type === 'primary-ghost',
      'button-danger-ghost': type === 'danger-ghost',
      'button-info-ghost': type === 'info-ghost',
      'button-warning-ghost': type === 'warning-ghost',
      'button-success-ghost': type === 'success-ghost',
      'button-primary-outline': type === 'primary-outline',
      'button-danger-outline': type === 'danger-outline',
      'button-info-outline': type === 'info-outline',
      'button-warning-outline': type === 'warning-outline',
      'button-success-outline': type === 'success-outline',

      // Radius classes
      'radius-xs': radius === 'xs',
      'radius-sm': radius === 'sm',
      'radius-md': radius === 'md',
      'radius-lg': radius === 'lg',
      'radius-xl': radius === 'xl',
      'radius-none': radius === 'none',

      // Shadow classes - normal
      'shadow-none': shadowClass === 'shadow-none',
      'shadow-sm': shadowClass === 'shadow-sm',
      'shadow': shadowClass === 'shadow',
      'shadow-md': shadowClass === 'shadow-md',
      'shadow-lg': shadowClass === 'shadow-lg',
      'shadow-xl': shadowClass === 'shadow-xl',
      'shadow-2xl': shadowClass === 'shadow-2xl',
      'shadow-inner': shadowClass === 'shadow-inner',

      // Shadow classes - hover
      'shadow-hover-none': shadowHoverClass === 'shadow-hover-none',
      'shadow-hover-sm': shadowHoverClass === 'shadow-hover-sm',
      'shadow-hover': shadowHoverClass === 'shadow-hover',
      'shadow-hover-md': shadowHoverClass === 'shadow-hover-md',
      'shadow-hover-lg': shadowHoverClass === 'shadow-hover-lg',
      'shadow-hover-xl': shadowHoverClass === 'shadow-hover-xl',
      'shadow-hover-2xl': shadowHoverClass === 'shadow-hover-2xl',
      'shadow-hover-inner': shadowHoverClass === 'shadow-hover-inner',
    };
  });



}
