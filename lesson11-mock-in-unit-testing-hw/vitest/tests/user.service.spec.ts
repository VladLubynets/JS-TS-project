import { describe, it, beforeEach, afterEach, vi, Mocked } from 'vitest';
import { expect } from 'vitest';
import { DbService } from 'src/db.service';
import { UserService } from '../src/user.service';
import { User } from '../src/user.dto';

describe('user service', () => {
    let userService: UserService;
    let mockedDbConnection: Mocked<DbService>;

    beforeEach(() => {
        // Create a mock object with vi.fn() for each method
        mockedDbConnection = {
            find: vi.fn(),
            update: vi.fn(),
            selectAll: vi.fn()
        } as Mocked<DbService>;

        userService = new UserService(mockedDbConnection);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('find user', async () => {
        const expectedResult: User = {
            id: 1,
            name: 'John',
            age: 20
        };

        mockedDbConnection.find.mockResolvedValue(expectedResult);

        const user = await userService.find(1);

        expect(user.id).toBe(1);
        expect(user).toEqual(expectedResult);
    });

    it('find users older than 30', async () => {
        const expectedResult: User[] = [
            {
                id: 1,
                name: 'John',
                age: 20
            },
            {
                id: 2,
                name: 'Jane',
                age: 40
            }
        ];

        mockedDbConnection.selectAll.mockResolvedValue(expectedResult);

        const users = await userService.findOlder(30);

        expect(users.every((user) => (user.age ? user.age > 30 : false))).toBe(true);
    });

    it('test spy', async () => {
        const dbService = new DbService();
        const spy = vi.spyOn(dbService, 'update');
        const testUserService = new UserService(dbService);

        await testUserService.update(1, { age: 25 } as User);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith(1, { age: 25 });
    });

    it('test spy console.log', async () => {
        const consoleSpy = vi.spyOn(console, 'log');
        const dbService = new DbService();
        const testUserService = new UserService(dbService);

        const data = { name: 'Jane Doe' } as User;
        const id = 1;
        await testUserService.update(id, data);

        expect(consoleSpy).toHaveBeenCalledWith(`updating user with id=${id} with the data ${JSON.stringify(data)}`);
    });
});
