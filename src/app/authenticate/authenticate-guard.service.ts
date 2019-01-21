import { AuthenticateService, } from './authenticate.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import * as firebase from 'firebase';

@Injectable()
export class AuthenticateGuard implements CanActivate {
    loginState: boolean;
    // checkerSignin = new Subject<Boolean>();

    constructor (private authService: AuthenticateService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.authService.isAuthenticated();
    }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     firebase.auth().onAuthStateChanged(user => {
    //         if (user) {
    //         //   this.loginState = true;
    //           this.authService.isAuthenticated();
    //           this.checkerSignin.next(true);
    //           return true;
    //         }
    //         else {

    //         //   this.router.navigate(['/']);
    //         //   this.loginState = false;
    //         //   this.authService.emal = null;
    //           this.authService.isNotAuthenticated();
    //           this.checkerSignin.next(false);
    //           return false;
    //         }
    //       });

    //     //   this.router.navigate(['/']);
    //       return true;
    // }
}
