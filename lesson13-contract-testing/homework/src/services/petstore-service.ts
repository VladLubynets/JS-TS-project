export interface Pet {
    id?: number;
    category?: Category;
    name: string;
    photoUrls: string[];
    tags?: Tag[];
    status?: 'available' | 'pending' | 'sold';
}

export interface Category {
    id?: number;
    name?: string;
}

export interface Tag {
    id?: number;
    name?: string;
}

export class PetstoreService {
    private baseUrl: string;

    public constructor(baseUrl?: string) {
        if (baseUrl) {
            this.baseUrl = baseUrl;
        } else {
            this.baseUrl = 'https://petstore.swagger.io/v2';
        }
    }

    private async makeRequest(endpoint: string, method = 'GET', body?: string): Promise<any> {
        const url = `${this.baseUrl}${endpoint}`;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            accept: 'application/json'
        };

        const response = await fetch(url, {
            method,
            headers,
            body
        });

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        return response.json();
    }

    public async getPetById(petId: number): Promise<Pet> {
        return this.makeRequest(`/pet/${petId}`);
    }

    public async createPet(pet: Pet): Promise<Pet> {
        return this.makeRequest('/pet', 'POST', JSON.stringify(pet));
    }

    public async updatePet(pet: Pet): Promise<Pet> {
        return this.makeRequest('/pet', 'PUT', JSON.stringify(pet));
    }

    public async deletePet(petId: number): Promise<void> {
        await this.makeRequest(`/pet/${petId}`, 'DELETE');
    }

    public async findPetsByStatus(status: 'available' | 'pending' | 'sold'): Promise<Pet[]> {
        return this.makeRequest(`/pet/findByStatus?status=${status}`);
    }
}
