import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MESSAGES } from '@app/core/constants/app';
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
  private readonly _fb = inject(FormBuilder);
  private readonly _routerService = inject(Router);
  private readonly _toastService = inject(ToastService);
  private readonly _utilityService = inject(UtilityService);
  private _addProductSuccess: Subscription;
  public readonly stateService = inject(ProductAddStateService);
  public addProductForm: FormGroup;
  public readonly breadcrumbSections: BreadcrumbSection[] = [
    { navigationUrl: '..', name: 'Product' },
    { navigationUrl: '', name: 'Add Product' },
  ];
  public readonly productCategories = this._utilityService.getProductCategoriesForDropdown(false);
  public readonly customProductNameErrorMessages = new Map<string, string>([
    ['nameExists', MESSAGES.PRODUCT_NAME_EXISTS],
  ]);
  public readonly customCategoryErrorMessages = new Map<string, string>([
    ['required', MESSAGES.PRODUCT_CATEGORY_REQUIRED],
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
        this._toastService.showSuccess(MESSAGES.PRODUCT_ADDED);
        this._routerService.navigate(['product']);
      }
    });
  }

  public getFormControl(formControlName: string): FormControl {
    return this.addProductForm.get(formControlName) as FormControl;
  }

  public onGoBack(): void {
    this._routerService.navigate(['product']);
  }

  public onSubmit(): void {
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

  public ngOnDestroy(): void {
    if (this._addProductSuccess) {
      this._addProductSuccess.unsubscribe();
    }
  }
}
