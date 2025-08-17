import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button-icon',
  standalone: false,
  templateUrl: './button-icon-component.html',
  styleUrl: './button-icon-component.css'
})
export class ButtonIconComponent {
  text = input<string>('');
  iconClass = input<string>('');
  onClick = output<void>();
}
