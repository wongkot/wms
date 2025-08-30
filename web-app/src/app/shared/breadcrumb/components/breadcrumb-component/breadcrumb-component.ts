import { Component, input } from '@angular/core';
import { BreadcrumbSection } from '@app/shared/breadcrumb/model/breadcrumb-section';

@Component({
  selector: 'app-breadcrumb',
  standalone: false,
  templateUrl: './breadcrumb-component.html',
  styleUrl: './breadcrumb-component.css'
})
export class BreadcrumbComponent {
  breadcrumbSections = input.required<BreadcrumbSection[]>();
}
