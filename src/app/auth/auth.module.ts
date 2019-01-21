import { UserDataService } from './user-data.service';
import { UserService } from './signin/user.service';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routing.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
@NgModule({
    declarations: [
        SigninComponent,
        ForgetPasswordComponent
    ],
    imports: [FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(authRoutes),
        CommonModule],
    exports: [],
    providers: [UserService, UserDataService]
})
export class AuthModule {
}
