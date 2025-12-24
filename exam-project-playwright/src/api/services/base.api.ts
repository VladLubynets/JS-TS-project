import { APIRequestContext, APIResponse } from '@playwright/test';

export interface ApiResponse {
    status: number;
    body: string;
}

export abstract class BaseApi {
    constructor(protected readonly request: APIRequestContext) {}

    protected async toApiResponse(response: APIResponse): Promise<ApiResponse> {
        return {
            status: response.status(),
            body: await response.text(),
        };
    }
}
