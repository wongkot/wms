import { ApplicationRef, createComponent, DOCUMENT, inject, Injectable, RendererFactory2 } from '@angular/core';
import { MessageDialogComponent } from '@app/shared/message-dialog/components/message-dialog-component/message-dialog-component';
import { DialogResult } from '@app/shared/message-dialog/enums/dialog-result';
import { DialogType } from '@app/shared/message-dialog/enums/dialog-type';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MessageDialogService {
  private _appRef = inject(ApplicationRef);
  private document = inject(DOCUMENT);
  private _dialogNotifier?: Subject<DialogResult>;
  private _rendererFactory = inject(RendererFactory2);
  private _renderer = this._rendererFactory.createRenderer(null, null);

  showInfo(title: string, message: string) {
    return this.show({
      title: title,
      message: message,
      type: DialogType.Info,
      showOkButton: true,
      showCancelButton: false,
      dismissable: true,
    });
  }

  showSuccess(title: string, message: string) {
    return this.show({
      title: title,
      message: message,
      type: DialogType.Success,
      showOkButton: true,
      showCancelButton: false,
      dismissable: true,
    });
  }

  showWarning(title: string, message: string) {
    return this.show({
      title: title,
      message: message,
      type: DialogType.Warning,
      showOkButton: true,
      showCancelButton: true,
      dismissable: true,
    });
  }

  showError(title: string, message: string) {
    return this.show({
      title: title,
      message: message,
      type: DialogType.Error,
      showOkButton: true,
      showCancelButton: true,
      dismissable: true,
    });
  }

  show(options?: { title: string, message: string, type: DialogType, showOkButton: boolean, showCancelButton: boolean, dismissable: boolean }): Observable<DialogResult> {
    const componentRef = createComponent(MessageDialogComponent, {
      environmentInjector: this._appRef.injector,
    });

    componentRef.instance.title.set(options?.title ?? 'Title');
    componentRef.instance.message.set(options?.message ?? 'Message');
    componentRef.instance.type.set(options?.type ?? DialogType.Info);
    componentRef.instance.showOkButton.set(options?.showOkButton == undefined || options?.showOkButton == null ? true : options.showOkButton);
    componentRef.instance.showCancelButton.set(options?.showCancelButton == undefined || options?.showCancelButton == null ? true : options.showCancelButton);
    componentRef.instance.dismissable.set(options?.dismissable == undefined || options?.dismissable == null ? true : options.dismissable);

    // Attach component to the root view (so Angular able to run change detection for this component)
    this._appRef.attachView(componentRef.hostView);

    // Add this component to DOM
    this.document.body.appendChild(componentRef.location.nativeElement);

    // Prevent scrolling when dialog is open
    this._renderer.addClass(this.document.body, 'overflow-hidden');

    // Remove the component after the dialog has been closed
    componentRef.instance.close.subscribe((result) => {
      this.closeDialog(result);
    });

    this._dialogNotifier = new Subject();

    return this._dialogNotifier.asObservable();
  }

  closeDialog(result: DialogResult) {
    // Enable scrolling when dialog is closed
    this._renderer.removeClass(this.document.body, 'overflow-hidden');
    this._dialogNotifier?.next(result);
    this._dialogNotifier?.complete();
  }
}
