import { Response } from '@angular/http';
import { AuthenticateService } from './../authenticate/authenticate.service';
import { UserService } from './signin/user.service';
import { Users } from './../common/models/users.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class UserDataService {
    constructor(private http: HttpClient, private _userService: UserService,
        private _authenticateService: AuthenticateService ) {}

    storeUsers() {
        const token = this._authenticateService.getToken();
        const headers = new HttpHeaders({'Content-Type': 'application/json;'});

       return this.http.put('https://mompop-9c94f.firebaseio.com/users.json?auth=' + token,
        this._userService.getUsers()
        , {headers: headers}
    );
    }

    getUsers() {
        // is use get token sent from firebase
        const token = this._authenticateService.getToken();

        if (token != null ) {
            this.http.get('https://mompop-9c94f.firebaseio.com/users.json?auth=' + token)
        .pipe(map((response: Response) => {
            const users: Users[] = response.json();
            for (const user of users) {
                if (!user['invitationCode']) {

                    user['invitationCode'] = '';
                    // console.log(user);
                }
            }
            return users;
         }))
        .subscribe(
            (users: Users[]) => {
                this._userService.setUsers(users);
        } );
        }
    }

}
