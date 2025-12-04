import { SideMenuComponent } from '../../components/side-menu.component.ts';

export interface MenuItemOption {
    itemName: string;
    isExpanded: boolean;
    isExpandable: boolean;
    nestedSubmenu?: SideMenuComponent[];
}
