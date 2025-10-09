import { KeyValue } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '@app/core/services/data/utility-service';
import { AddProduct } from '@app/modules/product/models/add-product';
import { ProductAddStateService } from '@app/modules/product/services/state/product-add-state-service';
import { BreadcrumbSection } from '@app/shared/breadcrumb/model/breadcrumb-section';
import { ToastService } from '@app/shared/toast/services/toast-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-add',
  standalone: false,
  templateUrl: './product-add-page.html',
  styleUrl: './product-add-page.css',
  providers: [ProductAddStateService]
})
export class ProductAddPage implements OnDestroy {
  public stateService = inject(ProductAddStateService);
  public addProductForm: FormGroup;
  private _fb = inject(FormBuilder);
  private _routerService = inject(Router);
  private _toastService = inject(ToastService);
  private _utilityService = inject(UtilityService);
  private _addProductSuccess: Subscription;
  public readonly breadcrumbSections: BreadcrumbSection[] = [
    { navigationUrl: '..', name: 'Product' },
    { navigationUrl: '', name: 'Add Product' },
  ];
  public readonly productCategories = this._utilityService.getProductCategoriesForDropdown();
  readonly customProductNameErrorMessages = new Map<string, string>([
    [ 'nameExists', 'This product name is already taken' ],
  ]);
  readonly customCategoryErrorMessages = new Map<string, string>([
    [ 'required', 'Please select product category' ],
  ]);

  constructor() {
		this.addProductForm = this._fb.group({
			name: new FormControl('', Validators.required, this.stateService.isProductNameExistsValidator()),
			category: new FormControl('', Validators.required),
			description: new FormControl(''),
			unitPrice: new FormControl('', [Validators.required]),
			reorderThreshold: new FormControl(''),
			imageUrl: new FormControl(''),
		});
    this._addProductSuccess = this.stateService.addSuccess$.subscribe({
      next: () => {
        this._toastService.showSuccess('Product has been added');
        this._routerService.navigate(['product']);
      }
    });
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

    this.stateService.addProduct(addProduct);
  }

  ngOnDestroy(): void {
    if (this._addProductSuccess) {
      this._addProductSuccess.unsubscribe();
    }
  }
}
