import { inject, Injectable, signal } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { InventoryInboundOperation } from '@app/modules/inventory/models/inventory-inbound-operation';
import { InventoryService } from '@app/modules/inventory/services/data/inventory-service';
import { MockInventoryService } from '@app/modules/inventory/services/data/mock-inventory-service';
import { MockProductService } from '@app/modules/product/services/data/mock-product-service';
import { ProductService } from '@app/modules/product/services/data/product-service';
import { debounceTime, delay, distinctUntilChanged, finalize, first, map, Subject, switchMap } from 'rxjs';

@Injectable()
export class InventoryInboundStateService {
  private _selectedArea = signal<Set<string>>(new Set<string>());
  private _autoCompleteProductName = signal<string[]>([]);
  private _productService: ProductService = inject(MockProductService);
  private _inventoryService: InventoryService = inject(MockInventoryService);
  private _errorMessage = signal<string>('');
  private _isSubmitting = signal<boolean>(false);
  private _operationSuccess = new Subject<void>();
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

  selectArea(area: string | null) {
    this._selectedArea.set(new Set<string>(area ? [ area ] : []));
  }

  getAutocompleteProductNames(searchProductName: string | null) {
    return this._productService.getProductNames(searchProductName ?? '', 5)
      .subscribe((productNames) => {
        this._autoCompleteProductName.set(productNames);
      });
  }

  inventoryInbound(input: InventoryInboundOperation) {
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

  closeErrorMessage() {
    this._errorMessage.set('');
  }

  isProductNameNotExistsValidator(): AsyncValidatorFn {
    return control => control.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(value => this._productService.hasProductName(value)),
        map((nameExists: boolean) => (nameExists ? null : {'nameDoesNotExists': true})),
        first()); // Make observable finite
  }
}
