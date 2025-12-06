import { NgClass, NgStyle } from "@angular/common";
import { Component, input } from "@angular/core";

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
  imports: [NgStyle, NgClass]
})
export class SkeletonComponent {

  readonly width = input<string>('100%');
  readonly height = input<string>('100%');
  readonly borderRadius = input<'radius-xs' | 'radius-sm' | 'radius-md' | 'radius-lg' | 'radius-xl' | 'none'>('none');
  

}