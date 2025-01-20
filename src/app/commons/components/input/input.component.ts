import { CommonModule } from '@angular/common';
import { Component, computed, forwardRef, input, Input, model, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
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
  onTouched = () => { };
  onChange = (__value: string) => { };

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

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  writeValue(obj: any): void {
    this.value.update(()=> obj);
  }

}


