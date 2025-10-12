import { KeyValue } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '@app/core/services/data/utility-service';
import { EditProduct } from '@app/modules/product/models/edit-product';
import { ProductEditStateService } from '@app/modules/product/services/state/product-edit-state-service';
import { BreadcrumbSection } from '@app/shared/breadcrumb/model/breadcrumb-section';
import { ToastService } from '@app/shared/toast/services/toast-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit-page.html',
  styleUrl: './product-edit-page.css',
  providers: [ProductEditStateService]
})
export class ProductEditPage implements OnInit, OnDestroy {
  public stateService = inject(ProductEditStateService);
  public editProductForm!: FormGroup;
  private _productId!: number;
  private _fb = inject(FormBuilder);
  private _routerService = inject(Router);
  private _route = inject(ActivatedRoute);
  private _toastService = inject(ToastService);
  private _utilityService = inject(UtilityService);
  private _subscriptions = new Subscription();
  public readonly breadcrumbSections: BreadcrumbSection[] = [
    { navigationUrl: '../..', name: 'Product' },
    { navigationUrl: '', name: 'Edit Product' },
  ];
  public readonly productCategories = this._utilityService.getProductCategoriesForDropdown(false);
  readonly customProductNameErrorMessages = new Map<string, string>([
    [ 'nameExists', 'This product name is already taken' ],
  ]);
  readonly customCategoryErrorMessages = new Map<string, string>([
    [ 'required', 'Please select product category' ],
  ]);

  ngOnInit(): void {
    this._productId = Number(this._route.snapshot.paramMap.get('id'));
    this.editProductForm = this._fb.group({
			name: new FormControl('', Validators.required, this.stateService.isProductNameExistsValidator(this._productId)),
			category: new FormControl('', Validators.required),
			description: new FormControl(''),
			unitPrice: new FormControl('', [Validators.required]),
			reorderThreshold: new FormControl(''),
			imageUrl: new FormControl(''),
		});
    this._subscriptions.add(this.stateService.productLoadSucess$.subscribe({
      next: (product) => {
        this.editProductForm.setValue({
          name: product.name,
			    category: product.category,
			    description: product.description,
			    unitPrice: product.unitPrice,
			    reorderThreshold: product.reorderThreshold ?? null,
			    imageUrl: product.imageUrl,
        });
      }
    }));
    this._subscriptions.add(this.stateService.editSuccess$.subscribe({
      next: () => {
        this._toastService.showSuccess('Product has been updated');
        this._routerService.navigate(['product']);
      }
    }));
    this._subscriptions.add(this.stateService.editFailed$.subscribe({
      next: (message) => {
        this._toastService.showError(message);
      }
    }));

    this.stateService.loadProductInfo(this._productId);
  }

  getFormControl(formControlName: string): FormControl {
    return this.editProductForm.get(formControlName) as FormControl;
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

    this.stateService.editProduct(editProduct);
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
