import { filterArrayByType } from './tradition-functions.js';

const logArrayValues = (arr, type) => {
    if (!Array.isArray(arr)) {
        return;
    }

    const resultingArray = type && typeof type === 'string' ? filterArrayByType(arr, type) : arr;

    resultingArray.forEach((element) => {
        console.log(element);
    });
};

console.log('logArrayValues([...anyArray, ...[6, \'true\', false]]);');
logArrayValues([...[1, '2', true], ...[6, 'true', false]]);
console.log('logArrayValues([...anyArray, ...[6, \'true\', false]], \'string\');');
logArrayValues([...[3, '6', {}], ...[6, 'true', false]], 'string');
console.log('logArrayValues([...anyArray, ...[6, \'true\', false]], true);');
logArrayValues([...[false], ...[3, '6', {}], ...[6, 'true', false]], true);

const sum = (a, b) => a + b;
console.log(sum(1, 2));

const extract = (a, b) => a - b;
function extract2(a, b) {
    return b - a;
}

const numbers = [1, 8, 3, 4, 2];
numbers.sort((a, b) => a - b);
numbers.sort(extract);
console.log(numbers);

numbers.sort(extract2);
console.log(numbers);

// const func2 = (a, b, c) => {
//     console.log(arguments[0]);
//     // Expected output: 1

//     console.log(arguments[1]);
//     // Expected output: 2

//     console.log(arguments[2]);
//     // Expected output: 3
// };

