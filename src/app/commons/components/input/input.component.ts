import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements  OnInit{

  @Input() type: 'text' | 'password' = 'text';
  @Input() placeHolder: string = '';

  protected showPassword = false;
  protected isPasswordInput = false;

  ngOnInit(): void {
    this.isPasswordInput = this.type === 'password';
  }

  onShowPassword() {
    this.showPassword = !this.showPassword;
    if(this.showPassword) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
}
