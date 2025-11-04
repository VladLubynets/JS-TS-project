import { ImageDto } from './models/image.dto';

export class DogService {
    private readonly apiKey: string = 'live_RkOPUkQ3fRTNFFXDKg9MPCIfmAHVRMgFcMLbF14PUobewScZYbXnyM1Jw5OQkEj0';
    public constructor(private baseUrl: string) {}

    public async getDogsImages(): Promise<ImageDto[]> {
        const response = await fetch(`${this.baseUrl}/images`, {headers: {'x-api-key': this.apiKey}});
        const responseJson = await response.json();

        return responseJson;
    }
}
