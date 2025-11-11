import * as dotenv from 'dotenv';
import { HwConfigDto } from '../models/config.config';

export class HwConfigService {
    public constructor() {
        dotenv.config();
    }

    public getConfig(): HwConfigDto {
        return {
            api: {
                jokeApi: {
                    baseUrl: process.env.JOKE_API_BASE_URL || 'http://localhost:3005'
                }
            }
        };
    }
}

