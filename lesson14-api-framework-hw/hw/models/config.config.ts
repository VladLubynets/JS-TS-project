export interface JokeApiConfigDto {
    baseUrl: string;
}

export interface HwConfigDto {
    api: {
        jokeApi: JokeApiConfigDto;
    };
}

