import { NgClass, NgStyle } from "@angular/common";
import { Component, computed, input } from "@angular/core";

@Component({
  selector: 'app-shimmer',
  templateUrl: './shimmer.component.html',
  styleUrl: './shimmer.component.scss',
  imports: [NgStyle, NgClass]
})
export class ShimmerComponent {

  readonly theme = input<'light' | 'dark'>('light');
  readonly shimmerWidth = input<string>('100%');
  readonly shimmerHeight = input<string>('100%');
  readonly borderRadius = input<'radius-xs' | 'radius-sm' | 'radius-md' | 'radius-lg' | 'radius-xl' | 'none'>('none');
  
  readonly containerStyles = computed(() => ({
    width: this.shimmerWidth(),
    height: this.shimmerHeight(),
  }));

  readonly containerClass = computed(() => ({
    'shimmer--light': this.theme() === 'light',
    'shimmer--dark': this.theme() === 'dark',
    'shimmer--xs': this.borderRadius() === 'radius-xs',
    'shimmer--sm': this.borderRadius() === 'radius-sm',
    'shimmer--md': this.borderRadius() === 'radius-md',
    'shimmer--lg': this.borderRadius() === 'radius-lg',
    'shimmer--xl': this.borderRadius() === 'radius-xl',
    'shimmer--none': this.borderRadius() === 'none',
  }));

}