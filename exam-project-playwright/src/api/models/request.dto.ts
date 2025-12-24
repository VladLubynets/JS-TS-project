export interface CreatePostDto {
    title: string;
    body: string;
    select1?: string;
    uniquePost?: string;
    token: string;
}

export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
    token: string;
}
