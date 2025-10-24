// {
//     "id": "1",
//     "name": "Google Pixel 6 Pro",
//     "data": {
//         "color": "Cloudy White",
//         "capacity": "128 GB"
//     }
// },
// {
//     "id": "2",
//     "name": "Apple iPhone 12 Mini, 256GB, Blue",
//     "data": null
// },

export interface ApiObjectDto {
    id: string;
    name: string;
    data: ApiObjectDataDto | null;
}

interface ApiObjectDataDto {
    color: string;
    capacity?: string;
    'capacity GB'?: string;
    price?: number;
}

// export type ApiObjectDataDtoType = {
//     color: string;
//     capacity?: string;
//     'capacity GB'?: string;
//     price?: number;
// };

// export type CustomType = {
//     [key: string]: {
//         [key: string]: any;
//     };
// };

export type InputArray = string[] | number[];
export type InputArrayMix = (string | number)[];


