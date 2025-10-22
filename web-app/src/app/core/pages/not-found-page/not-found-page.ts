import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: false,
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.css'
})
export class NotFoundPage {
  private readonly _routerService = inject(Router);

  public onGoToHomepage(): void {
    this._routerService.navigate(['']);
  }
}
