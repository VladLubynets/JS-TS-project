import { APIRequestContext } from '@playwright/test';
import { BaseApi, ApiResponse } from './base.api';
import { endpoints } from '../endpoints';
import { CreateUserDto } from '../models/request.dto';
import { UserInfoDto } from '../models/response.dto';

export class UsersApi extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request);
    }

    async create(userData: CreateUserDto): Promise<ApiResponse> {
        const response = await this.request.put(endpoints.createUser, { data: userData });
        return this.toApiResponse(response);
    }

    async getInfo(username: string, token: string): Promise<ApiResponse> {
        const response = await this.request.post(endpoints.getUserInfo(username), {
            data: { token },
        });
        return this.toApiResponse(response);
    }

    async delete(token: string, userId: string): Promise<ApiResponse> {
        const response = await this.request.delete(endpoints.deleteUser(userId), {
            data: { token },
        });
        return this.toApiResponse(response);
    }

    parseUserInfo(body: string): UserInfoDto {
        return JSON.parse(body);
    }
}
