import { APIRequestContext, expect } from '@playwright/test';
import { endpoints } from './endpoints';
import { CreatePostDto, CreateUserDto } from './models/request.dto';
import { PostDto, UserInfoDto } from './models/response.dto';
import { VALID_LOGIN, VALID_PASSWORD } from '../test-data/test-data';

export class ApiHelperService {
    constructor(private readonly request: APIRequestContext) {}

    async getToken(login = VALID_LOGIN, password = VALID_PASSWORD): Promise<string> {
        const response = await this.request.post(endpoints.login, {
            data: { username: login, password },
        });
        expect(response.status()).toBe(200);
        return (await response.text()).replace(/"/g, '');
    }

    async expectInvalidLogin(expectedError: string, login: string, password: string): Promise<void> {
        const response = await this.request.post(endpoints.login, {
            data: { username: login, password },
        });
        const body = await response.text();
        expect(body).toBe(expectedError);
    }

    async getPostsByUser(username = VALID_LOGIN): Promise<PostDto[]> {
        const response = await this.request.get(endpoints.postsByUser(username.toLowerCase()));
        if (response.status() === 400) return [];

        expect(response.status()).toBe(200);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    }

    async deletePost(token: string, postId: string): Promise<void> {
        const response = await this.request.delete(endpoints.deletePost(postId), {
            data: { token },
        });
        expect(response.status()).toBe(200);
        expect(await response.text()).toBe('"Success"');
    }

    async deleteAllPosts(username = VALID_LOGIN, password = VALID_PASSWORD): Promise<void> {
        const posts = await this.getPostsByUser(username);
        const token = await this.getToken(username, password);

        for (const post of posts) {
            await this.deletePost(token, post._id);
        }

        expect((await this.getPostsByUser(username)).length).toBe(0);
    }

    async createPost(postData: CreatePostDto): Promise<void> {
        const response = await this.request.post(endpoints.createPost, { data: postData });
        expect(response.status()).toBe(200);
        expect(await response.text()).toBe('"Congrats."');
    }

    async createPostExpectError(postData: CreatePostDto, expectedStatus: number, expectedError: string): Promise<void> {
        const response = await this.request.post(endpoints.createPost, { data: postData });
        expect(response.status()).toBe(expectedStatus);
        expect(await response.text()).toBe(expectedError);
    }

    async createUser(username: string, password: string, email: string, token: string): Promise<void> {
        const response = await this.request.put(endpoints.createUser, {
            data: { username, email, password, token } as CreateUserDto,
        });
        expect(response.status()).toBe(201);
        expect(await response.text()).toBe('"Congrats. You created new user"');
    }

    async createUserExpectError(userData: CreateUserDto, expectedStatus: number, expectedError: string): Promise<void> {
        const response = await this.request.put(endpoints.createUser, { data: userData });
        expect(response.status()).toBe(expectedStatus);
        expect(await response.text()).toBe(expectedError);
    }

    async getUserInfo(username: string, token: string): Promise<UserInfoDto> {
        expect(token.length).toBeGreaterThanOrEqual(10);
        const response = await this.request.post(endpoints.getUserInfo(username), {
            data: { token },
        });
        expect(response.status()).toBe(200);
        return response.json();
    }

    async getUserInfoExpectError(
        username: string,
        token: string,
        expectedStatus: number,
        expectedError: string
    ): Promise<void> {
        const response = await this.request.post(endpoints.getUserInfo(username), {
            data: { token },
        });
        expect(response.status()).toBe(expectedStatus);
        expect(await response.text()).toBe(expectedError);
    }

    async deleteUser(token: string, userId: string, username: string, expectSuccess: boolean): Promise<void> {
        const postsCount = expectSuccess ? 0 : (await this.getPostsByUser(username)).length;

        const response = await this.request.delete(endpoints.deleteUser(userId), {
            data: { token },
        });

        if (expectSuccess) {
            expect(response.status()).toBe(200);
            expect(await response.text()).toBe(`"User with id ${userId} was deletted "`);
        } else {
            expect(response.status()).toBe(400);
            expect(await response.text()).toBe(
                `"Number of posts of this user is ${postsCount}. We can not delete user with posts."`
            );
        }
    }

    async deleteUserExpectError(
        token: string,
        userId: string,
        expectedStatus: number,
        expectedError: string
    ): Promise<void> {
        const response = await this.request.delete(endpoints.deleteUser(userId), {
            data: { token },
        });
        expect(response.status()).toBe(expectedStatus);
        expect(await response.text()).toBe(expectedError);
    }

    async deletePostExpectError(
        token: string,
        postId: string,
        expectedStatus: number,
        expectedError: string
    ): Promise<void> {
        const response = await this.request.delete(endpoints.deletePost(postId), {
            data: { token },
        });
        expect(response.status()).toBe(expectedStatus);
        expect(await response.text()).toBe(expectedError);
    }
}
