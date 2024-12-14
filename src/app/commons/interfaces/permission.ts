export interface Permission {
    id: string;
    name: string;
    route: string;
    type: 'api' | 'option' | 'menu';
    order: number;
    children: Permission[];
}
