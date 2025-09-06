import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-button',
    imports: [
        CommonModule
    ],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
   type = input<'primary' | 'danger' | 'info' | 'warning' | 'success' >('primary');
  
}
