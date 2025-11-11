export interface VoteDto {
    id: number;
    user_id: string;
    image_id: string;
    sub_id: string;
    value: number;
    created_at: string;
    image?: {
        id: string;
        url: string;
    };
    country_code?: string;
}

export interface CreateVoteRequest {
    image_id: string;
    sub_id?: string;
    value: number;
}

