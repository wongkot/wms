import { formatDate, KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { ZONE_PREFIXES, AREA_ROWS, AREA_COLUMNS, PRODUCT_CATEGORY_CABLES, PRODUCT_CATEGORY_COMPUTERS, PRODUCT_CATEGORY_MISC, PRODUCT_CATEGORY_NETWORKING, PRODUCT_CATEGORY_PERIPHERALS } from '@app/core/constants/app';

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

  getProductCategoriesForDropdown(isFilter: boolean = true): KeyValue<string, string>[] {
    let dropDownList = [
      { key: PRODUCT_CATEGORY_CABLES, value: PRODUCT_CATEGORY_CABLES },
      { key: PRODUCT_CATEGORY_COMPUTERS, value: PRODUCT_CATEGORY_COMPUTERS },
      { key: PRODUCT_CATEGORY_MISC, value: PRODUCT_CATEGORY_MISC },
      { key: PRODUCT_CATEGORY_NETWORKING, value: PRODUCT_CATEGORY_NETWORKING },
      { key: PRODUCT_CATEGORY_PERIPHERALS, value: PRODUCT_CATEGORY_PERIPHERALS },
    ];
    if (isFilter) {
      dropDownList.unshift({ key: '', value: 'None' });
    }

    return dropDownList;
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
