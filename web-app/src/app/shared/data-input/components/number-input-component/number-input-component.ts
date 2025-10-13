import { AfterViewInit, Component, computed, effect, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DEFAULT_MAX_NUMBER, DEFAULT_MIN_NUMBER, MESSAGES } from '@app/core/constants/app';

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
  minValue = input<number>(DEFAULT_MIN_NUMBER);
  maxValue = input<number>(DEFAULT_MAX_NUMBER);
  textPlaceHolder = input<string>('');
  customErrorMessages = input<Map<string, string>>(new Map<string, string>());
  tooltipMessage = input<string>('');

  readonly errorMessages = new Map<string, string>([
    [ 'required', MESSAGES.INPUT_REQUIRED ],
  ]);
  private maxLength = computed(() => {
    return this.maxValue().toString().length;
  });

  constructor() {
    effect(() => {
      this.errorMessages.set('min', MESSAGES.INVALID_NUMBER_RANGE(this.minValue(), this.maxValue()));
      this.errorMessages.set('max', MESSAGES.INVALID_NUMBER_RANGE(this.minValue(), this.maxValue()));
    });
  }

  ngAfterViewInit(): void {
    this.customErrorMessages().forEach((value, key) => {
      this.errorMessages.set(key, value);
    });
  }

  onInputChange() {
    const currentValue = Number(this.inputControl().value);
    const currentLength = currentValue.toString().length;

    if (currentLength > this.maxLength()) {
      this.inputControl().setValue(Number(currentValue.toString().slice(0, this.maxLength())));
    }
  }
}
