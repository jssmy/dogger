import { Directive, ElementRef, input, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[bgzErrorControl]',
  standalone: true
})
export class ErrorControlDirective implements OnInit {


  readonly errorControl = input.required<Record<string, string>>({ alias: 'bgzErrorControl' }); // Objeto de mensajes de error
  private errorSpan!: HTMLSpanElement;


  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private control: NgControl
  ) { }


  ngOnInit(): void {

    this.errorSpan = this.renderer.createElement('span');
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.errorSpan);

    // Escuchar cambios en el estado del control
    this.control.statusChanges?.subscribe(() => {
      this.updateErrorMessage();
    });
  }

  private updateErrorMessage(): void {
    if (this.control.invalid && (this.control.dirty || this.control.touched)) {
      const errors = this.control.errors;

      if (errors) {
        this.renderer.addClass(this.errorSpan, 'error');
        this.renderer.addClass(this.errorSpan, 'ms-4');
        this.renderer.addClass(this.errorSpan, 'content-low');
        this.renderer.addClass(this.errorSpan, 'size-md');
        this.renderer.addClass(this.errorSpan, 'pt-1');
        const firstErrorKey = Object.keys(errors)[0];
        const errorMessage = this.errorControl()?.[firstErrorKey];
        this.renderer.setProperty(this.errorSpan, 'textContent', errorMessage || '');
      }
    } else {
      this.renderer.setProperty(this.errorSpan, 'textContent', '');
    }
  }

}
