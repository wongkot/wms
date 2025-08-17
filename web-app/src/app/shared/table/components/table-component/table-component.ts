import { Component, computed, input, output } from '@angular/core';
import { TableColumnConfig } from '@app/shared/table/models/table-column-config';
import { TableConfig } from '@app/shared/table/models/table-config';
import { TableSortState } from '@app/shared/table/models/table-sort-state';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table-component.html',
  styleUrl: './table-component.css'
})
export class TableComponent {
  tableConfig = input.required<TableConfig>();
  dataSource = input<any[]>([]);
  sortState = input<TableSortState>({ columnProp: '', isAsc: true });
  sortStateChange = output<TableSortState>();

  styleSortableHeader(columnDataProperty: string) {
    let classes = [];

    if (this.sortState().columnProp === columnDataProperty) {
      classes.push('text-secondary-500');
      classes.push('hover:text-secondary-400');
      classes.push(this.sortState().isAsc ? 'bi-arrow-up' : 'bi-arrow-down');
    } else {
      classes.push('hover:text-primary-content');
      classes.push('bi-arrow-down-up');
    }

    return classes;
  }

  onSortChange(columnDataProperty: string) {
    if (columnDataProperty === this.sortState().columnProp) {
      this.sortStateChange.emit({
        columnProp: !this.sortState().isAsc ? '': columnDataProperty,
        isAsc: !this.sortState().isAsc
      });
    } else {
      this.sortStateChange.emit({ columnProp: columnDataProperty, isAsc: true });
    }
  }
}
