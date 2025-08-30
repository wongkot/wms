import { AfterViewInit, Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  standalone: false,
  templateUrl: './number-input-component.html',
  styleUrl: './number-input-component.css'
})
export class NumberInputComponent implements AfterViewInit {
  fieldName = input<string>('');
  required = input<boolean>(false);
  inputControl = input.required<FormControl>();
  minValue = input<number>(1);
  maxValue = input<number>(999);
  textPlaceHolder = input<string>('');
  customErrorMessages = input<Map<string, string>>(new Map<string, string>());
  tooltipMessage = input<string>('');

  readonly errorMessages = new Map<string, string>([
    [ 'required', 'This field cannot be empty' ],
  ]);
  private maxLength = this.maxValue().toString().length;

  ngAfterViewInit(): void {
    this.errorMessages.set('min', `Please enter value between ${this.minValue()} - ${this.maxValue()}`);
    this.errorMessages.set('max', `Please enter value between ${this.minValue()} - ${this.maxValue()}`);

    this.customErrorMessages().forEach((value, key) => {
      this.errorMessages.set(key, value);
    });

    this.maxLength = this.maxValue().toString().length;
  }

  onInputChange() {
    const currentValue = Number(this.inputControl().value);
    const currentLength = currentValue.toString().length;

    if (currentLength > this.maxLength) {
      this.inputControl().setValue(Number(currentValue.toString().slice(0, this.maxLength)));
    }
  }
}
