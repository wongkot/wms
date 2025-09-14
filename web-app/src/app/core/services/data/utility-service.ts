import { formatDate, KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { ZONE_PREFIXES, AREA_ROWS, AREA_COLUMNS } from '@app/core/constants/app';

@Injectable({
  'providedIn': 'root'
})
export class UtilityService {
  formatAreaName(zonePrefix: string, row: number, column: number): string {
    return `${zonePrefix}-${row}${column}`;
  }

  formatLotNumber(date: Date): string {
    return formatDate(date, 'yyyyMMdd', 'en-US');
  }

  sortArray<T = any>(array: T[], sortColumn: any, isAsc: boolean): T[] {
    if (!array) {
      return array;
    }

    let sortedArray = [...array];
    let firstItem = Object(array.at(0));
    let columnType = firstItem ? typeof (firstItem[sortColumn]) : 'string';
    if (columnType == 'number') {
      sortedArray = sortedArray.sort((i1, i2) => Object(i1)[sortColumn] - Object(i2)[sortColumn]);
      sortedArray = isAsc ? sortedArray : sortedArray.reverse();
    } else {
      sortedArray = sortedArray.sort((i1, i2) => {
        let value1 = String(Object(i1)[sortColumn] ?? '');
        let value2 = String(Object(i2)[sortColumn] ?? '');
        return value1.toLocaleLowerCase().localeCompare(value2.toLocaleLowerCase());
      });
      sortedArray = isAsc ? sortedArray : sortedArray.reverse();
    }

    return sortedArray;
  }

  getAreasForDropdown(): KeyValue<string, string>[] {
    return ZONE_PREFIXES.flatMap((zone) => {
      const zoneAreas: KeyValue<string, string>[] = [];
      for (let row = 0; row < AREA_ROWS; row++) {
        for (let column = 0; column < AREA_COLUMNS; column++) {
          const areaName = this.formatAreaName(zone, row, column);
          zoneAreas.push({ key: areaName, value: areaName });
        }
      }
      return zoneAreas;
    });
  }
}
