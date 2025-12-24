import { APIRequestContext } from '@playwright/test';
import { BaseApi, ApiResponse } from './base.api';
import { endpoints } from '../endpoints';
import { VALID_LOGIN, VALID_PASSWORD } from '../../test-data/test-data';

export class AuthApi extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request);
    }

    async login(username = VALID_LOGIN, password = VALID_PASSWORD): Promise<ApiResponse> {
        const response = await this.request.post(endpoints.login, {
            data: { username, password },
        });
        return this.toApiResponse(response);
    }

    parseToken(body: string): string {
        return body.replace(/"/g, '');
    }
}
