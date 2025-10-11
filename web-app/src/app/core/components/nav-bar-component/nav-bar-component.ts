import { Component } from '@angular/core';
import { NavBarMenuItem } from '@app/core/models/nav-bar-menu-item';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.css'
})
export class NavBarComponent {
  readonly navBarMenuItems: NavBarMenuItem[] = [
    {
      name: 'Dashboard',
      url: '',
      matchExactUrl: true,
    },
    {
      name: 'Product',
      url: 'product',
      matchExactUrl: false,
    },
    {
      name: 'Inventory',
      url: 'inventory',
      matchExactUrl: false,
    },
    {
      name: 'History',
      url: 'history',
      matchExactUrl: false,
    },
  ];
}
