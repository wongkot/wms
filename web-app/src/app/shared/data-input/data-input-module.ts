import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FileInputComponent } from '@app/shared/data-input/components/file-input-component/file-input-component';
import { NumberInputComponent } from '@app/shared/data-input/components/number-input-component/number-input-component';
import { SelectInputComponent } from '@app/shared/data-input/components/select-input-component/select-input-component';
import { TextAreaInputComponent } from '@app/shared/data-input/components/text-area-input-component/text-area-input-component';
import { TextInputComponent } from '@app/shared/data-input/components/text-input-component/text-input-component';

@NgModule({
  declarations: [
    TextInputComponent,
    SelectInputComponent,
    TextAreaInputComponent,
    NumberInputComponent,
    FileInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    TextInputComponent,
    SelectInputComponent,
    TextAreaInputComponent,
    NumberInputComponent,
    FileInputComponent,
  ]
})
export class DataInputModule { }
