import { NavbarItem } from "../../interfaces/navbar-items"
import { Permission } from "../../interfaces/permission"

export const permissionToNavbarMenuItem = (permissions: Permission[]) => {
    return permissions
        ?.filter(permission => permission.type === 'menu')
        ?.sort((a, b) => a.order - b.order)
        ?.map(permission => {
            return {
                label: permission.name,
                route: permission.route,
                items: permission?.children?.map(per => ({ label: per.name, route: per.route }))
            } as NavbarItem
        });
}

