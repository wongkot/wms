import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  'providedIn': 'root'
})
export class DataFormatService {
  formatAreaName(zonePrefix: string, row: number, column: number): string {
    return `${zonePrefix}-${row}${column}`;
  }

  formatLotNumber(date: Date): string {
    return formatDate(date, 'yyyyMMdd', 'en-US');
  }
}
