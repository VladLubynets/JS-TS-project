import { IWorldOptions, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import { ConfigService } from '../services/config.service.ts';
import { JiraPage } from '../pages/jira.page.ts';
import { AtlassianLoginPage } from '../pages/atlassian-login.page.ts';

export class RobotDreamsWorld extends World {
    public static globalContext: Map<string, unknown> = new Map<string, unknown> ();

    // we can create a context class that will have its set and get methods for better readability
    public scenarioContext: Map<string, unknown>;

    public static browser: Browser;
    public context: BrowserContext;
    public page: Page;

    public get browser(): Browser {
        return RobotDreamsWorld.browser;
    }

    public get globalContext(): Map<string, unknown> {
        return RobotDreamsWorld.globalContext;
    }

    // pages getters
    public get jiraPage(): JiraPage {
        if (!this._jiraPage) {
            this._jiraPage = new JiraPage(this.page, this.configService.config.uiConfig.jiraBaseUrl);
        }
        return this._jiraPage;
    }

    // service getters
    public get configService(): ConfigService {
        if (!this._configService) {
            this._configService = new ConfigService();
        }
        return this._configService;
    }

    public get atlassianLoginPage(): AtlassianLoginPage {
        if (!this._atlassianLoginPage) {
            this._atlassianLoginPage = new AtlassianLoginPage(this.page, this.configService);
        }
        return this._atlassianLoginPage;
    }

    // pages
    private _jiraPage: JiraPage;
    private _atlassianLoginPage: AtlassianLoginPage;

    // services
    private _configService: ConfigService;

    public constructor(options: IWorldOptions) {
        super(options);
        this.scenarioContext = new Map<string, unknown>();
    }
}
