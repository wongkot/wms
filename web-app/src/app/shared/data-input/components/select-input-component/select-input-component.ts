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
  public readonly fieldName = input<string>('');
  public readonly required = input<boolean>(false);
  public readonly placeHolder = input<string>('');
  public readonly inputControl = input.required<FormControl>();
  public readonly options = input<KeyValue<string, string>[]>([]);
  public readonly customErrorMessages = input<Map<string, string>>(new Map<string, string>());
  public readonly tooltipMessage = input<string>('');
  public readonly errorMessages = new Map<string, string>([
    ['required', MESSAGES.INPUT_DROPDOWN_REQUIRED],
  ]);

  public ngAfterViewInit(): void {
    this.customErrorMessages().forEach((value, key) => {
      this.errorMessages.set(key, value);
    });
  }
}
