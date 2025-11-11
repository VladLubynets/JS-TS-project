import { describe, expect,  test } from 'vitest';

describe('Vitest test example suite', () => {
    describe('Vitest first test', () => {
        test('2 + 2 = 4', () => {
            expect(2 + 2).toBe(4);
        });
    });
});
