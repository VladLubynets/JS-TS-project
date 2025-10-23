export const addArrayElements = (arr: (number | string)[]): number => {
    return arr.reduce<number>((acc, item) => {
        const n = typeof item === 'number' ? item : Number(item);
        return acc + n;
    }, 0);
};

const numbers: number[] = [1, 2, 3, 4];
const strings: string[] = ['6', '7', '8'];

console.log('Sum of numbers:', addArrayElements(numbers));
console.log('Sum of strings:', addArrayElements(strings));
