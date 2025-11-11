import { BreedDto } from './breeds.dto';

export interface ImageDto {
    id: string;
    url: string;
    sub_id: string;
    width: number;
    height: number;
    original_filename: string;
    pending: number;
    approved: number;
    breeds: BreedDto[];
    created_at: string;
    breed_ids: null | string[];
}
