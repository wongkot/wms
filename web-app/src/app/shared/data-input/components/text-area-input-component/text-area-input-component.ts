import { AfterViewInit, Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  maxCharacters = input<number>(100);
  textPlaceHolder = input<string>('');
  customErrorMessages = input<Map<string, string>>(new Map<string, string>());
  tooltipMessage = input<string>('');

  readonly errorMessages = new Map<string, string>([
    [ 'required', 'This field cannot be empty' ],
  ]);

  ngAfterViewInit(): void {
    this.customErrorMessages().forEach((value, key) => {
      this.errorMessages.set(key, value);
    });
  }
}
