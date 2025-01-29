import { Pipe, PipeTransform } from '@angular/core';
import { TreeViewItem } from '../interfaces/tree-view-item';

@Pipe({
  name: 'toTreeView',
  standalone: true
})
export class ToTreeViewPipe implements PipeTransform {

  transform(value: unknown ): TreeViewItem {
    return value as TreeViewItem;
  }

}
