import { test } from '../src/fixtures/atlassian.fixture';
import { expect as expectChai } from 'chai';
import { JiraPage } from '../src/pages/jira.page';

test.describe('jira sidemenu tests', { tag: ['@sidemenu'] }, () => {
    let _jiraPage: JiraPage;

    test.beforeEach(async ({ jiraPage }) => {
        _jiraPage = jiraPage;
        await jiraPage.goTo();
    });

    test('jira verify menu items', async () => {
        const menuItems = await _jiraPage.sideMenuComponent.getMenuItems();

        expectChai(menuItems.map((item) => item.itemName)).to.include.members(['For you', 'Recent', 'Starred', 'Plans', 'Spaces']);
    });

    test('jira click menu item with steps approach', async () => {
        // await _jiraPage.sideMenuComponent.clickMenuItem('Customize sidebar');

        // const customizationElements = await _jiraPage.customizeSidebarModalComponent.getCustomizeJiraNavigationElements();
        // expectChai(customizationElements).to.include.members(['For you', 'Recent', 'Starred', 'Plans', 'Spaces']);

        await test.step('Click "Customize sidemenu" sidemenu item', async () => {
            await _jiraPage.sideMenuComponent.clickMenuItem('Customize sidebar');
        });

        await test.step('Wait for modal and verify Customize Navigation Elements options', async () => {
            const customizationElements = await _jiraPage.customizeSidebarModalComponent.getCustomizeJiraNavigationElements();
            expectChai(customizationElements).to.include.members(['For you', 'Recent', 'Starred', 'Plans', 'Spaces']);
        });
    });
});
