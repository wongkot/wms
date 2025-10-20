import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangePickerComponent } from '@app/shared/date-picker/components/date-range-picker-component/date-range-picker-component';

@NgModule({
  declarations: [
    DateRangePickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateRangePickerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DatePickerModule { }
