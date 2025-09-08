import { Component, inject, input } from '@angular/core';
import { AREA_COLUMNS, AREA_ROWS, ZONE_PREFIXES } from '@app/core/constants/app';
import { UtilityService } from '@app/core/services/data/utility-service';
import { WarehouseMapState } from '@app/modules/inventory/models/warehouse-map-state';

@Component({
  selector: 'app-warehouse-map',
  standalone: false,
  templateUrl: './warehouse-map-component.html',
  styleUrl: './warehouse-map-component.css'
})
export class WarehouseMapComponent {
  private _utilityService = inject(UtilityService);
  warehouseMapState = input<Map<string, WarehouseMapState>>();
  selectedArea = input<Set<string>>(new Set<string>());
  public readonly warehouseAreas: Map<string, string[][]> = new Map(ZONE_PREFIXES.map((zone) => {
    const areas: string[][] = [];
    for (let row = 0; row < AREA_ROWS; row++) {
      const areaRow = [];
      for (let column = 0; column < AREA_COLUMNS; column++) {
        areaRow.push(this._utilityService.formatAreaName(zone, row, column));
      }
      areas.push(areaRow);
    }
    return [ `Zone ${zone}`, areas ];
  }));

  generateNumberArray(length: number) {
    return Array(length).keys();
  }

  getAreaName(prefix: string, row: number, column: number): string {
    return this._utilityService.formatAreaName(prefix, row, column);
  }
}
