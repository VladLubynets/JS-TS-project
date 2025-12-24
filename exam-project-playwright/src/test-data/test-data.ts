export const VALID_LOGIN = process.env.VALID_LOGIN || 'QaTsAutomation';
export const VALID_PASSWORD = process.env.VALID_PASSWORD || 'QaTsAutomation123';
export const VALID_LOGIN_UPPER_CASE = VALID_LOGIN.toUpperCase();

export const INVALID_LOGIN = 'aacomplex';
export const INVALID_PASSWORD = '123';
export const INVALID_VALUE_1CHAR = 'a';

export const generateRandomString = (length: number): string =>
    Array.from({ length }, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]).join('') +
    'qaauto';

export const generateRandomEmail = (): string => `${generateRandomString(10)}@gmail.com`;
