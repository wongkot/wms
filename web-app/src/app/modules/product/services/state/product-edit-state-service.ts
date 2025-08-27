import { inject, Injectable, signal } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { EditProduct } from '@app/modules/product/models/edit-product';
import { Product } from '@app/modules/product/models/product';
import { MockProductService } from '@app/modules/product/services/data/mock-product-service';
import { ProductService } from '@app/modules/product/services/data/product-service';
import { debounceTime, distinctUntilChanged, finalize, first, map, of, Subject, switchMap } from 'rxjs';

@Injectable()
export class ProductEditStateService {
  private _isSubmitting = signal<boolean>(false);
  private _isFetchingData = signal<boolean>(false);
  private _errorMessage = signal<string>('');
  private _initialImageUrl = signal<string>('');
  private _productService: ProductService = inject(MockProductService);
  private _productLoadSuccess = new Subject<Product>();
  private _editSuccess = new Subject<void>();
  private _editFailed = new Subject<string>();
  public readonly productLoadSucess$ = this._productLoadSuccess.asObservable();
  public readonly editSuccess$ = this._editSuccess.asObservable();
  public readonly editFailed$ = this._editFailed.asObservable();

  get isSubmitting() {
    return this._isSubmitting.asReadonly();
  }

  get isFetchingData() {
    return this._isFetchingData.asReadonly();
  }

  get errorMessage() {
    return this._errorMessage.asReadonly();
  }

  get initialImageUrl() {
    return this._initialImageUrl.asReadonly();
  }

  loadProductInfo(productId: number): void {
    this._isFetchingData.set(true);
    this._productService.getProductById(productId).pipe(
      finalize(() => this._isFetchingData.set(false))
    )
      .subscribe({
        next: (product) => {
          if (product) {
            this._initialImageUrl.set(product.imageUrl ?? '');
            this._productLoadSuccess.next(product);
          } else {
            this._errorMessage.set(`Unable to find product with id (${productId})`);
          }
        }
      })
  }

  editProduct(input: EditProduct): void {
    this._isSubmitting.set(true);
    this._productService.updateProduct(input).pipe(
      finalize(() => {
        this._isSubmitting.set(false);
      }),
    )
      .subscribe({
        next: () => {
          this._editSuccess.next();
        },
        error: (error: Error) => {
          this._editFailed.next(error.message);
        }
      });
  }

  isProductNameExistsValidator(productId: number): AsyncValidatorFn {
    return control => {
      // Add this check condition to prevent form stuck at pending status
      // Ref: https://stackoverflow.com/questions/72170790/angular-formcontrol-with-async-validator-stays-in-pending-status
      if (!control.valueChanges || control.pristine) {
        return of(null);
      }
      return control.valueChanges
        .pipe(
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(value => this._productService.hasProductNameFromOtherId(value, productId)),
          map((nameExists: boolean) => (nameExists ? { 'nameExists': true } : null)),
          first()); // Make observable finite
    }
  }
}
