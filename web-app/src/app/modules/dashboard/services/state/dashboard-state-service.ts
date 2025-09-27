import { inject, Injectable, signal } from '@angular/core';
import { InventoryDashboard } from '@app/modules/dashboard/models/inventory-dashboard';
import { DashboardService } from '@app/modules/dashboard/services/data/dashboard-service';
import { MockDashboardService } from '@app/modules/dashboard/services/data/mock-dashboard-service';
import { InventoryHistory } from '@app/modules/inventory-history/models/inventory-history';
import { InventoryHistoryService } from '@app/modules/inventory-history/services/data/inventory-history-service';
import { MockInventoryHistoryService } from '@app/modules/inventory-history/services/data/mock-inventory-history-service';
import { BaseChartInput } from '@app/shared/chart/models/base-chart-input';

@Injectable()
export class DashboardStateService {
  private _dashboardService: DashboardService = inject(MockDashboardService);
  private _inventoryHistoryService: InventoryHistoryService = inject(MockInventoryHistoryService);
  private _dashboardData = signal<InventoryDashboard>({
    currentMonthTotalInbound: null,
    currentMonthTotalOutbound: null,
    totalInboundPercent: null,
    totalOutboundPercent: null,
    totalLowInventory: 0,
  });
  private _barChartInput = signal<BaseChartInput>({
    chartTitle: 'Inventory movement in recent 6 months',
    chartHeight: 300,
    chartSeries: [
      {
        name: 'Inbound',
        color: 'var(--color-success)',
        dataLabelColor: 'var(--color-success-content)',
        values: [],
      },
      {
        name: 'Outbound',
        color: 'var(--color-error)',
        dataLabelColor: 'var(--color-error-content)',
        values: [],
      },
    ]
  });
  private _pieChartInput = signal<BaseChartInput>({
    chartTitle: 'Inventory by category',
    chartHeight: 300,
    chartSeries: [
      {
        name: '',
        color: '',
        dataLabelColor: '',
        values: [],
      }
    ]
  });
  private _recentHistories = signal<InventoryHistory[]>([]);

  public get barChartInput() {
    return this._barChartInput.asReadonly();
  }

  public get pieChartInput() {
    return this._pieChartInput.asReadonly();
  }

  public get recentHistories() {
    return this._recentHistories.asReadonly();
  }

  public get dashboardData() {
    return this._dashboardData.asReadonly();
  }

  constructor() {
    this.loadDashboardData();
    this.loadRecentHistories();
  }

  loadDashboardData(): void {
    this._dashboardService.getDashboardData().subscribe({
      next: (dashboardApiOutput) => {
        this._dashboardData.set({
          currentMonthTotalInbound: dashboardApiOutput.currentMonthTotalInbound,
          currentMonthTotalOutbound: dashboardApiOutput.currentMonthTotalOutbound,
          totalInboundPercent: dashboardApiOutput.totalInboundPercent,
          totalOutboundPercent: dashboardApiOutput.totalOutboundPercent,
          totalLowInventory: dashboardApiOutput.totalLowInventory,
        });

        const inboundSeries = this.barChartInput().chartSeries.at(0);
        const outboundSeries = this._barChartInput().chartSeries.at(1);
        if (inboundSeries) {
          inboundSeries!.values = dashboardApiOutput.inboundBarChartSeries;
        }
        if (outboundSeries) {
          outboundSeries!.values = dashboardApiOutput.outboundBarChartSeries;
        }
        this._barChartInput.update((previous) => ({
          ...previous,
        }));

        const pieChartData = this.pieChartInput().chartSeries.at(0);
        if  (pieChartData) {
          pieChartData.values = dashboardApiOutput.pieChartSeries;
        }
        this._pieChartInput.update((previous) => ({
          ...previous,         
        }));
      }
    });
  }

  loadRecentHistories(): void {
    this._inventoryHistoryService.getRecentInventoryHistories(5).subscribe({
      next: (inventoryHistory) => {
        this._recentHistories.set(inventoryHistory);
      }
    });
  }
}
