export interface CatImageDto {
    id: string;
    url: string;
    width: number;
    height: number;
    breeds?: BreedDto[];
    sub_id?: string;
    created_at?: string;
    original_filename?: string;
}

export interface BreedDto {
    weight: BreedWeight;
    height: BreedHeight;
    id: number;
    name: string;
    bred_for?: string;
    bred_group?: string;
    life_span?: string;
    temperament?: string;
    reference_image_id?: string;
}

export interface BreedWeight {
    imperial: string;
    metric: string;
}

export interface BreedHeight {
    imperial: string;
    metric: string;
}

