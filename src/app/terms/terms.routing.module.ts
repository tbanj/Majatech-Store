import { AuthenticateGuard } from './../authenticate/authenticate-guard.service';
import { AboutUsComponent } from './about-us/about-us.component';

import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

import { Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const termsRoute: Routes = [
    // i cant make use of AuthGuard here do to changes i made to the header components
    { path: 'contact-us', component: ContactUsComponent},
    { path: 'privacy', component: PrivacyPolicyComponent},
    { path: 'terms-of-service', component: TermsOfServiceComponent},
    { path: 'about-us', component: AboutUsComponent},
];
