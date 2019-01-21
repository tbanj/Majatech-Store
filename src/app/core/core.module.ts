import { CurrencyService } from './../common/service/currency.service';
import { AuthenticateService } from './../authenticate/authenticate.service';
import { AuthenticateGuard } from './../authenticate/authenticate-guard.service';
import { ProductFireService } from './../common/service/productfire.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../common/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import {GoTopButtonModule} from 'ng2-go-top-button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from '../common/service/product.service';

@NgModule({
    declarations: [HeaderComponent,
        FooterComponent,
         HomeComponent],

    imports: [FormsModule,
        CommonModule,
        HttpClientModule,
        HttpModule,
       SharedModule,
            AppRoutingModule,
            NgbModule,
            GoTopButtonModule,
            BrowserAnimationsModule,
        ],

    exports: [

        FooterComponent,
        HomeComponent,
        HeaderComponent,
        AppRoutingModule,
        GoTopButtonModule
    ],
     providers: [
        ProductService, ProductFireService, CurrencyService
      ],
})
export class CoreModule {}
