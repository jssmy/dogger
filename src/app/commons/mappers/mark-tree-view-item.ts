import { TreeViewItem } from '../interfaces/tree-view-item';

export const markTreeViewItem = (items: TreeViewItem[], selectedId: string[]): TreeViewItem[] => {

  return items.map(item => {
    item.children = item.children.map(child => ({
      ...child,
      isChecked: selectedId.includes(child.id),
    } as TreeViewItem));

    item.isChecked = selectedId.includes(item.id);
    item.countChecked = item.children.filter(child => child.isChecked).length;

    item.isChecked = item.isChecked && item.countChecked === item.children.length;

    return item;
  });
};
