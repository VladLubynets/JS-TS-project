import { describe, expect, test } from 'vitest';
import { FetchApiService } from '../../src/services/fetch-api.service';
import { JokeApi } from '../apis/joke.api';
import { HwConfigService } from '../services/config.service';
import { JokeDto } from '../models/joke.dto';

describe('Joke API integration tests', () => {
    const configService = new HwConfigService();
    const config = configService.getConfig();
    const fetchApiService = new FetchApiService(config.api.jokeApi.baseUrl, {});
    const jokeApi = new JokeApi(fetchApiService);

    describe('Random joke test', () => {
        test('should get a random joke with all required fields', async () => {
            const [response, joke] = await jokeApi.getRandomJoke();

            expect(response.ok).toBeTruthy();
            expect(response.status).toBe(200);
            expect(joke).toBeDefined();
            expect(joke).toHaveProperty('id');
            expect(joke).toHaveProperty('type');
            expect(joke).toHaveProperty('setup');
            expect(joke).toHaveProperty('punchline');
            expect(joke.id).toBeDefined();
            expect(typeof joke.type).toBe('string');
            expect(typeof joke.setup).toBe('string');
            expect(typeof joke.punchline).toBe('string');
        });
    });

    describe('Ten random jokes test', () => {
        test('should get ten random jokes as an array', async () => {
            const [response, jokes] = await jokeApi.getTenRandomJokes();

            expect(response.ok).toBeTruthy();
            expect(response.status).toBe(200);
            expect(jokes).toBeDefined();
            expect(Array.isArray(jokes)).toBeTruthy();
            expect(jokes.length).toBe(10);

            jokes.forEach((joke: JokeDto) => {
                expect(joke).toHaveProperty('id');
                expect(joke).toHaveProperty('type');
                expect(joke).toHaveProperty('setup');
                expect(joke).toHaveProperty('punchline');
            });
        });
    });

    describe('Joke types test', () => {
        test('should get joke types containing expected values', async () => {
            const [response, types] = await jokeApi.getJokeTypes();

            expect(response.ok).toBeTruthy();
            expect(response.status).toBe(200);
            expect(types).toBeDefined();
            expect(Array.isArray(types)).toBeTruthy();
            expect(types).toContain('general');
            expect(types).toContain('programming');
            expect(types).toContain('knock-knock');
        });
    });

    describe('Programming random jokes test', () => {
        test('should get programming jokes with correct type', async () => {
            const [response, jokes] = await jokeApi.getProgrammingRandomJokes();

            expect(response.ok).toBeTruthy();
            expect(response.status).toBe(200);
            expect(jokes).toBeDefined();
            expect(Array.isArray(jokes)).toBeTruthy();

            jokes.forEach((joke: JokeDto) => {
                expect(joke.type).toBe('programming');
                expect(joke).toHaveProperty('id');
                expect(joke).toHaveProperty('setup');
                expect(joke).toHaveProperty('punchline');
            });
        });
    });

    describe('Joke by dynamic ID test', () => {
        test('should get a joke by ID that matches the requested ID', async () => {
            const [randomResponse, randomJoke] = await jokeApi.getRandomJoke();
            expect(randomResponse.ok).toBeTruthy();
            expect(randomJoke.id).toBeDefined();

            const jokeId = randomJoke.id;
            const [response, joke] = await jokeApi.getJokeById(jokeId);

            expect(response.ok).toBeTruthy();
            expect(response.status).toBe(200);
            expect(joke).toBeDefined();
            expect(String(joke.id)).toBe(String(jokeId));
            expect(joke).toHaveProperty('type');
            expect(joke).toHaveProperty('setup');
            expect(joke).toHaveProperty('punchline');
        });
    });
});

