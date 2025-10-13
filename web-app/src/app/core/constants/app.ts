// Area
export const ZONE_PREFIXES = [
  'A',
  'B',
  'C',
];
export const AREA_ROWS = 10; // Row range start from 0 to (AREA_ROWS - 1)
export const AREA_COLUMNS = 2; // Column range start from 0 to (AREA_COLUMNS - 1)

// Inventory operations
export const INVENTORY_OPERATION_INBOUND = 'Inbound';
export const INVENTORY_OPERATION_OUTBOUND = 'Outbound';
export const INVENTORY_OPERATION_ADJUSTMENT = 'Adjustment';
export const INVENTORY_OPERATION_MOVE_AREA = 'Move Area';

// Format
export const DEFAULT_LOCALE = 'en-US';
export const DATE_FORMAT = 'yyyy-MM-dd';
export const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';

// Product category
export const PRODUCT_CATEGORY_CABLES = 'Cables';
export const PRODUCT_CATEGORY_COMPUTERS = 'Computers';
export const PRODUCT_CATEGORY_MISC = 'Misc.';
export const PRODUCT_CATEGORY_NETWORKING = 'Networking';
export const PRODUCT_CATEGORY_PERIPHERALS = 'Peripherals';

// Messages
export const MESSAGES = {
  PRODUCT_ADDED: 'Product has been added',
  PRODUCT_UPDATED: 'Product has been updated',
  PRODUCT_DELETED: 'Product has been deleted',
  CONFIRM_DELETE_PRODUCT: 'Do you want to delete selected product?',
  PRODUCT_NAME_EXISTS: 'This product name is already taken',
  PRODUCT_NAME_NOT_EXISTS: 'This product name does not exists',
  PRODUCT_ID_NOT_FOUND: (id: number) => `This product with id (${id}) not found`,
  PRODUCT_NAME_NOT_FOUND: (name: string) => `This product with name (${name}) not found`,
  PRODUCT_CATEGORY_REQUIRED: 'Please select product category',
  AREA_REQUIRED: 'Please select area',
  INPUT_REQUIRED: 'This field cannot be empty',
  INPUT_DROPDOWN_REQUIRED: 'Please select an option',
  INVALID_NUMBER_RANGE: (min: number, max: number) => `Please enter value between ${min} - ${max}`,
  INVALID_FILE_TYPE: (fileType: string, validTypes: string) => `File type "${fileType}" is not a valid type (valid types: ${validTypes})`,
  INVALID_FILE_SIZE: (maxSize: string, currentSize: string) => `File size has to be less than ${maxSize} MB (current size: ${currentSize} MB)`,
  PROCESS_FILE_ERROR: 'An error has been occurred while processing the file',
  INVENTORY_UPDATED: 'Inventory has been updated',
  INVENTORY_NOT_FOUND: (lot: string, area: string) => `This inventory with lot (${lot}) and area (${area}) not found`,
  INVENTORY_OUTBOUND_EXCEED_LIMIT: (quantity: number, limit: number) => `Outbound quantity (${quantity}) exceed inventory limit (${limit})`,
  INVENTORY_ADJUSTMENT_QUANTITY_ZERO: 'Adjustment quantity must be equal or greater than zero',
  INVENTORY_ADJUSTMENT_ADJUSTED_QUANTITY_ZERO: 'Adjustment quantity cannot be zero',
};

// Validation
export const DEFAULT_MAX_CHARS = 100;
export const DEFAULT_MIN_NUMBER = 1;
export const DEFAULT_MAX_NUMBER = 999;
export const MAX_FILE_SIZE_MB = 2;
export const DEFAULT_MIN_INBOUND_QUANTITY = 1;
export const DEFAULT_MAX_INBOUND_QUANTITY = 999;
