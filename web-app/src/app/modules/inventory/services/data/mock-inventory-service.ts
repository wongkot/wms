import { inject, Injectable } from '@angular/core';
import { Pagination } from '@app/core/models/pagination';
import { InMemoryDbService } from '@app/core/services/data/in-memory-db-service';
import { Inventory } from '@app/modules/inventory/models/inventory';
import { InventoryMoveAreaOperation } from '@app/modules/inventory/models/inventory-move-area-operation';
import { InventoryOperation } from '@app/modules/inventory/models/inventory-operation';
import { InventoryProduct } from '@app/modules/inventory/models/inventory-product';
import { InventoryService } from '@app/modules/inventory/services/data/inventory-service';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockInventoryService implements InventoryService {
  private _inMemoryDbService = inject(InMemoryDbService);

  getInventoryProducts(page: number, pageSize: number, query: string, category: string, sort: string): Observable<Pagination<InventoryProduct>> {
    return of(this._inMemoryDbService.getPageInventoryProducts(page, pageSize, query, category, sort));
  }

  getInventoryProductById(productId: number, sort: string): Observable<InventoryProduct | null> {
    return of(this._inMemoryDbService.getInventoryProductById(productId, sort));
  }

  inventoryInbound(input: InventoryOperation): Observable<Inventory> {
    try {
      return of(this._inMemoryDbService.inventoryInbound(input));
    } catch (error) {
      return throwError(() => error);
    }
  }

  inventoryOutbound(input: InventoryOperation): Observable<Inventory> {
    try {
      return of(this._inMemoryDbService.inventoryOutbound(input));
    } catch (error) {
      return throwError(() => error);
    }
  }

  inventoryAdjustment(input: InventoryOperation): Observable<Inventory> {
    try {
      return of(this._inMemoryDbService.inventoryAdjustment(input));
    } catch (error) {
      return throwError(() => error);
    }
  }

  inventoryMoveArea(input: InventoryMoveAreaOperation): Observable<Inventory> {
    try {
      return of(this._inMemoryDbService.inventoryMoveArea(input));
    } catch (error) {
      return throwError(() => error);
    }
  }
}
