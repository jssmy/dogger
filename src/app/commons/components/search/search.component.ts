import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from '../../interfaces/item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SearchComponent),
    },
  ],
  imports: [
    CommonModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements ControlValueAccessor {

  @ViewChild('inputSearch') searchInput!: ElementRef;

  @Input() placeHolder = 'Typing...';
  @Input() styled: 'ligth' | 'normal' = 'normal';
  @Input() value = '';

  @Input() items: Item[] = [];

  @Output() onSearch = new EventEmitter<string>();
  @Output() onFocus = new EventEmitter();
  @Output() onSelected = new EventEmitter<Item>;

  onChange = (value: string) => this.value = value;

  onTouched = () => {};
  touched = false;
  disabled = false;


  // @ts-ignore: any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // @ts-ignore: any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.onChangedValue(obj);
  }

  protected onSearchEvent() {
    this.onSearch.emit(this.value);
  }

  protected onChangedValue(value: string) {
    this.onChange(value);
    this.touched = true;
    this.onTouched();
    this.onSearchEvent();
  }

  protected onFocusEvent() {
    this.touched = true;
    this.onTouched();
    this.onFocus.emit();
  }

  setFocus() {
    this.searchInput.nativeElement.focus();
    this.onFocusEvent();
  }

  removeFocus() {
    this.items = [];
    this.value = '';
    this.touched = false;
    this.searchInput.nativeElement.blur();
  }
}
