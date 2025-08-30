import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _show = signal<boolean>(false);
  private _message = signal<string>('');
  private _toastType = signal<string>('alert-success');
  private _startFadeOut = signal<boolean>(false);
  private _fadeTimeOut = 1000; // Match timeout with duration-[millisec] class in template file

  get show() {
    return this._show.asReadonly();
  }
  get toastType() {
    return this._toastType.asReadonly();
  }
  get message() {
    return this._message.asReadonly();
  }
  get startFadeOut() {
    return this._startFadeOut.asReadonly();
  }

  showSuccess(message: string, timeoutMs: number | null = 3000) {
    this.showMessage(message, 'alert-success', timeoutMs);
  }

  showInfo(message: string, timeoutMs: number | null = 3000) {
    this.showMessage(message, 'alert-info', timeoutMs);
  }

  showWarning(message: string, timeoutMs: number | null = 3000) {
    this.showMessage(message, 'alert-warning', timeoutMs);
  }

  showError(message: string, timeoutMs: number | null = 3000) {
    this.showMessage(message, 'alert-error', timeoutMs);
  }

  private showMessage(message: string, toastType: string, timeoutMs: number | null = 3000) {
    if (this._show()) return;

    this._message.set(message);
    this._toastType.set(toastType);
    this._show.set(true);

    if (timeoutMs) {
      // Set timeout for fading animation
      setTimeout(() => {
        this._startFadeOut.set(true);
        this.close();
      }, timeoutMs);
    }
  }

  close() {
    if (!this._startFadeOut()) {
      this._startFadeOut.set(true);
    }

    setTimeout(() => {
      this._startFadeOut.set(false);
      this._message.set('');
      this._show.set(false);
    }, this._fadeTimeOut);
  }
}
