
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', loadChildren: './product/product.module#ProductModule'},
      { path: '', loadChildren: './auth/auth.module#AuthModule'},
      { path: '', loadChildren: './terms/terms.module#TermsModule'},
      { path: '', loadChildren: './error/error.module#ErrorModule'},

  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
