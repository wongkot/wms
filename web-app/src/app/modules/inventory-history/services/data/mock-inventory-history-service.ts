import { inject, Injectable } from '@angular/core';
import { Pagination } from '@app/core/models/pagination';
import { InMemoryDbService } from '@app/core/services/data/in-memory-db-service';
import { InventoryHistory } from '@app/modules/inventory-history/models/inventory-history';
import { InventoryHistoryService } from '@app/modules/inventory-history/services/data/inventory-history-service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockInventoryHistoryService implements InventoryHistoryService {
  private _inMemoryDbService = inject(InMemoryDbService);

  getInventoryHistories(page: number, pageSize: number, query: string, operationType: number | null, startDate: string, endDate: string, sort: string): Observable<Pagination<InventoryHistory>> {
    return of(this._inMemoryDbService.getPageInventoryHistories(page, pageSize, query, operationType, startDate, endDate, sort));
  }

  getRecentInventoryHistories(limit: number): Observable<InventoryHistory[]> {
    return of(this._inMemoryDbService.getRecentInventoryHistories(limit));
  }
}
