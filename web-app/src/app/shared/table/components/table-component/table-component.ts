import { Component, Input } from '@angular/core';
import { TableConfig } from '@app/shared/table/models/table-config';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table-component.html',
  styleUrl: './table-component.css'
})
export class TableComponent {
  @Input() tableConfig!: TableConfig;
  @Input() dataSource: any[] = [];
}
