let counter = 0;

async function incrementCounter() {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
    const localValue = counter;
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 500));
    counter = localValue + 1;
    console.log(`Incremented counter: ${counter}`);

    return counter;
}

async function simulateRaceCondition() {
    console.log('Initial counter:', counter);
    const task1 = incrementCounter();
    const task2 = incrementCounter();
    const task3 = incrementCounter();
    const task4 = incrementCounter();

    await Promise.all([task1, task2, task3, task4]);

    console.log('Final counter value:', counter);
}

simulateRaceCondition();
