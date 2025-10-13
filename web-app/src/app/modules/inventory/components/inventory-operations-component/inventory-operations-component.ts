import { Component, computed, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DEFAULT_MIN_INBOUND_QUANTITY, INVENTORY_OPERATION_ADJUSTMENT, INVENTORY_OPERATION_INBOUND, INVENTORY_OPERATION_MOVE_AREA, INVENTORY_OPERATION_OUTBOUND, MESSAGES } from '@app/core/constants/app';
import { UtilityService } from '@app/core/services/data/utility-service';
import { InventoryMoveAreaOperation } from '@app/modules/inventory/models/inventory-move-area-operation';
import { InventoryOperation } from '@app/modules/inventory/models/inventory-operation';
import { InventoryDetailStateService } from '@app/modules/inventory/services/state/inventory-detail-state-service';

@Component({
  selector: 'app-inventory-operations',
  standalone: false,
  templateUrl: './inventory-operations-component.html',
  styleUrl: './inventory-operations-component.css'
})
export class InventoryOperationsComponent {
  stateService = inject(InventoryDetailStateService);
  drawerToggleControl = new FormControl(this.stateService.drawerOpened());
  private _utilityService = inject(UtilityService);
  private _fb: FormBuilder = inject(FormBuilder);
  private _quantityBaseValidators = [ Validators.required, Validators.min(1) ];
  private _maxOperationQuantity = 999;
  public readonly allAreas = this._utilityService.getAreasForDropdown();
  readonly customAreaErrorMessages = new Map<string, string>([
    [ 'required', MESSAGES.AREA_REQUIRED ],
  ]);
  public inventoryOperationForm = this._fb.group({
    lot: new FormControl({ value: '', disabled: true }),
    area: new FormControl({ value: '', disabled: true }),
    quantity: new FormControl('', [ ...this._quantityBaseValidators ]),
    moveArea: new FormControl(''),
  });
  operationTitle = computed(() => {
    let title = '';
    switch (this.stateService.selectedInventoryOperation()) {
      case INVENTORY_OPERATION_INBOUND:
        title = 'Inbound';
        break;
      case INVENTORY_OPERATION_OUTBOUND:
        title = 'Outbound';
        break;
      case INVENTORY_OPERATION_ADJUSTMENT:
        title = 'Adjustment';
        break;
      case INVENTORY_OPERATION_MOVE_AREA:
        title = 'Move Area';
        break;
    }
    return title;
  });
  isMoveAreaOperation = computed(() => {
    return this.stateService.selectedInventoryOperation() == INVENTORY_OPERATION_MOVE_AREA;
  });
  moveAreas = computed(() => {
    return this.stateService.selectedInventory ? [ ...this.allAreas ].filter(area => area.key != this.stateService.selectedInventory()?.area) : this.allAreas;
  });
  minQuantity = computed(() => {
    let minQuantity = DEFAULT_MIN_INBOUND_QUANTITY; // Most actions must have at least 1 quantity to perform the operation
    switch (this.stateService.selectedInventoryOperation()) {
      case INVENTORY_OPERATION_ADJUSTMENT:
        minQuantity = 0; // Inventory adjustment can be set to zero (i.e. remove current inventory from the system)
        break;
    }
    return minQuantity;
  });
  maxQuantity = computed(() => {
    let maxQuantity = this._maxOperationQuantity;
    switch (this.stateService.selectedInventoryOperation()) {
      case INVENTORY_OPERATION_OUTBOUND:
      case INVENTORY_OPERATION_MOVE_AREA:
        maxQuantity = this.stateService.selectedInventory()?.quantity ?? 1;
        break;
    }
    return maxQuantity;
  });

