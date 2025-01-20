import { Component, computed, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-check-box',
  standalone: true,
  imports: [],
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckBoxComponent),
      multi: true
    }
  ]
})
export class CheckBoxComponent implements ControlValueAccessor{


  checked = model<boolean>(false);
  disabled = model<boolean>(false);
  styled = input<'outline' | 'default'>('default');

  // Métodos requeridos por ControlValueAccessor
  onChange = (value: boolean) => {};
  onTouched = () => {};



  // Cambio manual del estado
  toggleChecked(): void {
    this.checked.set(!this.checked());
    this.onChange(this.checked());
    this.onTouched();
  }

  // Métodos del ControlValueAccessor
  writeValue(value: boolean): void {
    this.checked.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
