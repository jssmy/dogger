import { Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'bgz-check-box',
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
  onChange = (value: boolean) => value;
  onTouched = () => true;



  // Cambio manual del estado
  toggleChecked(): void {
    this.checked.set(!this.checked());
    this.onChange(this.checked());
    this.onTouched();
  }

  
  writeValue(value: boolean): void {
    this.checked.set(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
