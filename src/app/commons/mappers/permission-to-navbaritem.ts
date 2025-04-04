import { PermissionType } from "../enum/permission-type";
import { NavbarItem } from "../interfaces/navbar-items"
import { Permission } from "../interfaces/permission"

export const permissionToNavbarMenuItem = (permissions: Permission[]) => {
    return permissions
        ?.filter(permission => permission.type === PermissionType.MENU)
        ?.sort((a, b) => a.order - b.order)
        ?.map(permission => {
            return {
                label: permission.name,
                route: permission.route,
                items: permission?.children?.filter(per => per.type === PermissionType.MENU)?.map(per => ({ label: per.name, route: per.route }))
            } as NavbarItem
        });
}
