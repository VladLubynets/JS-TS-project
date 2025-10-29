import { expect as expectChai } from 'chai';

describe('This is a set of our first tests', () => {
    let sum: number;

    beforeAll(() => {
        sum = -1;
    });

    beforeEach(() => {
        sum = 0;
    });

    afterAll(() => {
        sum = -1;
    });

    describe('This is a first test', () => {
        it('sum is 4', () => {
            sum = 2 + 2;
            expect(sum).toBe(4);
        });
    });

    describe('the second test', () => {
        it('2 + 2 != 5', () => {
            expect(2 + 2).not.toBe(5);
            expectChai(2 + 2).not.to.equal(5);
        });
    });
});

// describe('This is the global context test', () => {
//     describe('check globalThis in another test suite', () => {
//         it('globalThis.age should be 20', () => {
//             expect(globalThis.age).to.equal(20);
//         });
//     });
// });
