import { NgClass, NgStyle } from "@angular/common";
import { Component, computed, input } from "@angular/core";

@Component({
  selector: 'skeleton',
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
  imports: [NgStyle, NgClass]
})
export class SkeletonComponents {

  readonly theme = input<'light' | 'dark'>('light');
  readonly width = input<string>('100%');
  readonly height = input<string>('100%');
  readonly borderRadius = input<'radius-xs' | 'radius-sm' | 'radius-md' | 'radius-lg' | 'radius-xl' | 'none'>('none');
  
  readonly containerStyles = computed(() => ({
    width: this.width(),
    height: this.height(),
    '--skeleton-width': this.width(),
    '--skeleton-height': this.height()
  }));

  readonly contaiterClass = computed(() => ({
    'skeleton--light': this.theme() === 'light',
    'skeleton--dark': this.theme() === 'dark'
  }));

}