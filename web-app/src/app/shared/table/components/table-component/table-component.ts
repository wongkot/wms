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
  public readonly tableConfig = input.required<TableConfig>();
  public readonly dataSource = input<any[]>([]);
  public readonly sortState = input<TableSortState>({ columnProp: '', isAsc: true });
  public readonly selectedRow = input<any>(null);
  public readonly sortStateChange = output<TableSortState>();
  public readonly viewDetailClick = output<any>();
  public readonly editClick = output<any>();
  public readonly deleteClick = output<any>();
  public readonly rowClick = output<any>();

  public styleSortableHeader(columnDataProperty: string): string[] {
    const classes = [];
    if (this.sortState().columnProp === columnDataProperty) {
      classes.push('text-base-content');
      classes.push('text-bold');
      classes.push('hover:text-primary');
      classes.push(this.sortState().isAsc ? 'bi-arrow-up' : 'bi-arrow-down');
    } else {
      classes.push('hover:text-primary');
      classes.push('bi-arrow-down-up');
    }

    return classes;
  }

  public onSortChange(columnDataProperty: string): void {
    if (columnDataProperty === this.sortState().columnProp) {
      this.sortStateChange.emit({
        columnProp: !this.sortState().isAsc ? '' : columnDataProperty,
        isAsc: !this.sortState().isAsc
      });
    } else {
      this.sortStateChange.emit({ columnProp: columnDataProperty, isAsc: true });
    }
  }

  public onViewDetailClick(rowData: any): void {
    this.viewDetailClick.emit(rowData);
  }

  public onRowClick(rowData: any): void {
    this.rowClick.emit(rowData);
  }

  public onEditClick(rowData: any): void {
    this.editClick.emit(rowData);
  }

  public onDeleteClick(rowData: any): void {
    this.deleteClick.emit(rowData);
  }
}
