import { inject, Injectable } from '@angular/core';
import { InMemoryDbService } from '@app/core/services/data/in-memory-db-service';
import { InventoryDashboardApiOutput } from '@app/modules/dashboard/models/inventory-dashboard-api-output';
import { DashboardService } from '@app/modules/dashboard/services/data/dashboard-service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDashboardService implements DashboardService {
  private readonly _inMemoryDbService = inject(InMemoryDbService);

  public getDashboardData(): Observable<InventoryDashboardApiOutput> {
    return of(this._inMemoryDbService.getDashboardData());
  }
}
