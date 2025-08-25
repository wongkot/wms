import { KeyValue } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProduct } from '@app/modules/product/models/edit-product';
import { MockProductService } from '@app/modules/product/services/data/mock-product-service';
import { ProductService } from '@app/modules/product/services/data/product-service';
import { BreadcrumbSection } from '@app/shared/breadcrumb/model/breadcrumb-section';
import { ToastService } from '@app/shared/toast/services/toast-service';
import { finalize, debounceTime, distinctUntilChanged, switchMap, map, first, delay, take, of } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit-page.html',
  styleUrl: './product-edit-page.css'
})
export class ProductEditPage implements OnInit {
  public readonly breadcrumbSections: BreadcrumbSection[] = [
    { navigationUrl: '../..', name: 'Product' },
    { navigationUrl: '', name: 'Edit Product' },
  ];
  public readonly productCategories: KeyValue<string, string>[] = [
    { key: 'Smart Watches', value: 'Smart Watches' },
    { key: 'PC', value: 'PC' },
    { key: 'Smart Phones', value: 'Smart Phones' },
  ];
  readonly customProductNameErrorMessages = new Map<string, string>([
    [ 'nameExists', 'This product name is already taken' ],
  ]);
  readonly customCategoryErrorMessages = new Map<string, string>([
    [ 'required', 'Please select product category' ],
  ]);
  public editProductForm: FormGroup;
  private _productId!: number;
  private _isSubmitting = signal<boolean>(false);
  private _isFetchingData = signal<boolean>(false);
  private _errorMessage = signal<string>('');
  private _initialImageUrl = signal<string>('');
  private _fb = inject(FormBuilder);
  private _productService: ProductService = inject(MockProductService);
  private _routerService = inject(Router);
  private _route = inject(ActivatedRoute);
  private _toastService = inject(ToastService);

  constructor() {
		this.editProductForm = this._fb.group({
			name: new FormControl('', Validators.required, this.isProductNameExistsValidator()),
			category: new FormControl('', Validators.required),
			description: new FormControl(''),
			unitPrice: new FormControl('', [Validators.required]),
			reorderThreshold: new FormControl(''),
			imageUrl: new FormControl(''),
		});
	}

  ngOnInit(): void {
    this._productId = Number(this._route.snapshot.paramMap.get('id'));
    this.loadProductInfo(this._productId);
  }

  private loadProductInfo(productId: number) {
    this._isFetchingData.set(true);
    this._productService.getProductById(productId).pipe(
      finalize(() => this._isFetchingData.set(false))
    )
    .subscribe({
      next: (product) => {
        if (product) {
          this._initialImageUrl.set(product.imageUrl ?? '');
          this.editProductForm.setValue({
            name: product.name,
			      category: product.category,
			      description: product.description,
			      unitPrice: product.unitPrice,
			      reorderThreshold: product.reorderThreshold ?? null,
			      imageUrl: product.imageUrl,
          });
        } else {
          this._errorMessage.set(`Unable to find product with id (${productId})`);
        }
      }
    })
  }

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

  getFormControl(formControlName: string): FormControl {
    return this.editProductForm.get(formControlName) as FormControl;
  }

  onProductImageUrlChange(newImageUrl: string) {
    this.editProductForm.get('imageUrl')?.setValue(newImageUrl);
  }

  onGoBack() {
    this._routerService.navigate(['product']);
  }

  onSubmit(): void {
    if (this.editProductForm.invalid || this.editProductForm.pending) {
      this.editProductForm.markAllAsTouched();
      return;
    }

    const editProduct: EditProduct = {
      id: this._productId,
      name: this.editProductForm.get('name')?.value,
      category: this.editProductForm.get('category')?.value,
      description: this.editProductForm.get('description')?.value,
      unitPrice: this.editProductForm.get('unitPrice')?.value,
      reorderThreshold: this.editProductForm.get('reorderThreshold')?.value,
      imageUrl: this.editProductForm.get('imageUrl')?.value,
    }
    
    this._isSubmitting.set(true);
    this._productService.updateProduct(editProduct).pipe(
      finalize(() => {
        this._isSubmitting.set(false);
      }),
    )
    .subscribe({
      next: () => {
        this._toastService.showSuccess('Product has been updated');
        this._routerService.navigate(['product']);
      },
      error: (error: Error) => {
        this._toastService.showError(error.message);
      }
    });
  }

  isProductNameExistsValidator(): AsyncValidatorFn {
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
        switchMap(value => this._productService.hasProductNameFromOtherId(value, this._productId)),
        map((nameExists: boolean) => (nameExists ? {'nameExists': true} : null)),
        first()); // Make observable finite
      }
  }
}
