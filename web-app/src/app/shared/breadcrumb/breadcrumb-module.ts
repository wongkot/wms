import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@app/shared/breadcrumb/components/breadcrumb-component/breadcrumb-component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ],
  exports: [
    BreadcrumbComponent,
  ]
})
export class BreadcrumbModule { }
