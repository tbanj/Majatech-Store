import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';

export const authRoutes: Routes = [
    // for route that will be changing make use ':id' to accomodate it
    {path: 's/:id', component: SigninComponent},
    // {path: 'forget-password', component: ForgetPasswordComponent}

];


