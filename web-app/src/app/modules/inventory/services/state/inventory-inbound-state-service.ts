import { inject, Injectable, signal } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { InventoryInboundOperation } from '@app/modules/inventory/models/inventory-inbound-operation';
import { InventoryService } from '@app/modules/inventory/services/data/inventory-service';
import { MockInventoryService } from '@app/modules/inventory/services/data/mock-inventory-service';
import { MockProductService } from '@app/modules/product/services/data/mock-product-service';
import { ProductService } from '@app/modules/product/services/data/product-service';
import { debounceTime, delay, distinctUntilChanged, finalize, first, map, Subject, Subscription, switchMap } from 'rxjs';

@Injectable()
export class InventoryInboundStateService {
  private readonly _selectedArea = signal<Set<string>>(new Set<string>());
  private readonly _autoCompleteProductName = signal<string[]>([]);
  private readonly _productService: ProductService = inject(MockProductService);
  private readonly _inventoryService: InventoryService = inject(MockInventoryService);
  private readonly _errorMessage = signal<string>('');
  private readonly _isSubmitting = signal<boolean>(false);
  private readonly _operationSuccess = new Subject<void>();
  public readonly operationSuccess$ = this._operationSuccess.asObservable();

  public get selectedArea() {
    return this._selectedArea.asReadonly();
  }

  public get autoCompleteProductName() {
    return this._autoCompleteProductName.asReadonly();
  }

  public get errorMessage() {
    return this._errorMessage.asReadonly();
  }

  public get isSubmitting() {
    return this._isSubmitting.asReadonly();
  }

  public selectArea(area: string | null): void {
    this._selectedArea.set(new Set<string>(area ? [area] : []));
  }

  public getAutocompleteProductNames(searchProductName: string | null): Subscription {
    return this._productService.getProductNames(searchProductName ?? '', 5)
      .subscribe((productNames) => {
        this._autoCompleteProductName.set(productNames);
      });
  }

  public inventoryInbound(input: InventoryInboundOperation): void {
    this._isSubmitting.set(true);
    this._errorMessage.set('');
    this._inventoryService.inventoryInboundWithProductName(input).pipe(
      delay(500),
      finalize(() => this._isSubmitting.set(false))
    ).subscribe({
      next: () => {
        this._operationSuccess.next();
      },
      error: (error: Error) => {
        this._errorMessage.set(error.message);
      }
    });
  }

  public closeErrorMessage(): void {
    this._errorMessage.set('');
  }

  public isProductNameNotExistsValidator(): AsyncValidatorFn {
    return control => control.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(value => this._productService.hasProductName(value)),
        map((nameExists: boolean) => (nameExists ? null : { 'nameDoesNotExists': true })),
        first()); // Make observable finite
  }
}
