import { Component, effect, input, model } from '@angular/core';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { TreeViewItem, TreeViewItemBase } from '../../interfaces/tree-view-item';
import { ToTreeViewPipe } from '../../pipes/to-tree-view.pipe';
import { toTreeViewItem } from '../mappers/to-tree-view-item';

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [CheckBoxComponent],
  providers: [],
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.scss'
})
export class TreeViewComponent {
  items = input.required<TreeViewItem[]>();
  toTreeViewItem = toTreeViewItem;
  

  onVisibleChild(item: TreeViewItem) {
    item.isVisibleChildren = !item.isVisibleChildren;
  }

  onChecked(item: TreeViewItem) {
    item.isChecked = !item.isChecked;
    item.children?.forEach(child => child.isChecked = item.isChecked);
    item.countChecked = item.children.filter(child => child.isChecked).length;
    item.isChecked = item.children.length === item.countChecked;
  }

  onCheckedChild(parent: TreeViewItem, child: TreeViewItemBase) {
    child.isChecked = !child.isChecked;
    parent.countChecked = parent.children.filter(c => c.isChecked).length;    
    parent.isChecked = parent.children.length === parent.countChecked;
  }



  


}
