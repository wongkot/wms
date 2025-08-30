import { Component, computed, ElementRef, inject, output, signal } from '@angular/core';
import { DialogResult } from '@app/shared/message-dialog/enums/dialog-result';
import { DialogType } from '@app/shared/message-dialog/enums/dialog-type';

@Component({
  selector: 'app-message-dialog',
  standalone: false,
  templateUrl: './message-dialog-component.html',
  styleUrl: './message-dialog-component.css'
})
export class MessageDialogComponent {
  title = signal<string>('');
  message = signal<string>('');
  showOkButton = signal<boolean>(true);
  showCancelButton = signal<boolean>(true);
  dismissable = signal<boolean>(true);
  isShown = signal<boolean>(true);
  type = signal<DialogType>(DialogType.Info);
  buttonClasses = computed<string>(() => {
    switch(this.type()) {
      case DialogType.Info:
      default:
        return 'btn btn-info';
      case DialogType.Error:
        return 'btn btn-error';
      case DialogType.Success:
        return 'btn btn-success';
      case DialogType.Warning:
        return 'btn btn-warning';
    }
  });
  iconClasses = computed<string>(() => {
    switch(this.type()) {
      case DialogType.Info:
      default:
        return 'bi bi-info-circle-fill text-info mr-2';
      case DialogType.Error:
        return 'bi bi-exclamation-triangle-fill text-error mr-2';
      case DialogType.Success:
        return 'bi bi bi-check-circle-fill text-success mr-2';
      case DialogType.Warning:
        return 'bi bi-exclamation-triangle-fill text-warning mr-2';
    }
  });
  close = output<DialogResult>();
  private _elementRef = inject(ElementRef);
  private _animationTime = 200; // Time should match with animation time in css file 

  onOkClick() {
    this.removeElement(() => {
      this.close.emit(DialogResult.OK);
    });
  }

  onCancelClick() {
    this.removeElement(() => {
      this.close.emit(DialogResult.Cancel);
    });
  }

  onCloseClick() {
    this.removeElement(() => {
      this.close.emit(DialogResult.Cancel);
    });
  }

  removeElement(callback: Function) {
    this.isShown.set(false);
    setTimeout(() => {
      callback();
      this._elementRef.nativeElement.remove();
    }, this._animationTime);
  }
}
