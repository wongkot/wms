import { inject, Injectable } from '@angular/core';
import { Pagination } from '@app/core/models/pagination';
import { InMemoryDbService } from '@app/core/services/data/in-memory-db-service';
import { InventoryProduct } from '@app/modules/inventory/models/inventory-product';
import { InventoryService } from '@app/modules/inventory/services/data/inventory-service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockInventoryService implements InventoryService {
  private _inMemoryDbService = inject(InMemoryDbService);

  getInventoryProducts(page: number, pageSize: number, query: string, category: string, sort: string): Observable<Pagination<InventoryProduct>> {
    return of(this._inMemoryDbService.getPageInventoryProducts(page, pageSize, query, category, sort));
  }
}
