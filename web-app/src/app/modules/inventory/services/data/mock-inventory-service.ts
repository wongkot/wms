import { inject, Injectable } from '@angular/core';
import { Pagination } from '@app/core/models/pagination';
import { InMemoryDbService } from '@app/core/services/data/in-memory-db-service';
import { Inventory } from '@app/modules/inventory/models/inventory';
import { InventoryInboundOperation } from '@app/modules/inventory/models/inventory-inbound-operation';
import { InventoryMoveAreaOperation } from '@app/modules/inventory/models/inventory-move-area-operation';
import { InventoryOperation } from '@app/modules/inventory/models/inventory-operation';
import { InventoryProduct } from '@app/modules/inventory/models/inventory-product';
import { InventoryService } from '@app/modules/inventory/services/data/inventory-service';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockInventoryService implements InventoryService {
  private readonly _inMemoryDbService = inject(InMemoryDbService);

  public getInventoryProducts(page: number, pageSize: number, query: string, category: string, sort: string): Observable<Pagination<InventoryProduct>> {
    return of(this._inMemoryDbService.getPageInventoryProducts(page, pageSize, query, category, sort));
  }

  public getInventoryProductById(productId: number, sort: string): Observable<InventoryProduct | null> {
    return of(this._inMemoryDbService.getInventoryProductById(productId, sort));
  }

  public inventoryInbound(input: InventoryOperation): Observable<Inventory> {
    try {
      return of(this._inMemoryDbService.inventoryInbound(input));
    } catch (error) {
      return throwError(() => error);
    }
  }

  public inventoryInboundWithProductName(input: InventoryInboundOperation): Observable<Inventory> {
    try {
      return of(this._inMemoryDbService.inventoryInboundWithProductName(input));
    } catch (error) {
      return throwError(() => error);
    }
  }

  public inventoryOutbound(input: InventoryOperation): Observable<Inventory> {
    try {
      return of(this._inMemoryDbService.inventoryOutbound(input));
    } catch (error) {
      return throwError(() => error);
    }
  }

  public inventoryAdjustment(input: InventoryOperation): Observable<Inventory> {
    try {
      return of(this._inMemoryDbService.inventoryAdjustment(input));
    } catch (error) {
      return throwError(() => error);
    }
  }

  public inventoryMoveArea(input: InventoryMoveAreaOperation): Observable<Inventory> {
    try {
      return of(this._inMemoryDbService.inventoryMoveArea(input));
    } catch (error) {
      return throwError(() => error);
    }
  }
}
