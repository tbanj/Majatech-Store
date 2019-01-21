import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { termsRoute } from './terms.routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
    declarations: [
         TermsOfServiceComponent,
          PrivacyPolicyComponent,
          ContactUsComponent,
          AboutUsComponent
        ],
    imports: [
        CommonModule,
        FormsModule,

        ToastrModule.forRoot(), // ToastrModule added
        RouterModule.forChild(termsRoute),
    ],
})
export class TermsModule {
}
