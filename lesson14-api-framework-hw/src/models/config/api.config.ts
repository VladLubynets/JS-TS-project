export interface ConfigDto {
    auth: AuthConfigDto;
    api: ApiConfigDto;
}

export interface AuthConfigDto {
    theDogsApi?: TheDogsApiAuthConfigDto;
    rdApi: RDAuthConfigDto;
}

export interface ApiConfigDto {
    theDogsApi: TheDogsApiConfigDto;
    rd: RDConfigDto;
}

export interface TheDogsApiAuthConfigDto {
    apiKey?: string;
}

export interface TheDogsApiConfigDto {
    baseUrl: string;
}

export interface RDAuthConfigDto {
    userName: string;
    password: string;
    token?: string;
}

export interface RDConfigDto {
    baseUrl: string;
    loginUrl: string;
}
