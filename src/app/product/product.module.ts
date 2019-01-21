import { AuthenticateService } from './../authenticate/authenticate.service';
import { AuthenticateGuard } from './../authenticate/authenticate-guard.service';
import { productsRoutes } from './product-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
@NgModule({
    declarations: [ProductComponent, ProductSummaryComponent],
    imports: [RouterModule.forChild(productsRoutes),
    CommonModule, FormsModule,
    NgbModule],
    exports: [],
    providers: [AuthenticateGuard]
})
export class ProductModule {}
