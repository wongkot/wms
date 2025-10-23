import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BarChartComponent } from '@app/shared/chart/components/bar-chart-component/bar-chart-component';
import { PieChartComponent } from '@app/shared/chart/components/pie-chart-component/pie-chart-component';

@NgModule({
  declarations: [
    BarChartComponent,
    PieChartComponent,
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
  ],
  exports: [
    BarChartComponent,
    PieChartComponent,
  ]
})
export class ChartModule { }
