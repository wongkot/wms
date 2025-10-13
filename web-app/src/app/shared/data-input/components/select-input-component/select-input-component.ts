import { KeyValue } from '@angular/common';
import { AfterViewInit, Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MESSAGES } from '@app/core/constants/app';

@Component({
  selector: 'app-select-input',
  standalone: false,
  templateUrl: './select-input-component.html',
  styleUrl: './select-input-component.css'
})
export class SelectInputComponent implements AfterViewInit {
  fieldName = input<string>('');
  required = input<boolean>(false);
  placeHolder = input<string>('');
  inputControl = input.required<FormControl>();
  options = input<KeyValue<string, string>[]>([]);
  customErrorMessages = input<Map<string, string>>(new Map<string, string>());
  tooltipMessage = input<string>('');

  readonly errorMessages = new Map<string, string>([
    [ 'required', MESSAGES.INPUT_DROPDOWN_REQUIRED ],
  ]);
  

  ngAfterViewInit(): void {
    this.customErrorMessages().forEach((value, key) => {
      this.errorMessages.set(key, value);
    });
  }
}
