import { CatApiService } from '../src/services/cat-api-service';
import { expect } from 'chai';

describe('TheCatAPI Integration Tests', () => {
    let catApiService: CatApiService;
    const apiKey = 'live_RkOPUkQ3fRTNFFXDKg9MPCIfmAHVRMgFcMLbF14PUobewScZYbXnyM1Jw5OQkEj0';

    before(() => {
        catApiService = new CatApiService(apiKey);
    });

    describe('Images and Votes relationship', () => {
        it('should create vote for image and verify connection', async () => {
            const images = await catApiService.getImages(10);
            expect(images.length).to.be.greaterThan(0);
            const imageId = images[0].id;

            const vote = await catApiService.createVote({
                image_id: imageId,
                value: 1,
                sub_id: 'test-user'
            });

            expect(vote.image_id).to.equal(imageId);
            expect(vote).to.have.property('id');

            const allVotes = await catApiService.getVotes();
            const foundVote = allVotes.find((v) => v.id === vote.id);
            expect(foundVote).to.exist;
            expect(foundVote?.image_id).to.equal(imageId);

            await catApiService.deleteVote(vote.id);
        });
    });

    describe('Images and Favourites relationship', () => {
        it('should add image to favourites and verify connection', async () => {
            const images = await catApiService.getImages(5);
            expect(images.length).to.be.greaterThan(0);
            const imageId = images[0].id;

            const favourite = await catApiService.createFavourite({
                image_id: imageId,
                sub_id: 'test-user'
            });

            expect(favourite.image_id).to.equal(imageId);
            expect(favourite).to.have.property('id');

            const allFavourites = await catApiService.getFavourites();
            const foundFavourite = allFavourites.find((f) => f.id === favourite.id);
            expect(foundFavourite).to.exist;
            expect(foundFavourite?.image_id).to.equal(imageId);

            await catApiService.deleteFavourite(favourite.id);
        });
    });

    describe('All modules together', () => {
        it('should work with same image across all modules', async () => {
            const images = await catApiService.getImages(1);
            expect(images.length).to.be.greaterThan(0);
            const imageId = images[0].id;

            const vote = await catApiService.createVote({
                image_id: imageId,
                value: 1,
                sub_id: 'test-user'
            });

            const favourite = await catApiService.createFavourite({
                image_id: imageId,
                sub_id: 'test-user'
            });

            expect(vote.image_id).to.equal(imageId);
            expect(favourite.image_id).to.equal(imageId);
            expect(vote.image_id).to.equal(favourite.image_id);

            const image = await catApiService.getImageById(imageId);
            expect(image.id).to.equal(imageId);

            await catApiService.deleteVote(vote.id);
            await catApiService.deleteFavourite(favourite.id);
        });
    });

    describe('Error handling', () => {
        it('should handle error for non-existent image when creating vote', async () => {
            try {
                await catApiService.createVote({
                    image_id: 'fake-id-12345',
                    value: 1,
                    sub_id: 'test-user'
                });
                expect.fail('Should throw error');
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('should handle error for non-existent image when adding to favourites', async () => {
            try {
                await catApiService.createFavourite({
                    image_id: 'fake-id-12345',
                    sub_id: 'test-user'
                });
                expect.fail('Should throw error');
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });
    });

    describe('Multiple votes for one image', () => {
        it('should allow multiple votes for same image', async () => {
            const images = await catApiService.getImages(1);
            expect(images.length).to.be.greaterThan(0);
            const imageId = images[0].id;

            const vote1 = await catApiService.createVote({
                image_id: imageId,
                value: 1,
                sub_id: 'test-user-1'
            });

            const vote2 = await catApiService.createVote({
                image_id: imageId,
                value: 0,
                sub_id: 'test-user-2'
            });

            expect(vote1.image_id).to.equal(imageId);
            expect(vote2.image_id).to.equal(imageId);
            expect(vote1.id).to.not.equal(vote2.id);

            await catApiService.deleteVote(vote1.id);
            await catApiService.deleteVote(vote2.id);
        });
    });
});
