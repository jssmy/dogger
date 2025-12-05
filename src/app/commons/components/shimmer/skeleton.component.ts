import { NgClass, NgStyle } from "@angular/common";
import { Component, input } from "@angular/core";

@Component({
  selector: 'skeleton',
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
  imports: [NgStyle, NgClass]
})
export class SkeletonComponents {

  readonly width = input<string>('100%');
  readonly height = input<string>('100%');
  readonly borderRadius = input<'radius-xs' | 'radius-sm' | 'radius-md' | 'radius-lg' | 'radius-xl' | 'none'>('none');
  

}