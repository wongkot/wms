export interface TableColumnConfig {
  headerName?: string;
  dataProperty: string;
  highlighted: boolean;
  noWrap: boolean;
  columnType: 'text' | 'number' | 'date' | 'image' | 'price' | 'label';
  sortable: boolean;
  cssClasses?: (data: any) => string;
}