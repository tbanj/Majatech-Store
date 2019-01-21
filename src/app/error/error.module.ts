import { errorRoutes } from './error.routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [NotFoundComponent],
    imports: [CommonModule,
    RouterModule.forChild(errorRoutes),
    ]
})
export class ErrorModule {}

