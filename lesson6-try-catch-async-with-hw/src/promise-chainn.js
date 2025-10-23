// fetch('https://jsonplaceholder.typicode.com/todos')
//     .then(response => {
//         console.log(response, response.ok, response.status);
//         return response.json();
//     })
//     .then(json => console.log(json))
//     .catch(e => console.log(e));

function getData() {
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => {
            console.log(response, response.ok, response.status);
            return response.json();
        })
        .then((json) => processData(json))
        .catch((e) => console.log(e));
}

function processData(json) {
    console.log('trying to process our JSON');
    console.log(json);
}

getData();

// const a = getData();
// console.log('----------');
// console.log(a);
