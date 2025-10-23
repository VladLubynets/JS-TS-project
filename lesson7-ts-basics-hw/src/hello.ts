export function hello(param: string): void {
    console.log(`Hello, ${param}`);
}

hello('world');
hello(['str1', 'str2'].join(','));

function calcAdd(a: number | string, b: number | string): number {
    // rule for checking regex if string are from numbers
    const testPassed = hasNumbersAndDecimal(a.toString()) && hasNumbersAndDecimal(b.toString());
    const normalizedA = typeof a === 'string' && testPassed ? parseFloat(a) : a as number;
    const normalizedB = typeof b === 'string' && testPassed ? parseFloat(b) : b as number;
    return normalizedA + normalizedB;
}

function hasNumbersAndDecimal(str: string): boolean {
    return /^\d+(\.\d+)?$/.test(str);
}

const result = calcAdd(1, 2);
const result2 = calcAdd('1', '2');
console.log(result, result2);


(async () => {
    const resp1 = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const resp2 = await fetch('https://api.restful-api.dev/objects');

    async function checkStatus(response: Response): Promise<unknown> {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    }

    async function getResult(): Promise<Record<string, string | number | boolean>> {
        return (await checkStatus(resp1)) as Record<string, string | number | boolean>;
    }

    async function getResult2(): Promise<Record<string, number>> {
        return (await checkStatus(resp2)) as Record<string, number>;
    }

    const json1 = await getResult();
    const json2 = await getResult2();
    console.log(json1, json2);

    async function checkStatusGeneric<T>(response: Response): Promise<T> {
        if (response.ok) {
            return (await response.json()) as T; // JSON.parse(parse) as {a: string, b: number}
        }
        throw new Error(response.statusText);
    }

    const json3 = await checkStatusGeneric<Record<string, string>>(resp1);
    console.log(json3);
})();

// Record<string, string>  ==> {
//     length: 'string',
//     start: number,
//     end: number,
//     1: string //error
// }


// // example for https://www.w3schools.com/html/html_tables.asp table
// Record<string, string>[] ==> [
//     {
//         Company: 'Alfreds Futterkiste',
//         Contact: 'Maria Anders',
//         Country: 'Germany'
//     },
//     {
//         Company: 'Centro comercial Moctezuma',
//         Contact: '...',
//         Country: '...'
//     }
//     ,
//     ...,
//     {}
// ]
