function sendApiRequest(resource) {
    throw new Error(`Error: the 1 program was not able to fetch resource ${resource}`);
}

function sendBackupApiRequest(resource) {
    return {
        resource: resource,
        result: 'success',
        status: 200
    };
}

function sendImprovisedApiRequest() {
    console.log('sending API request...');

    let response;
    try {
        response = sendApiRequest('https://google.com');
    } catch (e) {
        console.log(e.message);
        if (e.message.includes('the program was not able to fetch resource')) {
            response = sendBackupApiRequest('https://backup.google.com');
        } else {
            throw e;
        }
    }

    console.log(response);
}

function initializeTestData() {
    try {
        sendImprovisedApiRequest();
    } catch (e) {
        console.log(e.message);
        console.log('failed to initialize test data');
    }
}

initializeTestData();
initializeTestData();
initializeTestData();
initializeTestData();
