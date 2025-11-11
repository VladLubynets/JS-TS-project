import { DbService } from './db.service';
import { User } from './user.dto';

export class UserService {
    public constructor(private dbService: DbService) { }

    public async find(id: number): Promise<User> {
        return await this.dbService.find<User>(id);
    }

    public async update(id: number, data: User): Promise<User> {
        return await this.dbService.update<User>(id, data);
    }

    public async findOlder(age: number): Promise<User[]> {
        const users = await this.dbService.selectAll<User>();
        const filteredUsers = users.filter(user => user?.age ? user.age > age : false);

        return filteredUsers;
    }
}
