async function getRandomDog() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    processDog(data);
}

function processDog(data) {
    console.log('Random dog image received');
    console.log(data);
    console.log(`Image URL: ${data.message}`);
}

getRandomDog();
