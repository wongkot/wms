import { TableColumnConfig } from "@app/shared/table/models/table-column-config";

export interface TableConfig {
  columns: TableColumnConfig[];
  canEdit?: boolean;
  canDelete?: boolean;
  canViewDetail?: boolean;
  canSelect?: boolean;
  selectedProperty?: string;
  sharpCornerTopLeft?: boolean;
  sharpCornerTopRight?: boolean;
  sharpCornerBottomLeft?: boolean;
  sharpCornerBottomRight?: boolean;
}