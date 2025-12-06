import { Page } from 'playwright';
import { JiraBasePage } from './jira-base.page.ts';

export class JiraPage extends JiraBasePage {
    public constructor(page: Page, url: string) {
        super(page, url);
    }
}
