interface Item {
    label: string;
    route: string;
}

export type NavbarItem = Item & { items?: Item[]};
