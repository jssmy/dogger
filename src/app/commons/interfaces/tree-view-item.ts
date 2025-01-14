import { Item } from "./item";

export interface TreeViewItemBase extends Item {
    isChecked: boolean; isVisibleChildren: boolean; parentId: string;
    countChecked: number;
};

export interface TreeViewItem extends TreeViewItemBase {
    children: TreeViewItemBase[];
}

