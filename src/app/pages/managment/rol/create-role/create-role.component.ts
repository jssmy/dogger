import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../../commons/components/input/input.component';
import { ButtonComponent } from '../../../../commons/components/button/button.component';
import { TreeViewComponent } from "../../../../commons/components/tree-view/tree-view.component";
import { PermissionService } from '../../../../commons/services/permission.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { permissionToItem } from '../../../../commons/components/mappers/permission-to-item';
import { TreeViewItem } from '../../../../commons/interfaces/tree-view-item';

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [FormsModule, InputComponent, ButtonComponent, TreeViewComponent],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.scss',
})
export default class CreateRoleComponent {
  permissionService = inject(PermissionService);
  items = toSignal<TreeViewItem[]>(this.permissionService.all().pipe(map(permissions => permissionToItem(permissions))));
}
