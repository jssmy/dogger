import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, model, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input',
    imports: [
        CommonModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputComponent)
        }
    ],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit, ControlValueAccessor {

  value = model<string>();
  isTouched = false;
  disabled = model<boolean>();
  onTouched = () => true;
  onChange = (__value: string) => __value;

  type = model<'text' | 'password' | 'email'>('text');
  styled = model<'outlined' | 'none'>('none');

  placeHolder = input<string>();
  size = input<'input--sm' | 'input--lg'>('input--lg');

  protected showPassword = false;
  protected isPasswordInput = false;

  ngOnInit(): void {
    this.isPasswordInput = this.type() === 'password';
  }

  onShowPassword() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.type.set('text');
    } else {
      this.type.set('password');
    }
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

  writeValue(obj: string): void {
    this.value.update(()=> obj);
  }

}


