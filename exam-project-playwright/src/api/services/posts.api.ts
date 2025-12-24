import { APIRequestContext } from '@playwright/test';
import { BaseApi, ApiResponse } from './base.api';
import { endpoints } from '../endpoints';
import { CreatePostDto } from '../models/request.dto';
import { PostDto } from '../models/response.dto';
import { VALID_LOGIN } from '../../test-data/test-data';

export class PostsApi extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request);
    }

    async create(postData: CreatePostDto): Promise<ApiResponse> {
        const response = await this.request.post(endpoints.createPost, { data: postData });
        return this.toApiResponse(response);
    }

    async getByUser(username = VALID_LOGIN): Promise<ApiResponse> {
        const response = await this.request.get(endpoints.postsByUser(username.toLowerCase()));
        return this.toApiResponse(response);
    }

    async delete(token: string, postId: string): Promise<ApiResponse> {
        const response = await this.request.delete(endpoints.deletePost(postId), {
            data: { token },
        });
        return this.toApiResponse(response);
    }

    parsePosts(body: string): PostDto[] {
        try {
            const data = JSON.parse(body);
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    }
}
