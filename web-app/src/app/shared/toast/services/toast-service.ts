import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly _show = signal<boolean>(false);
  private readonly _message = signal<string>('');
  private readonly _toastType = signal<string>('alert-success');
  private readonly _startFadeOut = signal<boolean>(false);
  private readonly _fadeTimeOut = 1000; // Match timeout with duration-[millisec] class in template file

  public get show() {
    return this._show.asReadonly();
  }

  public get toastType() {
    return this._toastType.asReadonly();
  }

  public get message() {
    return this._message.asReadonly();
  }

  public get startFadeOut() {
    return this._startFadeOut.asReadonly();
  }

  public showSuccess(message: string, timeoutMs: number | null = 3000): void {
    this.showMessage(message, 'alert-success', timeoutMs);
  }

  public showInfo(message: string, timeoutMs: number | null = 3000): void {
    this.showMessage(message, 'alert-info', timeoutMs);
  }

  public showWarning(message: string, timeoutMs: number | null = 3000): void {
    this.showMessage(message, 'alert-warning', timeoutMs);
  }

  public showError(message: string, timeoutMs: number | null = 3000): void {
    this.showMessage(message, 'alert-error', timeoutMs);
  }

  private showMessage(message: string, toastType: string, timeoutMs: number | null = 3000): void {
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

  public close(): void {
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
