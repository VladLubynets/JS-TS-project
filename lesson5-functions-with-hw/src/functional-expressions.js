import { filterArrayByType } from './tradition-functions.js';

const logArrayValues = function(arr, type) {
    if (!Array.isArray(arr)) {
        return;
    }

    const resultingArray = type && typeof type === 'string' ? filterArrayByType(arr, type) : arr;

    resultingArray.forEach(element => {
        console.log(element);
    });
};

console.log('logArrayValues([...anyArray, ...[6, \'true\', false]]);');
logArrayValues([...[1, '2', true], ...[6, 'true', false]]);
console.log('logArrayValues([...anyArray, ...[6, \'true\', false]], \'string\');');
logArrayValues([...[3, '6', {}], ...[6, 'true', false]], 'string');
console.log('logArrayValues([...anyArray, ...[6, \'true\', false]], true);');
logArrayValues([...[ false ], ...[3, '6', {}], ...[6, 'true', false]], true);
