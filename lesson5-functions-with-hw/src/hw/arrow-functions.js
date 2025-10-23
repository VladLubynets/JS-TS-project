const addArrayElements = (arr) => {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        const value = Number(arr[i]);
        sum += value;
    }

    return sum;
};

const numbers = [5, 10, 15, 20];
const strings = ['3', '7', '10'];

console.log('Sum of numbers:', addArrayElements(numbers));
console.log('Sum of strings:', addArrayElements(strings));
