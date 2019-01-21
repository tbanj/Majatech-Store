import { UserDataService } from './../user-data.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from './../../authenticate/authenticate.service';

import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { ProductFireService } from './../../common/service/productfire.service';
import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';

import * as loginVerif from './../../../assets/js/main';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'firebase';
import { Users } from '../../common/models/users.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})


export class SigninComponent implements OnInit, OnDestroy {

loginjs: any;
loginCheck: any;
SignlogCheck: string;
signUpCheck = false;
signUpCheckM = false;
forgetLogCheck = false;
id: any;

commentsignupcheck: string;
commentSuccessSignup: boolean;
commentSignup: boolean;
nameUserText: string;
nameUserSuccess = false;
commentSuccesssignupcheck: string;

userAdd: Users;
signinForm = this.fb.group({
  email: ['', [Validators.required, Validators.email], this.forbiddenEmails],
  password: ['', [Validators.required, ]],

});
// Minimum eight characters, at least one letter, one number and one special character:
//  (?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$
signupForm = this.fb.group({
  emailNew: ['', [Validators.required, Validators.email], this.forbiddenEmails],
  firstNameNew: ['',  Validators.required],
  lastNameNew: ['', Validators.required],
  passwordNew: ['', [Validators.required,
    Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]],
  invitationCodeNew: [''],

});

urlCheckSignup: Subscription;
urlCheckSigninSub: Subscription;
loginSubscription: Subscription;
signupSubscription: Subscription;
  constructor(private _productFireService: ProductFireService, private _router: Router,
    private _activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private _user: UserService, private _userDataService: UserDataService,
    private _authenticateService: AuthenticateService,
     private _toastr: ToastrService) { }

  ngOnInit() {

    // this.id = 'signin';


    this._productFireService.urlCheckCarousel.next(this.loginCheck);

    if (this._authenticateService.token !== null) {

      this._router.navigate(['/']);
  }  else if (this._authenticateService.token === null) {
    this.loginCheck = true;

    this.SignlogCheck = 'signin';
      this._productFireService.urlCheckCarousel.next(this.SignlogCheck);

  }
    this.urlCheckSigninSub = this._productFireService.urlCheckSignin.subscribe(
      (signin: any) => {

        this.signinCheck();
      }
    );

    // urlCheckSignup
    this.urlCheckSignup = this._productFireService.urlCheckSignup.subscribe(
      (signup: any) => {
        this.signupCheck();
      }
    );


    // signin
    this.loginSubscription = this._authenticateService.errorMessageSignin.subscribe(
      (signCheck: string) => {
          this.commentSuccessSignup = false;
          this.commentSignup = false;
        if (signCheck === 'auth/wrong-password') {
          this.signinForm.setErrors({notUnique: true});
          this.nameUserText = 'incorrect email or password inputted';
          // this._toastr.error(this.nameUserText);
      } if ( signCheck === 'correct') {
          this.nameUserSuccess = true;
          this._toastr.success('login successful');
        this.signinForm.reset();
      }
      }
    );


    // signup
    this.signupSubscription = this._authenticateService.errorMessageRegister.subscribe(
      (signUpCheck: string) => {
        if (signUpCheck === 'error') {

          // this.commentSignup = true;
          this.commentSignup = true;
          this.commentsignupcheck = 'This email has been made use by another user';
          this.signupForm.setErrors({invalid: true});
          this._toastr.warning(this.commentsignupcheck);
      }
      if (signUpCheck === 'success') {
          this.commentSuccessSignup = true;
        this.commentSuccesssignupcheck = 'Account created successfully, click the login button ';
        this._toastr.success(this.commentSuccesssignupcheck);
        this.signupForm.reset();
      }
      }

    );

  }


    signupCheck() {
      this.signUpCheckM = true;
      this.loginCheck = false;
      this.forgetLogCheck = false;

    }


    signinCheck() {
      this.signUpCheckM = false;
      this.loginCheck = true;
      this.forgetLogCheck = false;
      // this.signUpCheck = true;
    }

    forgetLoginCheck() {
      // this.id = 'forgetpass';
      this.signUpCheckM = false;
      this.loginCheck = false;
      this.forgetLogCheck = true;

    }


    onSignUp() {
      // console.log(this.signupForm);
      // this._user.setUsers(this.signupForm);
      // this.userAdd.email = this.signupForm.value.emailNew;

      // this add user complete bio-data to database
      this.userAdd = new Users(this.signupForm.value.firstNameNew, this.signupForm.value.lastNameNew,
        this.signupForm.value.emailNew, this.signupForm.value.invitationCodeNew);
        this._user.addUser(this.userAdd);

        // authenticate user signup
        const email = this.signupForm.value.emailNew;
        const password = this.signupForm.value.passwordNew;
        this._authenticateService.signupUser(email, password);

        // to store user data
        this._userDataService.storeUsers()
        .subscribe(
            (response: Response) => {
            // console.log(response);
        },
        (error) => {
          // console.log(error);

        }

         );
        // console.log(this._user.getUsers());
      this.signupForm.reset();
    }

    onSignIn() {
       // authenticate user signup
      const email = this.signinForm.value.email;
      const password = this.signinForm.value.password;
      this._authenticateService.signinUser(email, password);
    }

    // validator for email input to reject a particular email
    forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
      const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            resolve({'emailIsForbidden': true});

          } else {
            resolve(null);
          }
        }, 1500);

      });
      return promise;
    }

    ngOnDestroy() {
      this.urlCheckSignup.unsubscribe();
      this.urlCheckSigninSub.unsubscribe();
      this.loginSubscription.unsubscribe();
      this.signupSubscription.unsubscribe();
  }
}
