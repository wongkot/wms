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
  private _productId!: number;
  private readonly _routerService = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private _inventoryOperationSuccess: Subscription;
  private readonly _toastService = inject(ToastService);
  public readonly stateService = inject(InventoryDetailStateService);
  public readonly breadcrumbSections: BreadcrumbSection[] = [
    { navigationUrl: '../..', name: 'Inventory' },
    { navigationUrl: '', name: 'Detail' },
  ];

  constructor() {
    this._inventoryOperationSuccess = this.stateService.inventoryOperationSuccess$.subscribe({
      next: () => {
        this._toastService.showSuccess(MESSAGES.INVENTORY_UPDATED);
      }
    });
  }

  public ngOnInit(): void {
    this._productId = Number(this._route.snapshot.paramMap.get('product-id'));
    this.stateService.loadInventories(this._productId);
  }

  public onGoBack(): void {
    this._routerService.navigate(['inventory']);
  }

  public ngOnDestroy(): void {
    if (this._inventoryOperationSuccess) {
      this._inventoryOperationSuccess.unsubscribe();
    }
  }
}
