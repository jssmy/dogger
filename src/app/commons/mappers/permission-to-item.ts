import { Item } from "../interfaces/item";
import { Permission } from "../interfaces/permission";
import { TreeViewItem } from "../interfaces/tree-view-item";

export const permissionToItem = (permissions: Permission[]): TreeViewItem[] => {

    const parents = permissions.filter(permission => !permission.parentId);
    const children = permissions.filter(permission => permission.parentId);

    return parents.map(parent => (
        {
            id: parent.id,
            value: parent.name,
            isVisibleChildren: false,
            countChecked: 0,
            isChecked: false,
            isDisabled: Boolean(parent.protected),
            children: children?.
                filter(child => child.parentId === parent.id)?.
                map(child => ({ id: child.id, value: child.name, isChecked: false, isVisibleChildren: false, parentId: parent.id, isDisabled: Boolean(child.protected) })) || []
        }
    ) as TreeViewItem);
}

