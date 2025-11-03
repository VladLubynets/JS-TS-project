import { CatImageDto } from '../models/image.dto';
import { VoteDto, CreateVoteRequest } from '../models/vote.dto';
import { FavouriteDto, CreateFavoriteRequest } from '../models/favourite.dto';

export class CatApiService {
    private baseUrl = 'https://api.thecatapi.com/v1';
    private apiKey: string;

    public constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    private async makeRequest(endpoint: string, method = 'GET', body?: string): Promise<any> {
        const url = `${this.baseUrl}${endpoint}`;
        const headers: Record<string, string> = {
            'x-api-key': this.apiKey
        };

        if (method !== 'GET') {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => '');
            throw new Error(`Request failed: ${response.status} ${response.statusText}. ${errorText}`);
        }

        return response.json();
    }

    public async getImages(limit = 10): Promise<CatImageDto[]> {
        return this.makeRequest(`/images/search?limit=${limit}`);
    }

    public async getImageById(imageId: string): Promise<CatImageDto> {
        return this.makeRequest(`/images/${imageId}`);
    }

    public async getVotes(): Promise<VoteDto[]> {
        return this.makeRequest('/votes');
    }

    public async getVoteById(voteId: number): Promise<VoteDto> {
        return this.makeRequest(`/votes/${voteId}`);
    }

    public async createVote(vote: CreateVoteRequest): Promise<VoteDto> {
        return this.makeRequest('/votes', 'POST', JSON.stringify(vote));
    }

    public async deleteVote(voteId: number): Promise<void> {
        await this.makeRequest(`/votes/${voteId}`, 'DELETE');
    }

    public async getFavourites(): Promise<FavouriteDto[]> {
        return this.makeRequest('/favourites');
    }

    public async getFavouriteById(favouriteId: number): Promise<FavouriteDto> {
        return this.makeRequest(`/favourites/${favouriteId}`);
    }

    public async createFavourite(favourite: CreateFavoriteRequest): Promise<FavouriteDto> {
        return this.makeRequest('/favourites', 'POST', JSON.stringify(favourite));
    }

    public async deleteFavourite(favouriteId: number): Promise<void> {
        await this.makeRequest(`/favourites/${favouriteId}`, 'DELETE');
    }
}
