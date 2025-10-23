function getRandomDog() {
    return fetch('https://dog.ceo/api/breeds/image/random')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => processDog(data))
        .catch((error) => console.error('Error while fetching dog data:', error));

    function processDog(data) {
        console.log('Random dog image received:');
        console.log(data);
        console.log(`Image URL: ${data.message}`);
    }
}
getRandomDog();
