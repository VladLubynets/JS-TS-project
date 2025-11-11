function sumAny(a, b) {
    return a + b;
}

const result = sumAny(1, 2);
const result2 = sumAny(2, '2');
console.log(result, result2);

function logArrayValues(arr, type) {
    if (!Array.isArray(arr)) {
        return;
    }

    const resultingArray = type && typeof type === 'string' ? filterArrayByType(arr, type) : arr;

    resultingArray.forEach(element => {
        console.log(element);
    });
}

const arr1 = [1, 2, 3];
const arr2 = ['1', '2', '3'];


export function filterArrayByType(arr, type) {
    return arr.filter(item => typeof item === type);
}

export const anyArray = [1, '2', true, {num: 4}];

console.log(filterArrayByType(anyArray, 'string'));
console.log(filterArrayByType(anyArray, 'boolean'));


logArrayValues(arr1);
logArrayValues(arr2);
logArrayValues(1);
console.log('logArrayValues([...anyArray, ...[6, \'true\', false]]);');
logArrayValues([...anyArray, ...[6, 'true', false]]);
console.log('logArrayValues([...anyArray, ...[6, \'true\', false]], \'string\');');
logArrayValues([...anyArray, ...[6, 'true', false]], 'string');
console.log('logArrayValues([...anyArray, ...[6, \'true\', false]], true);');
logArrayValues([...anyArray, ...[6, 'true', false]], true);


class SomeClass {
    name;
    surName = 'SurName';

    constructor() {
        this.name = 'SomeClass';
    }

    logInfo() {
        console.log(this.name, this.surName);
        console.log(this);
    }

    logAnotherInfo = () => {
        console.log(this);
    };
}

const obj = new SomeClass();
obj.logInfo();
console.log('-----------');
obj.logAnotherInfo();
