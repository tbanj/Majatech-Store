import { NgtUniversalModule } from '@ng-toolkit/universal';
import { AuthenticateGuard } from './authenticate/authenticate-guard.service';
import { AuthenticateService } from './authenticate/authenticate.service';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './layout/app.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './common/service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { ModalModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ToastrModule } from 'ngx-toastr';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser , CommonModule} from '@angular/common';
import { ProductFireService } from './common/service/productfire.service';



@NgModule({
  declarations: [
    AppComponent,

    // CartComponent,
  ],
  imports:[
 CommonModule,
NgtUniversalModule,

BrowserModule.withServerTransition({ appId: 'Majatech' }),  // or BrowserModule,
    FormsModule,
    // HttpModule,
    CoreModule,
    HttpClientModule,
    NgbModule,
    AuthenticateModule,
    ToastrModule.forRoot(), // ToastrModule added
    // NgbModule,
    // RouterModule.forRoot([
    //   { path: '', component: HomeComponent },
    //   { path: 'product', component: ProductComponent },
    //   {path: 'not-found', component: NotFoundComponent, data: {message: 'Page not found'}},
    //   {path: '**', redirectTo: '/not-found'},
    // ]),
    // ModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    // ProductService, ProductFireService, DataStorageService
    AuthenticateService, AuthenticateGuard
  ],
})
export class AppModule {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
 }
