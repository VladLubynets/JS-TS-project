import { DbService } from 'src/db.service';
import { stubConstructor } from 'ts-sinon';
import { UserService } from '../src/user.service';
import { User } from '../src/user.dto';
import { expect } from 'chai';
import * as sinon from 'ts-sinon';
import { faker } from '@faker-js/faker';

describe('user service', () => {
    let userService: UserService;
    const mockedDbConnection = stubConstructor(DbService);

    beforeEach(() => {
        userService = new UserService(mockedDbConnection);
    });

    afterEach(() => {
        mockedDbConnection.find.reset();
        mockedDbConnection.update.reset();
        mockedDbConnection.selectAll.reset();

        // Restore all spies and stubs
        sinon.default.restore();
    });

    it('find user', async () => {
        const expectedResult: User = {
            id: 1,
            name: 'John',
            age: 20
        };
        mockedDbConnection.find.resolves(expectedResult);

        const user = await userService.find(1);

        expect(user.id).to.equal(1);
        expect(user).to.deep.equal(expectedResult);
    });

    it('find users older than 30', async () => {
        const expectedResult: User[] = [];

        for (let i = 0; i < 10; i++) {
            expectedResult.push({
                id: faker.number.int(),
                name: faker.person.fullName(),
                age: faker.number.int({ min: 0, max: 100 })
            });
        }

        mockedDbConnection.selectAll.resolves(expectedResult);

        const users = await userService.findOlder(30);

        expect(users.every(user => user.age ? user.age > 30 : false)).to.be.true;
        //expect(users).to.have.property(''))
    });

    it('test spy', async () => {
        const dbService = new DbService();
        const spy = sinon.default.spy(dbService, 'update');
        const testUserService = new UserService(dbService);

        await testUserService.update(1, {age: 25} as User);

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(1, {age: 25} as User)).to.be.true;
    });

    it('test spy console.log', async () => {
        const consoleSpy = sinon.default.spy(console, 'log');
        const dbService = new DbService();
        const testUserService = new UserService(dbService);

        const data = {   name: 'Jane Doe' } as User;
        const id = 1;
        await testUserService.update(id, data);

        expect(consoleSpy.calledWith(`updating user with id=${id} with the data ${JSON.stringify(data)}`)).to.be.true;
        consoleSpy.restore();
    });
});
