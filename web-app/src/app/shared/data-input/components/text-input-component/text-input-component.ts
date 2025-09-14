import { AfterViewInit, Component, effect, input, signal } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: false,
  templateUrl: './text-input-component.html',
  styleUrl: './text-input-component.css',
})
export class TextInputComponent implements AfterViewInit {
  fieldName = input<string>('');
  required = input<boolean>(false);
  inputControl = input.required<FormControl>();
  showCharacterHint = input<boolean>(false);
  maxCharacters = input<number>(100);
  textPlaceHolder = input<string>('');
  customErrorMessages = input<Map<string, string>>(new Map<string, string>());
  tooltipMessage = input<string>('');
  autocompleteOptions = input<string[]>([]);
  private _isFocused = signal<boolean>(false);
  private _currentFocusedItemIndex = signal<number>(-1);
  readonly errorMessages = new Map<string, string>([
    [ 'required', 'This field cannot be empty' ],
  ]);

  public get isFocused () {
    return this._isFocused.asReadonly();
  }

  public get currentFocusedItemIndex () {
    return this._currentFocusedItemIndex.asReadonly();
  }

  constructor() {
    effect(() => {
      this.autocompleteOptions();
      this._currentFocusedItemIndex.set(-1);
    });
  }

  ngAfterViewInit(): void {
    this.customErrorMessages().forEach((value, key) => {
      this.errorMessages.set(key, value);
    });
  }

  onFocus() {
    this._isFocused.set(true);
  }

  onLostFocus() {
    this._isFocused.set(false);
    this._currentFocusedItemIndex.set(-1);
  }

  onKeydown(event: KeyboardEvent) {
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

  onAutocompleteItemClick(item: string) {
    this.inputControl().setValue(item);
  }
}
