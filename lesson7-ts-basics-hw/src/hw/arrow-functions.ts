export const addArrayElements = (arr: number[] | string[]): number => {
    return arr.reduce<number>((acc, item) => {
        const value = Number(item);
        return isNaN(value) ? acc : acc + value;
    }, 0);
};

const numbers: number[] = [1, 2, 3, 4];
const strings: string[] = ['6', '7', '8', 'four'];

console.log('Sum of numbers:', addArrayElements(numbers));
console.log('Sum of strings:', addArrayElements(strings));
