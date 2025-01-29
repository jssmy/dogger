import { Pipe, PipeTransform } from '@angular/core';
import { TreeViewItem } from '../interfaces/tree-view-item';
import { Permission } from '../interfaces/permission';
import { permissionToItem } from '../mappers/permission-to-item';

@Pipe({
  name: 'permissionToItem',
  standalone: true
})
export class PermissionToItem implements PipeTransform {

  transform(value: Permission[]): TreeViewItem[] {
    return permissionToItem(value);
  }

}
