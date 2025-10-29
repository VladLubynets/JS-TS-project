import { expect } from 'chai';
import { after, describe } from 'mocha';

describe('This is a set of our first tests', () => {
    let sum: number;

    before(() => {
        sum = -1;
        console.log(`before globalThis.age = ${globalThis.age}`);
        globalThis.age = 20;
    });

    beforeEach(() => {
        sum = 0;
        console.log(`beforeEach globalThis.age = ${globalThis.age}`);
    });

    after(() => {
        sum = -1;
        console.log(`after globalThis.age = ${globalThis.age}`);
    });

    describe('This is a first test', () => {
        it('sum is 4', () => {
            sum = 2 + 2;
            expect(sum).to.equal(4).and.to.be.a('number');
        });
    });

    describe('the second test', () => {
        it('2 + 2 != 5', () => {
            expect(2 + 2).not.to.equal(5);
        });
    });
});

describe('This is the global context test', () => {
    describe('check globalThis in another test suite', () => {
        it('globalThis.age should be 20', () => {
            expect(globalThis.age).to.equal(20);
        });
    });
});
