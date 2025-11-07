import { IApiService } from '../../src/services/abstractions/i-api-service';
import { JokeDto } from '../models/joke.dto';

export class JokeApi {
    public constructor(private readonly apiService: IApiService<Response>) {}

    public async getRandomJoke(): Promise<[Response, JokeDto]> {
        const response = await this.apiService.get('/jokes/random');
        const joke = await response.json();
        return [response, joke];
    }

    public async getTenRandomJokes(): Promise<[Response, JokeDto[]]> {
        const response = await this.apiService.get('/jokes/ten');
        const jokes = await response.json();
        return [response, jokes];
    }

    public async getRandomJokes(count: number): Promise<[Response, JokeDto[]]> {
        const response = await this.apiService.get(`/jokes/random/${count}`);
        const jokes = await response.json();
        return [response, jokes];
    }

    public async getJokeTypes(): Promise<[Response, string[]]> {
        const response = await this.apiService.get('/types');
        const types = await response.json();
        return [response, types];
    }

    public async getProgrammingRandomJokes(): Promise<[Response, JokeDto[]]> {
        const response = await this.apiService.get('/jokes/programming/random');
        const jokes = await response.json();
        return [response, jokes];
    }

    public async getProgrammingTenJokes(): Promise<[Response, JokeDto[]]> {
        const response = await this.apiService.get('/jokes/programming/ten');
        const jokes = await response.json();
        return [response, jokes];
    }

    public async getKnockKnockRandomJokes(): Promise<[Response, JokeDto[]]> {
        const response = await this.apiService.get('/jokes/knock-knock/random');
        const jokes = await response.json();
        return [response, jokes];
    }

    public async getJokeById(id: number | string): Promise<[Response, JokeDto]> {
        const response = await this.apiService.get(`/jokes/${id}`);
        const joke = await response.json();
        return [response, joke];
    }
}

