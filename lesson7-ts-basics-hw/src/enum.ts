export enum Direction {
    Up,
    Down,
    Left = 'LEFT',
    Right = 'RIGHT'
}

console.log(Direction.Up, Direction.Down, Direction.Left, Direction.Right);
console.log(Direction[1]);

const testContext: Partial<Record<Direction, unknown>> = {};

testContext[Direction.Right] = { a: 1, b: 2 };
testContext['LEFT' as Direction] = { direction: 'left' };

console.log(testContext.RIGHT, testContext.LEFT);
