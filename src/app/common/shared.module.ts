import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CartComponent } from './../cart/cart.component';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        ModalModule.forRoot(),
        HttpClientModule,
        NgbModule],

    exports: [CartComponent]
})
export class SharedModule {}
