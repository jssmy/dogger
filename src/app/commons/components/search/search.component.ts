import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'bgz-search',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SearchComponent)
    }
  ],
  imports: [
    CommonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements ControlValueAccessor {

  @ViewChild('inputSearch') searchInput!: ElementRef;

  @Input() placeHolder = 'Typing...';
  @Input() styled: 'ligth' | 'normal' = 'normal';
  @Input() value = '';

  @Input() items: Item[] = [];

  @Output() searchEvent = new EventEmitter<string>();
  @Output() focusEvent = new EventEmitter();
  @Output() selectedEvent = new EventEmitter<Item>;

  onChange = (value: string) => this.value = value;

  onTouched = () => { /* Required by ControlValueAccessor */ };
  touched = false;
  disabled = false;


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: string): void {
    this.onChangedValue(obj);
  }

  protected onSearchEvent() {
    this.searchEvent.emit(this.value);
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
    this.focusEvent.emit();
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
