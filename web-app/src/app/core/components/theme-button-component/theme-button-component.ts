import { Component, inject, input } from '@angular/core';
import { ThemeService } from '@app/core/services/state/theme-service';

@Component({
  selector: 'app-theme-button',
  standalone: false,
  templateUrl: './theme-button-component.html',
  styleUrl: './theme-button-component.css'
})
export class ThemeButtonComponent {
  public readonly largeButtonSize = input<boolean>(false);
  public readonly themeService = inject(ThemeService);

  public onChangeTheme(newTheme: string): void {
    this.themeService.setTheme(newTheme);
  }
}
