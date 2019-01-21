
import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
export const errorRoutes: Routes = [
    {path: 'not-found', component: NotFoundComponent, data: {message: 'Page not found'}},
      {path: '**', redirectTo: '/not-found'},
];

