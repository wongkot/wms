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
  public readonly title = signal<string>('');
  public readonly message = signal<string>('');
  public readonly showOkButton = signal<boolean>(true);
  public readonly showCancelButton = signal<boolean>(true);
  public readonly dismissable = signal<boolean>(true);
  public readonly isShown = signal<boolean>(true);
  public readonly type = signal<DialogType>(DialogType.Info);
  public readonly buttonClasses = computed<string>(() => {
    switch (this.type()) {
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
  public readonly iconClasses = computed<string>(() => {
    switch (this.type()) {
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
  public readonly close = output<DialogResult>();
  private readonly _elementRef = inject(ElementRef);
  private readonly _animationTime = 200; // Time should match with animation time in css file 

  public onOkClick(): void {
    this.removeElement(() => {
      this.close.emit(DialogResult.OK);
    });
  }

  public onCancelClick(): void {
    this.removeElement(() => {
      this.close.emit(DialogResult.Cancel);
    });
  }

  public onCloseClick(): void {
    this.removeElement(() => {
      this.close.emit(DialogResult.Cancel);
    });
  }

  public removeElement(callback: Function): void {
    this.isShown.set(false);
    setTimeout(() => {
      callback();
      this._elementRef.nativeElement.remove();
    }, this._animationTime);
  }
}
