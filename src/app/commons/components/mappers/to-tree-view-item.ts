import { TreeViewItem, TreeViewItemBase } from "../../interfaces/tree-view-item";

export const toTreeViewItem = (item: TreeViewItemBase) => {
    return {
        ...item
    } as TreeViewItem;
}