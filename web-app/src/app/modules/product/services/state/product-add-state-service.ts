import { inject, Injectable, signal } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { AddProduct } from '@app/modules/product/models/add-product';
import { MockProductService } from '@app/modules/product/services/data/mock-product-service';
import { ProductService } from '@app/modules/product/services/data/product-service';
import { debounceTime, distinctUntilChanged, finalize, first, map, Subject, switchMap } from 'rxjs';

@Injectable()
export class ProductAddStateService {
  private _isSubmitting = signal<boolean>(false);
  private _productService: ProductService = inject(MockProductService);
  private _addSuccess = new Subject<void>();
  public readonly addSuccess$ = this._addSuccess.asObservable();

  get isSubmitting() {
    return this._isSubmitting.asReadonly();
  }

  addProduct(input: AddProduct): void {
    this._isSubmitting.set(true);
    this._productService.addProduct(input).pipe(
      finalize(() => {
        this._isSubmitting.set(false);
      }),
    )
    .subscribe({
      next: () => {
        this._addSuccess.next();
      }
    });
  }

  isProductNameExistsValidator(): AsyncValidatorFn {
    return control => control.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(value => this._productService.hasProductName(value)),
        map((nameExists: boolean) => (nameExists ? {'nameExists': true} : null)),
        first()); // Make observable finite
  }
}
