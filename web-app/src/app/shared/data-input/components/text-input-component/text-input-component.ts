import { AfterViewInit, Component, effect, input, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DEFAULT_MAX_CHARS, MESSAGES } from '@app/core/constants/app';

@Component({
  selector: 'app-text-input',
  standalone: false,
  templateUrl: './text-input-component.html',
  styleUrl: './text-input-component.css',
})
export class TextInputComponent implements AfterViewInit {
  public fieldName = input<string>('');
  public required = input<boolean>(false);
  public inputControl = input.required<FormControl>();
  public showCharacterHint = input<boolean>(false);
  public maxCharacters = input<number>(DEFAULT_MAX_CHARS);
  public textPlaceHolder = input<string>('');
  public customErrorMessages = input<Map<string, string>>(new Map<string, string>());
  public tooltipMessage = input<string>('');
  public autocompleteOptions = input<string[]>([]);
  public readonly errorMessages = new Map<string, string>([
    ['required', MESSAGES.INPUT_REQUIRED],
  ]);
  private readonly _isFocused = signal<boolean>(false);
  private readonly _currentFocusedItemIndex = signal<number>(-1);

  public get isFocused() {
    return this._isFocused.asReadonly();
  }

  public get currentFocusedItemIndex() {
    return this._currentFocusedItemIndex.asReadonly();
  }

  constructor() {
    effect(() => {
      this.autocompleteOptions();
      this._currentFocusedItemIndex.set(-1);
    });
  }

  public ngAfterViewInit(): void {
    this.customErrorMessages().forEach((value, key) => {
      this.errorMessages.set(key, value);
    });
  }

  public onFocus(): void {
    this._isFocused.set(true);
  }

  public onLostFocus(): void {
    this._isFocused.set(false);
    this._currentFocusedItemIndex.set(-1);
  }

  public onKeydown(event: KeyboardEvent): void {
    if (this.autocompleteOptions().length <= 0) {
      return;
    }

    if (event.key == 'ArrowDown') {
      let currentIndex = this._currentFocusedItemIndex();
      currentIndex++;
      this._currentFocusedItemIndex.set(currentIndex > this.autocompleteOptions().length - 1 ? 0 : currentIndex);
    } else if (event.key == 'ArrowUp') {
      let currentIndex = this._currentFocusedItemIndex();
      currentIndex--;
      this._currentFocusedItemIndex.set(currentIndex < 0 ? this.autocompleteOptions().length - 1 : currentIndex);
    } else if (event.key == 'Enter') {
      event.preventDefault(); // Prevent from submitting the form
      if (this._currentFocusedItemIndex() >= 0 && this._currentFocusedItemIndex() < this.autocompleteOptions().length) {
        const selectedItem = this.autocompleteOptions().at(this._currentFocusedItemIndex());
        this.inputControl().setValue(selectedItem);
        this._isFocused.set(false);
      }
    } else if (event.key == 'Tab') {
      if (this._currentFocusedItemIndex() >= 0 && this._currentFocusedItemIndex() < this.autocompleteOptions().length) {
        const selectedItem = this.autocompleteOptions().at(this._currentFocusedItemIndex());
        this.inputControl().setValue(selectedItem);
        this._isFocused.set(false);
      }
    } else if (event.key == 'Escape') {
      this._isFocused.set(false);
    } else if (!this._isFocused()) {
      this._isFocused.set(true);
    }
  }

  public onAutocompleteItemClick(item: string): void {
    this.inputControl().setValue(item);
  }
}
