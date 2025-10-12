import { formatDate } from '@angular/common';
import { AfterViewInit, Component, computed, input, output, signal } from '@angular/core';
import { DATE_FORMAT } from '@app/core/constants/app';
import { DateRange } from '@app/shared/date-picker/models/date-range';
import 'cally';

@Component({
  selector: 'app-date-range-picker',
  standalone: false,
  templateUrl: './date-range-picker-component.html',
  styleUrl: './date-range-picker-component.css'
})
export class DateRangePickerComponent implements AfterViewInit {
  initialDateRange = input<DateRange>(this.createInitialDateRange());
  private _dateRange = signal<DateRange>(this.initialDateRange());
  displayText = computed(() => {
    return `${formatDate(this._dateRange().startDate, DATE_FORMAT, 'en-US')} ~ ${formatDate(this._dateRange().endDate, DATE_FORMAT, 'en-US')}`;
  });
  selectedValue = computed(() => {
    return `${formatDate(this._dateRange().startDate, DATE_FORMAT, 'en-US')}/${formatDate(this._dateRange().endDate, DATE_FORMAT, 'en-US')}`;
  });
  dateRangeChanged = output<DateRange>();

  ngAfterViewInit(): void {
    if (this._dateRange().startDate != this.initialDateRange().startDate ||
        this._dateRange().endDate != this.initialDateRange().endDate) {
          this._dateRange.set(this.initialDateRange());
    }
  }

  onRangeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const dateRange = target.value.split('/');

    const newStartDate = dateRange[0];
    const newEndDate = dateRange[1];
    this._dateRange.set({
      startDate: newStartDate,
      endDate: newEndDate,
    });
    this.dateRangeChanged.emit({
      startDate: newStartDate,
      endDate: newEndDate,
    });
  }

  private createInitialDateRange(): DateRange {
    const now = new Date();
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - 1);

    return {
      startDate: formatDate(startDate, DATE_FORMAT, 'en-US'),
      endDate: formatDate(endDate, DATE_FORMAT, 'en-US'),
    };
  }
}
