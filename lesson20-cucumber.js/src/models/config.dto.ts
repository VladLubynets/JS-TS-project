export interface ConfigDto {
    auth: AuthDto;
    uiConfig: UiConfigDto;
    apiConfig: ApiConfigDto;
}

export interface AuthDto {
    login: string;
    password: string;
    apiToken: string;
}

export interface UiConfigDto {
    jiraBaseUrl: string;
    atlassianBaseUrl: string;
}

export interface ApiConfigDto {
    jiraApiUrl: string;
}
