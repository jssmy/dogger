import { HttpMethods } from "../enum/http-methods";
import { PermissionType } from "../enum/permission-type";

export interface Permission {
    id?: string;
    name: string;
    route: string;
    type: PermissionType;
    method: HttpMethods;
    order: number;
    children?: Permission[];
    parentId?: string;
}