  constructor() {
    effect(() => {
      this.drawerToggleControl.setValue(this.stateService.drawerOpened());
      if (this.stateService.drawerOpened()) {
        this.inventoryOperationForm.patchValue({
          lot: this.stateService.selectedInventory()?.lot ?? '',
          area: this.stateService.selectedInventory()?.area ?? '',
          quantity: String(this.stateService.selectedInventory()?.quantity),
          moveArea: '',
        });
        this.inventoryOperationForm.markAsUntouched();
      }
    });
    effect(() => {
      switch (this.stateService.selectedInventoryOperation()) {
        case INVENTORY_OPERATION_INBOUND:
          this.inventoryOperationForm.get('area')?.enable();
          this.inventoryOperationForm.get('area')?.setValidators([
            Validators.required,
          ]);
          this.inventoryOperationForm.get('lot')?.enable();
          this.inventoryOperationForm.get('lot')?.setValidators([
            Validators.required,
          ]);
          this.inventoryOperationForm.get('quantity')?.setValidators([
            ...this._quantityBaseValidators,
            Validators.max(this._maxOperationQuantity),
          ]);
          this.inventoryOperationForm.get('moveArea')?.clearValidators();
          this.inventoryOperationForm.get('moveArea')?.updateValueAndValidity();
          break;
        case INVENTORY_OPERATION_OUTBOUND:
          this.inventoryOperationForm.get('area')?.disable();
          this.inventoryOperationForm.get('area')?.clearValidators();
          this.inventoryOperationForm.get('lot')?.disable();
          this.inventoryOperationForm.get('lot')?.clearValidators();
          this.inventoryOperationForm.get('quantity')?.setValidators([
            ...this._quantityBaseValidators,
            Validators.max(this.stateService.selectedInventory()?.quantity ?? 1),
          ]);
          this.inventoryOperationForm.get('moveArea')?.clearValidators();
          this.inventoryOperationForm.get('moveArea')?.updateValueAndValidity();
          break;
        case INVENTORY_OPERATION_ADJUSTMENT:
          this.inventoryOperationForm.get('area')?.disable();
          this.inventoryOperationForm.get('area')?.clearValidators();
          this.inventoryOperationForm.get('lot')?.disable();
          this.inventoryOperationForm.get('lot')?.clearValidators();
          this.inventoryOperationForm.get('quantity')?.setValidators([
            Validators.min(0),
            Validators.max(this._maxOperationQuantity),
          ]);
          this.inventoryOperationForm.get('moveArea')?.clearValidators();
          this.inventoryOperationForm.get('moveArea')?.updateValueAndValidity();
          break;
        case INVENTORY_OPERATION_MOVE_AREA:
          this.inventoryOperationForm.get('area')?.disable();
          this.inventoryOperationForm.get('area')?.clearValidators();
          this.inventoryOperationForm.get('lot')?.disable();
          this.inventoryOperationForm.get('lot')?.clearValidators();
          this.inventoryOperationForm.get('quantity')?.setValidators([
            ...this._quantityBaseValidators,
            Validators.max(this.stateService.selectedInventory()?.quantity ?? 1),
          ]);
          this.inventoryOperationForm.get('moveArea')?.setValidators([
            Validators.required
          ]);
          this.inventoryOperationForm.get('moveArea')?.updateValueAndValidity();
          break;
      }
    });
  }

  getFormControl(formControlName: string): FormControl {
    return this.inventoryOperationForm.get(formControlName) as FormControl;
  }

  onDismissErrorMessage() {
    this.stateService.clearInventoryOperationError();
  }

  onDrawerBackdropClick() {
    if (this.stateService.isCallingInventoryOperationApi()) {
      return;
    }

    this.stateService.clearInventoryOperationError();
    this.stateService.closeDrawer();
  }

  onCancel() {
    if (this.stateService.isCallingInventoryOperationApi()) {
      return;
    }

    this.stateService.clearInventoryOperationError();
    this.stateService.closeDrawer();
  }

  onSubmit() {
    if (this.stateService.isCallingInventoryOperationApi()) {
      return;
    }

    if (this.inventoryOperationForm.invalid) {
      this.inventoryOperationForm.markAllAsTouched();
      return;
    }

    const inventoryOperation: InventoryOperation = {
      productId: this.stateService.selectedInventory()!.productId,
      lot: this.inventoryOperationForm.get('lot')!.getRawValue(),
      area: this.inventoryOperationForm.get('area')!.getRawValue(),
      quantity: Number(this.inventoryOperationForm.get('quantity')!.getRawValue()),
    };
    switch (this.stateService.selectedInventoryOperation()) {
      case INVENTORY_OPERATION_INBOUND:
        this.stateService.inventoryInbound(inventoryOperation);
        break;
      case INVENTORY_OPERATION_OUTBOUND:
        this.stateService.inventoryOutbound(inventoryOperation);
        break;
      case INVENTORY_OPERATION_ADJUSTMENT:
        this.stateService.inventoryAdjustment(inventoryOperation);
        break;
      case INVENTORY_OPERATION_MOVE_AREA:
        const inventoryMoveAreaOperation: InventoryMoveAreaOperation = {
          ...inventoryOperation,
          newArea: this.inventoryOperationForm.get('moveArea')!.getRawValue(),
        }
        this.stateService.inventoryMoveArea(inventoryMoveAreaOperation);
        break;
      default:
        this.stateService.closeDrawer();
        break;
    }
  }
}
