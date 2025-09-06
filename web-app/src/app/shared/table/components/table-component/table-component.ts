import { Component, input, output } from '@angular/core';
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
  selectedRow = input<any>(null);
  sortStateChange = output<TableSortState>();
  viewDetailClick = output<any>();
  editClick = output<any>();
  deleteClick = output<any>();
  rowClick = output<any>();

  styleSortableHeader(columnDataProperty: string) {
    let classes = [];

    if (this.sortState().columnProp === columnDataProperty) {
      classes.push('text-primary-content');
      classes.push('text-bold');
      classes.push('hover:text-primary');
      classes.push(this.sortState().isAsc ? 'bi-arrow-up' : 'bi-arrow-down');
    } else {
      classes.push('hover:text-primary');
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

  onViewDetailClick(rowData: any) {
    this.viewDetailClick.emit(rowData);
  }

  onRowClick(rowData: any) {
    this.rowClick.emit(rowData);
  }

  onEditClick(rowData: any) {
    this.editClick.emit(rowData);
  }

  onDeleteClick(rowData: any) {
    this.deleteClick.emit(rowData);
  }
}
