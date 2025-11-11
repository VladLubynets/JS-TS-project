function sendMainRequest() {
    throw new Error('Main service https://broken-api12345.com not available');
}

function sendBackupRequest() {
    return {
        status: 200,
        message: 'Backup service https://jsonplaceholder.typicode.com/posts/1 works fine'
    };
}

function makeRequest() {
    let response;

    try {
        response = sendMainRequest();
    } catch (error) {
        console.log(error.message);
        console.log('Trying backup service...');

        response = sendBackupRequest();

        if (response.status !== 200) {
            throw new Error('Custom Error: Backup service also failed');
        }
    }

    console.log('Final response:', response);
}


makeRequest();
