export function addArrayElements(arr: (number | string)[]): number {
    let sum = 0;

    for (const item of arr) {
        const n = typeof item === 'number' ? item : Number(item);
        sum += n;
    }

    return sum;
}


const numbers: number[] = [6, 7, 8, 9];
const strings: string[] = ['56', '7', '10'];


console.log('Sum of numbers:', addArrayElements(numbers));
console.log('Sum of strings:', addArrayElements(strings));
