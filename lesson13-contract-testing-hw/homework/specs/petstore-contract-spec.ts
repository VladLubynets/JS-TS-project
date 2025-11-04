import { PetstoreService, Pet } from '../src/services/petstore-service';
import { MatchersV3, PactV3, Verifier } from '@pact-foundation/pact';
import { expect } from 'chai';
import * as path from 'path';

describe('Petstore API Contract Tests', () => {
    const provider = new PactV3({
        consumer: 'petstore-consumer',
        provider: 'petstore-provider'
    });

    describe('GET /pet/{petId}', () => {
        it('should create contract for getting pet by ID', () => {
            const petId = 1;
            const expectedPet: Pet = {
                id: petId,
                name: 'Fluffy',
                photoUrls: ['https://example.com/photo1.jpg'],
                status: 'available',
                category: {
                    id: 1,
                    name: 'Cats'
                },
                tags: [
                    {
                        id: 1,
                        name: 'cute'
                    }
                ]
            };

            const expectedBody = MatchersV3.like(expectedPet);

            provider
                .given('pet with id 1 exists')
                .uponReceiving('a request to get pet by id')
                .withRequest({
                    method: 'GET',
                    path: `/pet/${petId}`,
                    headers: {
                        accept: 'application/json'
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
                const service = new PetstoreService(mockServer.url);
                const pet = await service.getPetById(petId);

                expect(pet).to.have.property('id', petId);
                expect(pet).to.have.property('name');
                expect(pet).to.have.property('photoUrls');
            });
        });
    });

    describe('POST /pet', () => {
        it('should create contract for creating new pet', () => {
            const newPet: Pet = {
                name: 'Buddy',
                photoUrls: ['https://example.com/photo2.jpg'],
                status: 'available'
            };

            const expectedPet: Pet = {
                id: 123,
                name: 'Buddy',
                photoUrls: ['https://example.com/photo2.jpg'],
                status: 'available'
            };

            const requestBody = MatchersV3.like(newPet);
            const responseBody = MatchersV3.like(expectedPet);

            provider
                .given('a new pet can be created')
                .uponReceiving('a request to create a new pet')
                .withRequest({
                    method: 'POST',
                    path: '/pet',
                    headers: {
                        'Content-Type': 'application/json',
                        accept: 'application/json'
                    },
                    body: requestBody
                })
                .willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: responseBody
                });

            return provider.executeTest(async (mockServer) => {
                const service = new PetstoreService(mockServer.url);
                const createdPet = await service.createPet(newPet);

                expect(createdPet).to.have.property('id');
                expect(createdPet).to.have.property('name', 'Buddy');
            });
        });
    });

    describe('GET /pet/findByStatus', () => {
        it('should create contract for finding pets by status', () => {
            const status = 'available';
            const expectedPet: Pet = {
                id: 1,
                name: 'Fluffy',
                photoUrls: ['https://example.com/photo1.jpg'],
                status: 'available'
            };

            const expectedBody = MatchersV3.eachLike(expectedPet, 1);

            provider
                .given('pets with status available exist')
                .uponReceiving('a request to find pets by status')
                .withRequest({
                    method: 'GET',
                    path: '/pet/findByStatus',
                    query: {
                        status: status
                    },
                    headers: {
                        accept: 'application/json'
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
                const service = new PetstoreService(mockServer.url);
                const pets = await service.findPetsByStatus(status);

                expect(pets).to.be.an('array');
                expect(pets.length).to.be.greaterThan(0);
                expect(pets[0]).to.have.property('status', 'available');
            });
        });
    });

    describe('Provider verification', () => {
        it('should verify contract with real API', function (this: Mocha.Context, done: Mocha.Done) {
            this.timeout(10000);

            const pactFile = path.resolve(
                process.cwd(),
                'pacts',
                'petstore-consumer-petstore-provider.json'
            );

            new Verifier({
                providerBaseUrl: 'https://petstore.swagger.io/v2',
                pactUrls: [pactFile]
            })
                .verifyProvider()
                .then(() => {
                    console.log('Contract verified successfully');
                    done();
                })
                .catch((error) => {
                    console.error('Contract verification failed:', error);
                    done(error);
                });
        });
    });
});
