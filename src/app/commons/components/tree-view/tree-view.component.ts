import { Component, computed, forwardRef, input, model } from '@angular/core';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { TreeViewItem, TreeViewItemBase } from '../../interfaces/tree-view-item';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { toFlatten } from '../../utils/array.util';
import { markTreeViewItem } from '../../mappers/mark-tree-view-item';

@Component({
    selector: 'app-tree-view',
    imports: [CheckBoxComponent],
    templateUrl: './tree-view.component.html',
    styleUrl: './tree-view.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TreeViewComponent),
            multi: true
        }
    ]
})
export class TreeViewComponent implements ControlValueAccessor { 

  items = input.required<TreeViewItem[]>();
  value = model<TreeViewItem[] | null>();
  
  listItem = computed(() => {
    const ids = toFlatten('id', this.value() || [])
    return markTreeViewItem(this.items(), ids);
  });

  onChange = (__value: TreeViewItem[] | null) => this.value;
  // @ts-ignore
  onTouched = () => {};

  onVisibleChild(item: TreeViewItem) {
    item.isVisibleChildren = !item.isVisibleChildren;
  }

  onChecked(item: TreeViewItem) {
    item.isChecked = !item.isChecked;
    item.children = item.children?.map(child => ({
      ...child,
      isChecked: child.isDisabled || item.isChecked
    } as TreeViewItem));
    item.countChecked = item.children.filter(child => child.isChecked).length;
    // item.isChecked = item.children.length === item.countChecked;
    this.onTouched();
    this.onChange(this.selectedItems());
  }

  onCheckedChild(parent: TreeViewItem, child: TreeViewItemBase) {
    child.isChecked = !child.isChecked;
    parent.countChecked = parent.children.filter(c => c.isChecked).length;    
    parent.isChecked = parent.children.length === parent.countChecked;
    this.onChange(this.selectedItems());
    this.onTouched();
  }

  // @ts-ignore: any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // @ts-ignore: any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    
  }

  writeValue(obj: TreeViewItem[]): void {
    this.value.set( obj || []);
  }

  private selectedItems() {
    return [
      ///  has children
      ... this.items().filter(item => item.children.length > 0)
      .map( item => ({ ...item, children: item.children.filter(child => child.isChecked)}))
      .filter(item => item.children.length > 0),
      /// not has children
      ... this.items().filter(item => item.children.length <= 0 && item.isChecked)
    ];
  }


}
