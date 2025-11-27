import { browser } from '@wdio/globals';
import { expect } from 'expect-webdriverio';
import { AtlassianLoginPage, JiraPage } from '../src/pages';

describe('WDIO Jira login', () => {
    let atlassianLoginPage: AtlassianLoginPage;
    let jiraPage: JiraPage;

    before(async () => {
        await browser.maximizeWindow();
        atlassianLoginPage = new AtlassianLoginPage();
        jiraPage = new JiraPage();
        // jira login with POM
        await atlassianLoginPage.login(process.env.JIRA_LOGIN as string, process.env.JIRA_PASSWORD as string);
    });

    // it('test login', async () => {
    //     await browser.url('https://www.atlassian.com/');
    //     await $('[name="sign-in"]').click();
    //     await $('#username').setValue(process.env.JIRA_LOGIN as string); // change to you login email
    //     await $('#login-submit').click();
    //     await $('#password').setValue(process.env.JIRA_PASSWORD as string); // change to you password
    //     await $('#login-submit').click();

    //     await $('[data-testid="nav-profile-button--trigger"]').waitForExist();
    // });

    it('test login on atlassian page', async () => {
        await atlassianLoginPage.goto();

        const userLogo = await atlassianLoginPage.userLogo;
        await expect(userLogo).toBeDisplayed();
    });

    it('test login on jira page', async () => {
        await jiraPage.goTo();

        const userLogo = await jiraPage.userLogo;
        await expect(userLogo).toBeDisplayed();
    });
});
