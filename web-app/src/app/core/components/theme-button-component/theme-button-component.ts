import { Component, inject, input } from '@angular/core';
import { ThemeService } from '@app/core/services/state/theme-service';

@Component({
  selector: 'app-theme-button',
  standalone: false,
  templateUrl: './theme-button-component.html',
  styleUrl: './theme-button-component.css'
})
export class ThemeButtonComponent {
  largeButtonSize = input<boolean>(false);
  themeService = inject(ThemeService);

  onChangeTheme(newTheme: string) {
    this.themeService.setTheme(newTheme);
  }
}
