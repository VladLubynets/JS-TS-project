export interface AuthorDto {
    username: string;
    avatar?: string;
}

export interface PostDto {
    _id: string;
    title: string;
    body: string;
    select1: string;
    updated?: string;
    uniquePost: string;
    createdDate: string;
    author: AuthorDto;
    isVisitorOwner: boolean;
}

export interface UserInfoDto {
    _id: string;
    username: string;
    avatar: string;
    email: string;
}
