import { AfterViewInit, Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DEFAULT_MAX_CHARS, MESSAGES } from '@app/core/constants/app';

@Component({
  selector: 'app-text-area-input',
  standalone: false,
  templateUrl: './text-area-input-component.html',
  styleUrl: './text-area-input-component.css'
})
export class TextAreaInputComponent implements AfterViewInit{
  fieldName = input<string>('');
  required = input<boolean>(false);
  inputControl = input.required<FormControl>();
  showCharacterHint = input<boolean>(false);
  maxCharacters = input<number>(DEFAULT_MAX_CHARS);
  textPlaceHolder = input<string>('');
  customErrorMessages = input<Map<string, string>>(new Map<string, string>());
  tooltipMessage = input<string>('');

  readonly errorMessages = new Map<string, string>([
    [ 'required', MESSAGES.INPUT_REQUIRED ],
  ]);

  ngAfterViewInit(): void {
    this.customErrorMessages().forEach((value, key) => {
      this.errorMessages.set(key, value);
    });
  }
}
