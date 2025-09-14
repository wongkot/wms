import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '@app/core/services/data/utility-service';
import { InventoryInboundOperation } from '@app/modules/inventory/models/inventory-inbound-operation';
import { InventoryInboundStateService } from '@app/modules/inventory/services/state/inventory-inbound-state-service';
import { BreadcrumbSection } from '@app/shared/breadcrumb/model/breadcrumb-section';
import { ToastService } from '@app/shared/toast/services/toast-service';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-inventory-inbound',
  standalone: false,
  templateUrl: './inventory-inbound-page.html',
  styleUrl: './inventory-inbound-page.css',
  providers: [ InventoryInboundStateService ]
})
export class InventoryInboundPage implements OnInit, OnDestroy {
  public readonly breadcrumbSections: BreadcrumbSection[] = [
    { navigationUrl: '..', name: 'Inventory' },
    { navigationUrl: '', name: 'Inbound' },
  ];
  public readonly minQuantity = 1;
  public readonly maxQuantity = 999;
  private _defaultProductName = '';
  private _routerService = inject(Router);
  private _utilityService = inject(UtilityService);
  private _toastService = inject(ToastService);
  private _fb: FormBuilder = inject(FormBuilder);
  private _subscriptions = new Subscription();
  public stateService = inject(InventoryInboundStateService);
  public inboundOperationForm: FormGroup = this._fb.group({
    productName: new FormControl(this._defaultProductName, Validators.required, this.stateService.isProductNameNotExistsValidator()),
    lot: new FormControl(this._utilityService.formatLotNumber(new Date()), Validators.required),
    area: new FormControl('', Validators.required),
    quantity: new FormControl(1, [Validators.required, Validators.min(this.minQuantity), Validators.max(this.maxQuantity)]),
  });
  public readonly allAreas = this._utilityService.getAreasForDropdown();
  readonly customProductNameErrorMessages = new Map<string, string>([
    [ 'nameDoesNotExists', 'This product name does not exists' ],
  ]);
  readonly customAreaErrorMessages = new Map<string, string>([
    [ 'required', 'Please select area' ],
  ]);
  
  ngOnInit(): void {
    // Get default autocomplete list
    this.stateService.getAutocompleteProductNames(this._defaultProductName);

    this._subscriptions.add(this.inboundOperationForm.get('area')?.valueChanges.subscribe((newArea) => {
      this.stateService.selectArea(newArea);
    }));
    this._subscriptions.add(this.inboundOperationForm.get('productName')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe((productName) => {
      this.stateService.getAutocompleteProductNames(productName);
    }));
    this._subscriptions.add(this.stateService.operationSuccess$.subscribe({
      next: () => {
        this._toastService.showSuccess('Inventory has been updated');
        this._routerService.navigate(['inventory']);
      }
    }));
  }

  onGoBack() {
    this._routerService.navigate(['inventory']);
  }

  getFormControl(formControlName: string): FormControl {
    return this.inboundOperationForm.get(formControlName) as FormControl;
  }

  onSubmit(): void {
    if (this.inboundOperationForm.invalid || this.inboundOperationForm.pending) {
      this.inboundOperationForm.markAllAsTouched();
      return;
    }

    const inventoryInboundInput: InventoryInboundOperation = {
      productName: this.inboundOperationForm.get('productName')?.value,
      lot: this.inboundOperationForm.get('lot')?.value!,
      area: this.inboundOperationForm.get('area')?.value!,
      quantity: this.inboundOperationForm.get('quantity')?.value!,
    }
    this.stateService.inventoryInbound(inventoryInboundInput);
  }

  onDismissErrorMessage() {
    this.stateService.closeErrorMessage();
  }

  warehouseMapAreaClick(area: string) {
    this.stateService.selectArea(area);
    this.inboundOperationForm.get('area')?.setValue(area);
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
