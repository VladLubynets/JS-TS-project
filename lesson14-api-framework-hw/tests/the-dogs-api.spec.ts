import { describe, expect,  test } from 'vitest';
import { ConfigService } from '../src/services/config.service';
import { FetchApiService } from '../src/services/fetch-api.service';
import { TheDogImageApi } from '../src/apis/the-dog-api/images.api';
import { ImageDto } from '../src/models/the-dogs-api/image.dto';
import { world } from '../src/hooks/vitest-global-setup';

describe('The Dogs API integration test', () => {
    const config = (new ConfigService()).getConfig();
    const fetchApiService = new FetchApiService(config.api.theDogsApi.baseUrl, { apiKey: config.auth?.theDogsApi?.apiKey });
    const dogsImages = new TheDogImageApi(fetchApiService);

    let uploadedImageJson: ImageDto;

    describe('upload image tests', () => {
        test('upload image', async () => {
            const [response, json] = await dogsImages.uploadImage('artifacts/the_dog_1.jpg', 'VILE');

            expect(response.ok).toBeTruthy();
            expect(json).toBeDefined();
            expect(json.id).toBeDefined();

            uploadedImageJson = json;
        });

        test('check that image was uploaded', async () => {
            const [response, json] = await dogsImages.getMyImages();

            expect(response.ok).toBeTruthy();
            expect(json).toBeDefined();
            expect(json.length).toBeGreaterThan(0);

            const uploadedImage = json.find(image => image.id === uploadedImageJson.id);

            expect(uploadedImage?.id).toBe(uploadedImageJson.id);
            expect(uploadedImage?.url).toBe(uploadedImageJson.url);
            expect(uploadedImage?.original_filename).toBe(uploadedImageJson.original_filename);
            expect(uploadedImage?.sub_id).toBe(uploadedImageJson.sub_id);
        });

        test('check that image was uploaded', async () => {
            const [response, json] = await world.theDogsImagesApiService.getMyImages();

            expect(response.ok).toBeTruthy();
            expect(json).toBeDefined();
            expect(json.length).toBeGreaterThan(0);

            const uploadedImage = json.find(image => image.id === uploadedImageJson.id);

            expect(uploadedImage?.id).toBe(uploadedImageJson.id);
            expect(uploadedImage?.url).toBe(uploadedImageJson.url);
            expect(uploadedImage?.original_filename).toBe(uploadedImageJson.original_filename);
            expect(uploadedImage?.sub_id).toBe(uploadedImageJson.sub_id);
        });
    });
});
