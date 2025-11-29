import { SideMenuComponent } from '../../commponents/side-menu.component';

export interface MenuItemOption {
    itemName: string;
    isExpanded: boolean;
    isExpandable: boolean;
    nestedSubmenu?: SideMenuComponent[];
}
