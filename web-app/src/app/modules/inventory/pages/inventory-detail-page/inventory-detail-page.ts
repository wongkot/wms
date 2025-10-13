import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MESSAGES } from '@app/core/constants/app';
import { InventoryDetailStateService } from '@app/modules/inventory/services/state/inventory-detail-state-service';
import { BreadcrumbSection } from '@app/shared/breadcrumb/model/breadcrumb-section';
import { ToastService } from '@app/shared/toast/services/toast-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inventory-detail',
  standalone: false,
  templateUrl: './inventory-detail-page.html',
  styleUrl: './inventory-detail-page.css',
  providers: [InventoryDetailStateService]
})
export class InventoryDetailPage implements OnInit, OnDestroy {
  public readonly breadcrumbSections: BreadcrumbSection[] = [
    { navigationUrl: '../..', name: 'Inventory' },
    { navigationUrl: '', name: 'Detail' },
  ];
  private _productId!: number;
  private _routerService = inject(Router);
  private _route = inject(ActivatedRoute);
  private _inventoryOperationSuccess: Subscription;
  private _toastService = inject(ToastService);
  stateService = inject(InventoryDetailStateService);

  constructor() {
    this._inventoryOperationSuccess = this.stateService.inventoryOperationSuccess$.subscribe({
      next: () => {
        this._toastService.showSuccess(MESSAGES.INVENTORY_UPDATED);
      }
    });
	}

  ngOnInit(): void {
    this._productId = Number(this._route.snapshot.paramMap.get('product-id'));
    this.stateService.loadInventories(this._productId);
  }

  onGoBack() {
    this._routerService.navigate(['inventory']);
  }

  ngOnDestroy(): void {
    if (this._inventoryOperationSuccess) {
      this._inventoryOperationSuccess.unsubscribe();
    }
  }
}
