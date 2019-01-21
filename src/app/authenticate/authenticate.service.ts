import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { Key } from 'protractor';

@Injectable()
export class AuthenticateService {
    token: string;
    emal: string;
    pas: string;


    // is use to send comment to the user
    userActivated = new Subject;
    errorMessageRegister = new Subject;
    errorMessageSignin = new Subject;
    checkU: string;

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {

    }

    signupUser (email: string, password: string) {
        this.emal = email;
        this.pas = password;

        firebase.auth().createUserWithEmailAndPassword(email, password).then(

            (response) => {
                // console.log(response);
                this.router.navigate(['/']);
                this.errorMessageRegister.next('success');

        }
        )
        .catch(
            (error: any) => { console.log(error);

            this.errorMessageRegister.next('error');

                }
        );


    }

    signinUser (email: string, password: string) {
        this.emal = email;
        this.pas = password;
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            (response) => { console.log(response);
                this.router.navigate(['/']);
                this.errorMessageSignin.next('correct');
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).
                then(() => {
                    firebase.auth().currentUser.getIdToken()
                    .then( (token: string) => {
                        this.token = token;
                        if (isPlatformBrowser(this.platformId)) {
                            const item = {key1: 'value1', key2: '1000', key3: token, key4: password, key5: email };

                            sessionStorage.setItem('itemIndex', JSON.stringify(item.key3));
                          }
                    } );


                });
        }

        ).catch(
            (error: any) => {

                this.errorMessageSignin.next('auth/wrong-password');
            }
        );

    }


    // is use store token sent from firebase
    getToken() {
         firebase.auth().currentUser.getIdToken()
        .then( (token: string) => { this.token = token; } );
        return this.token;
    }

    isAuthenticated() {
       this.token = sessionStorage.getItem('itemIndex');
        return this.token != null;
    }
    isNotAuthenticated() {
        return this.token = null;
    }

    logout() {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
        sessionStorage.clear();
        firebase.auth().signOut();
    }
}

