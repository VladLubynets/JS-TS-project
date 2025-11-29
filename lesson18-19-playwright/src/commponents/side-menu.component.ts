import { Locator } from '@playwright/test';
import { MenuItemOption } from '../models/ui/side-menu-item.dto';

export class SideMenuComponent {
    private get singleMenuElement(): Locator {
        return this.baseLocator.locator('div[role="listitem"] a span');
    }

    private get expandableMenuElement(): Locator {
        return this.baseLocator.locator('//div[@role="listitem"]//button[./div[not(@aria-hidden="true")]]');
    }

    private getSingleMenuItem(menuItem: string): Locator {
        return this.baseLocator.locator(`//div[@role="listitem"]//a[.//span[normalize-space()="${menuItem}"]]`);
    }

    private getExpandableMenuItem(menuItem: string): Locator {
        return this.baseLocator.locator(`//div[@role="listitem"]//button[.//span[normalize-space()="${menuItem}"]]`);
    }

    public constructor(private readonly baseLocator: Locator) {}

    public async getMenuItems(): Promise<MenuItemOption[]> {
        const menuItems: MenuItemOption[] = [];
        const singleMenuItems = await this.singleMenuElement.all();
        for (const item of singleMenuItems) {
            const menuItemOption: MenuItemOption = {
                itemName: (await item.textContent()) as string,
                isExpanded: false,
                isExpandable: false,
                nestedSubmenu: []
            };
            menuItems.push(menuItemOption);
        }
        const expandableMenuItems = await this.expandableMenuElement.all();
        for (const item of expandableMenuItems) {
            if (!(await item.isVisible())) {
                continue;
            }
            const menuItemOption: MenuItemOption = {
                itemName: (await item.textContent()) as string,
                isExpanded: (await item.getAttribute('aria-expanded')) === 'true',
                isExpandable: true,
                nestedSubmenu: []
            };
            menuItems.push(menuItemOption);
        }

        return menuItems;
    }

    public async clickMenuItem(menuItem: string): Promise<void> {
        const menuItems = await this.getMenuItems();
        if (!menuItems.find((item) => item.itemName === menuItem)) {
            throw new Error(`Menu item "${menuItem}" not found`);
        }

        const singleMenuItem = this.getSingleMenuItem(menuItem);
        const expandableMenuItem = this.getExpandableMenuItem(menuItem);

        if (await singleMenuItem.isVisible()) {
            await singleMenuItem.click();
        } else {
            await expandableMenuItem.click();
        }
    }

    private async getNastedSubmenu(menuItemLocator: Locator): Promise<SideMenuComponent[]> {
        const nestedSubmenus = await menuItemLocator.locator('div[role="list"] div[role="list"]').all();
        const nastedSubmenuCoponents: SideMenuComponent[] = [];
        for (const menu of nestedSubmenus) {
            nastedSubmenuCoponents.push(new SideMenuComponent(menu));
        }

        return nastedSubmenuCoponents;
    }
}
