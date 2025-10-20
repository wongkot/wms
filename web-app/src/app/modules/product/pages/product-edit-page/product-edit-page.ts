import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MESSAGES } from '@app/core/constants/app';
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
  private _productId!: number;
  private readonly _fb = inject(FormBuilder);
  private readonly _routerService = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _toastService = inject(ToastService);
  private readonly _utilityService = inject(UtilityService);
  private readonly _subscriptions = new Subscription();
  public readonly stateService = inject(ProductEditStateService);
  public editProductForm!: FormGroup;
  public readonly breadcrumbSections: BreadcrumbSection[] = [
    { navigationUrl: '../..', name: 'Product' },
    { navigationUrl: '', name: 'Edit Product' },
  ];
  public readonly productCategories = this._utilityService.getProductCategoriesForDropdown(false);
  public readonly customProductNameErrorMessages = new Map<string, string>([
    ['nameExists', MESSAGES.PRODUCT_NAME_EXISTS],
  ]);
  public readonly customCategoryErrorMessages = new Map<string, string>([
    ['required', MESSAGES.PRODUCT_CATEGORY_REQUIRED],
  ]);

  public ngOnInit(): void {
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
        this._toastService.showSuccess(MESSAGES.PRODUCT_UPDATED);
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

  public getFormControl(formControlName: string): FormControl {
    return this.editProductForm.get(formControlName) as FormControl;
  }

  public onGoBack(): void {
    this._routerService.navigate(['product']);
  }

  public onSubmit(): void {
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

  public ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
