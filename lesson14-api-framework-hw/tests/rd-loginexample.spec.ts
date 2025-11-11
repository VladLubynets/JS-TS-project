import { beforeAll, describe, expect, test } from 'vitest';
import { world } from '../src/hooks/vitest-global-setup';
import { RdApi } from '../src/apis/rd/rd.api';
// import { PlaywrightApiService } from '../src/services/playwright-api.service';


describe('RD API tests', () => {
    let rdApi: RdApi;

    beforeAll(() => {
        // const config = world.configService.getConfig();
        // const playwrightApiService = new PlaywrightApiService(config.api.rd.baseUrl, { jwtToken: config.auth.rdApi.token });
        // rdApi = new RdApi(playwrightApiService);
        rdApi = world.rdApi;
    });

    describe('QUery Ratings', () => {
        test('get ratings', async () => {
            const [ratings, response] = await rdApi.getRatings();

            expect(response.status()).toBe(200);
            expect(ratings).toBeDefined();
        });
    });
});
