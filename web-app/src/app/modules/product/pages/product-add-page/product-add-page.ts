import { KeyValue } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddProduct } from '@app/modules/product/models/add-product';
import { MockProductService } from '@app/modules/product/services/data/mock-product-service';
import { ProductService } from '@app/modules/product/services/data/product-service';
import { BreadcrumbSection } from '@app/shared/breadcrumb/model/breadcrumb-section';
import { ToastService } from '@app/shared/toast/services/toast-service';
import { debounceTime, distinctUntilChanged, finalize, first, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-add',
  standalone: false,
  templateUrl: './product-add-page.html',
  styleUrl: './product-add-page.css'
})
export class ProductAddPage {
  public readonly breadcrumbSections: BreadcrumbSection[] = [
    { navigationUrl: '..', name: 'Product' },
    { navigationUrl: '', name: 'Add Product' },
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
  public addProductForm: FormGroup;
  private _isSubmitting = signal<boolean>(false);
  private _fb = inject(FormBuilder);
  private _productService: ProductService = inject(MockProductService);
  private _routerService = inject(Router);
  private _toastService = inject(ToastService);

  constructor() {
		this.addProductForm = this._fb.group({
			name: new FormControl('', Validators.required, this.isProductNameExistsValidator()),
			category: new FormControl('', Validators.required),
			description: new FormControl(''),
			unitPrice: new FormControl('', [Validators.required]),
			reorderThreshold: new FormControl(''),
			imageUrl: new FormControl(''),
		});
	}

  get isSubmitting() {
    return this._isSubmitting.asReadonly();
  }

  getFormControl(formControlName: string): FormControl {
    return this.addProductForm.get(formControlName) as FormControl;
  }

  onProductImageUrlChange(newImageUrl: string) {
    this.addProductForm.get('imageUrl')?.setValue(newImageUrl);
  }

  onGoBack() {
    this._routerService.navigate(['product']);
  }

  onSubmit(): void {
    if (this.addProductForm.invalid || this.addProductForm.pending) {
      this.addProductForm.markAllAsTouched();
      return;
    }

    const addProduct: AddProduct = {
      name: this.addProductForm.get('name')?.value,
      category: this.addProductForm.get('category')?.value,
      description: this.addProductForm.get('description')?.value,
      unitPrice: this.addProductForm.get('unitPrice')?.value,
      reorderThreshold: this.addProductForm.get('reorderThreshold')?.value,
      imageUrl: this.addProductForm.get('imageUrl')?.value,
    }
    
    this._isSubmitting.set(true);
    this._productService.addProduct(addProduct).pipe(
      finalize(() => {
        this._isSubmitting.set(false);
      }),
    )
    .subscribe({
      next: () => {
        this._toastService.showSuccess('Product has been added');
        this._routerService.navigate(['product']);
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
