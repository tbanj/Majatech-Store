import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { ProductComponent } from './product.component';
import { Routes } from '@angular/router';


export const productsRoutes: Routes = [
    // for route that will be changing make use ':id' to accomodate it
    {path: 'products', component: ProductComponent},
    // {path: 'forget-password', component: ForgetPasswordComponent}
    {path: 'product-summary', component: ProductSummaryComponent}

];


