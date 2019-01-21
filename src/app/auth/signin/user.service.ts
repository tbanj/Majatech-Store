import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Users } from './../../common/models/users.model';

@Injectable()
export class UserService {
private users: Users[] = [];
userChanged = new Subject<Users[]>();

    setUsers(users: Users[]) {
    this.users = users;
    this.userChanged.next(users);
    }
    getUsers() {
        return this.users.slice();
    }

    getUser(index: number) {
        return this.users[index];
    }

    addUser(user: Users) {
       this.users.push(user);
       this.userChanged.next(this.users.slice());
    }
}
