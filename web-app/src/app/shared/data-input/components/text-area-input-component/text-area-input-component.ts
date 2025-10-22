import { AfterViewInit, Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DEFAULT_MAX_CHARS, MESSAGES } from '@app/core/constants/app';

@Component({
  selector: 'app-text-area-input',
  standalone: false,
  templateUrl: './text-area-input-component.html',
  styleUrl: './text-area-input-component.css'
})
export class TextAreaInputComponent implements AfterViewInit {
  public readonly fieldName = input<string>('');
  public readonly required = input<boolean>(false);
  public readonly inputControl = input.required<FormControl>();
  public readonly showCharacterHint = input<boolean>(false);
  public readonly maxCharacters = input<number>(DEFAULT_MAX_CHARS);
  public readonly textPlaceHolder = input<string>('');
  public readonly customErrorMessages = input<Map<string, string>>(new Map<string, string>());
  public readonly tooltipMessage = input<string>('');
  public readonly errorMessages = new Map<string, string>([
    ['required', MESSAGES.INPUT_REQUIRED],
  ]);

  public ngAfterViewInit(): void {
    this.customErrorMessages().forEach((value, key) => {
      this.errorMessages.set(key, value);
    });
  }
}
