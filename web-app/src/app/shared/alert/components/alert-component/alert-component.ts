import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: false,
  templateUrl: './alert-component.html',
  styleUrl: './alert-component.css'
})
export class AlertComponent {
  public readonly message = input<string>();
  public readonly type = input<'info' | 'success' | 'warning' | 'error'>('info');
  public readonly dismissClick = output<void>();
  public readonly alertStyle = computed(() => {
    switch (this.type()) {
      case 'success':
        return 'alert-success';
      case 'warning':
        return 'alert-warning';
      case 'error':
        return 'alert-error';
      case 'info':
      default:
        return 'alert-info';
    }
  });
  public readonly alertButtonStyle = computed(() => {
    switch (this.type()) {
      case 'success':
        return 'btn-success';
      case 'warning':
        return 'btn-warning';
      case 'error':
        return 'btn-error';
      case 'info':
      default:
        return 'btn-info';
    }
  });

  public onDismissClick(): void {
    this.dismissClick.emit();
  }
}
