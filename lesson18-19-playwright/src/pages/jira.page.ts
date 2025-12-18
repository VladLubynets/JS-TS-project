import { Page } from '@playwright/test';
import { JiraBasePage } from './jira-base.page';

export class JiraPage extends JiraBasePage {
    public constructor(page: Page, url: string) {
        super(page, url);
    }
}
