import { DogService } from '../src/dog-service';
import { MatchersV3, PactV3, Verifier } from '@pact-foundation/pact';
import { ImageDto } from '../src/models/image.dto';
import { expect } from 'chai';
import * as path from 'path';

describe('the dogs api contract tests /images', () => {
    let dogService: DogService;
    const apiKey = 'live_RkOPUkQ3fRTNFFXDKg9MPCIfmAHVRMgFcMLbF14PUobewScZYbXnyM1Jw5OQkEj0';

    const provider = new PactV3({
        consumer: 'dogs-consumer',
        provider: 'dogs-provider'
    });

    const expectedResponse = [
        {
            breeds: [],
            id: 'Sfzj5KgNW',
            url: 'https://cdn2.thedogapi.com/images/Sfzj5KgNW.jpg',
            width: 1500,
            height: 1000,
            sub_id: 'Vi Le',
            created_at: '2025-10-27T11:06:38.000Z',
            original_filename: 'the_dog_1.jpg',
            breed_ids: '110'
        }
    ] as unknown as ImageDto[];

    const expectedBody = MatchersV3.like(expectedResponse);

    describe('consumer test', () => {
        it('create contract', () => {
            provider
                .given('dogs exist')
                .uponReceiving('a request for dogs')
                .withRequest({
                    method: 'GET',
                    path: '/images',
                    headers: {
                        'x-api-key': apiKey,
                        accept: '*/*'
                    }
                })
                .willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: expectedBody
                });

            return provider.executeTest(async (mockServer) => {
                dogService = new DogService(mockServer.url);
                const images = await dogService.getDogsImages();

                expect(images[0]).to.contain.keys(
                    'id',
                    'url',
                    'width',
                    'height',
                    'breeds',
                    'sub_id',
                    'created_at',
                    'original_filename',
                    'breed_ids'
                );
                expect(images[0].id).to.be.a('string');
                expect(images[0].url).to.be.a('string');
                expect(images[0].width).to.be.a('number');
                expect(images[0].height).to.be.a('number');
                expect(images[0].sub_id).to.be.a('string');
                expect(images[0].created_at).to.be.a('string');
                expect(images[0].original_filename).to.be.a('string');
                expect(images[0].breed_ids).to.be.a('srting');
            });
        });
    });

    describe('provider test', () => {
        it('verify contract', () => {
            return new Verifier({
                providerBaseUrl: 'https://api.thedogapi.com/v1',
                pactUrls: [path.resolve(process.cwd(), 'pacts', 'dogs-consumer-dogs-provider.json')]
            })
                .verifyProvider()
                .then(() => {
                    console.log('contract verified');
                });
        });
    });
});
