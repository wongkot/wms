import { inject, Injectable } from '@angular/core';
import { Pagination } from '@app/core/models/pagination';
import { UtilityService } from '@app/core/services/data/utility-service';
import { InventoryStatus } from '@app/modules/inventory/enums/inventory-status';
import { InventoryProduct } from '@app/modules/inventory/models/inventory-product';
import { Inventory } from '@app/modules/inventory/models/inventory';
import { InventoryProductDb } from '@app/modules/inventory/models/inventory-product-db';
import { AddProduct } from '@app/modules/product/models/add-product';
import { EditProduct } from '@app/modules/product/models/edit-product';
import { Product } from '@app/modules/product/models/product';
import { AREA_COLUMNS, AREA_ROWS, ZONE_PREFIXES } from '@app/core/constants/app';
import { InventoryOperation } from '@app/modules/inventory/models/inventory-operation';
import { InventoryMoveAreaOperation } from '@app/modules/inventory/models/inventory-move-area-operation';
import { InventoryInboundOperation } from '@app/modules/inventory/models/inventory-inbound-operation';
import { InventoryHistoryDb } from '@app/modules/inventory-history/models/inventory-history-db';
import { InventoryOperationType } from '@app/modules/inventory-history/enums/inventory-operation-type';
import { InventoryHistory } from '@app/modules/inventory-history/models/inventory-history';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDbService {
  private _products = new Map<number, Product>();
  private _currentProductId = 1;
  private _productInventory = new Map<number, InventoryProductDb>();
  private _displayInventoryStatusMap = new Map<InventoryStatus, string>([
    [InventoryStatus.OK, 'OK'],
    [InventoryStatus.Low, 'Low'],
    [InventoryStatus.OutOfStock, 'Out of stock'],
  ]);
  private _currentInventoryId = 1;
  private _inventoryHistory: InventoryHistoryDb[] = [];
  private _currentInventoryHistoryId = 1;
  private _utilityService = inject(UtilityService);
  private _displayInventoryOperationMap = new Map<InventoryOperationType, string>([
    [InventoryOperationType.Inbound, 'Inbound'],
    [InventoryOperationType.Outbound, 'Outbound'],
    [InventoryOperationType.Adjustment, 'Adjustment'],
    [InventoryOperationType.MoveArea, 'MoveArea'],
  ]);

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Products
    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Apple Watch #1',
        description: 'Description for Apple Watch',
        unitPrice: 599,
        category: 'Smart Watches',
        tags: [],
        reorderThreshold: 40,
        imageUrl: 'https://flowbite.com/docs/images/products/apple-watch.png',
      });
    
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Apple Watch #2',
        description: 'Description for Apple Watch',
        unitPrice: 599,
        category: 'Smart Watches',
        tags: [],
        imageUrl: 'https://flowbite.com/docs/images/products/apple-watch.png',
      });
    
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Apple Watch #3',
        description: 'Description for Apple Watch',
        unitPrice: 599,
        category: 'Smart Watches',
        tags: [],
        imageUrl: 'https://flowbite.com/docs/images/products/apple-watch.png',
      });
    
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Apple Watch #4',
        description: 'Description for Apple Watch',
        unitPrice: 599,
        category: 'Smart Watches',
        tags: [],
        reorderThreshold: 50,
        imageUrl: 'https://flowbite.com/docs/images/products/apple-watch.png',
      });
    
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'iMac 27" #1',
        description: 'Description for iMac 27"',
        unitPrice: 2499,
        category: 'PC',
        tags: [],
        imageUrl: 'https://flowbite.com/docs/images/products/imac.png',
      });
    
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'iMac 27" #2',
        description: 'Description for iMac 27"',
        unitPrice: 2499,
        category: 'PC',
        tags: [],
        imageUrl: 'https://flowbite.com/docs/images/products/imac.png',
      });
    
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'iMac 27" #3',
        description: 'Description for iMac 27"',
        unitPrice: 2499,
        category: 'PC',
        tags: [],
        imageUrl: 'https://flowbite.com/docs/images/products/imac.png',
      });
    
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'iMac 27" #4',
        description: 'Description for iMac 27"',
        unitPrice: 2499,
        category: 'PC',
        tags: [],
        imageUrl: 'https://flowbite.com/docs/images/products/imac.png',
      });
    
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'iPhone 12 #1',
        description: 'Description for iPhone 12',
        unitPrice: 999,
        category: 'Smart Phones',
        tags: [],
        imageUrl: 'https://flowbite.com/docs/images/products/iphone-12.png',
      });
    
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'iPhone 12 #2',
        description: 'Description for iPhone 12',
        unitPrice: 999,
        category: 'Smart Phones',
        tags: [],
        imageUrl: 'https://flowbite.com/docs/images/products/iphone-12.png',
      });
    
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'iPhone 12 #3',
        description: 'Description for iPhone 12',
        unitPrice: 999,
        category: 'Smart Phones',
        tags: [],
        imageUrl: 'https://flowbite.com/docs/images/products/iphone-12.png',
      });
    
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'iPhone 12 #4',
        description: 'Description for iPhone 12',
        unitPrice: 999,
        category: 'Smart Phones',
        tags: [],
        imageUrl: 'https://flowbite.com/docs/images/products/iphone-12.png',
      });
    
    this._currentProductId++;

    // Product inventory
    const pickInventoryProductCount = 7; // Number for picking top X products for generating inventory data
    const randomInventoryCount = 8;
    const minRandomQuantity = 2;
    const maxRandomQuantity = 5;
    const firstXProducts = this._products.size > pickInventoryProductCount ? 
      [ ...this._products.values() ].slice(0, pickInventoryProductCount)
      : [ ...this._products.values() ];

    firstXProducts.forEach(product => {
      let inventories: Inventory[] = [];
      // Random index that needs to be outbounded from inventory
      const outboundItemIndex = this.randInt(0, randomInventoryCount - 1);

      // Create random inventories of current product
      // Reverse index key in order to generate lot number from oldest to newest
      for (let index of [...Array(randomInventoryCount).keys()].reverse()) {
        const timestamp = new Date();
        timestamp.setMonth(timestamp.getMonth() - index);
        // Generate random date if the current date is not in this month
        if (index !== 0) {
          const lastDayOfMonth = new Date(timestamp.getFullYear(), timestamp.getMonth(), 0);
          timestamp.setDate(this.randInt(1, lastDayOfMonth.getDate()));
          timestamp.setHours(this.randInt(0, 23));
          timestamp.setMinutes(this.randInt(0, 59));
          timestamp.setSeconds(this.randInt(0, 59));
        } else {
          timestamp.setHours(this.randInt(0, timestamp.getHours()));
          timestamp.setMinutes(this.randInt(0, timestamp.getMinutes()));
          timestamp.setSeconds(this.randInt(0, timestamp.getSeconds()));
        }

        // Generate random area
        const zonePrefix = ZONE_PREFIXES[this.randInt(0, ZONE_PREFIXES.length - 1)];
        const row = this.randInt(0, AREA_ROWS - 1);
        const column = this.randInt(0, AREA_COLUMNS - 1);
        const lot = this._utilityService.formatLotNumber(timestamp);
        const area = this._utilityService.formatAreaName(zonePrefix, row, column);
        const quantity = this.randInt(minRandomQuantity, maxRandomQuantity);

        const inventory: Inventory = {
          id: this._currentInventoryId,
          productId: product.id,
          lot: lot,
          area: area,
          quantity: quantity,
        };
        this._currentInventoryId++;

        // Create inventory inbound history
        const inboundHistory: InventoryHistoryDb = {
          id: this._currentInventoryHistoryId,
          timestamp: timestamp,
          operationType: InventoryOperationType.Inbound,
          productId: product.id,
          productName: product.name,
          lot: lot,
          area: area,
          quantity: quantity,
          beforeQuantity: 0,
          afterQuantity: quantity,
        };
        this._inventoryHistory.push(inboundHistory);
        this._currentInventoryHistoryId++;

        // Remove inventory using random index
        if (index == outboundItemIndex) {
          const outboundTimestamp = new Date(timestamp);
          outboundTimestamp.setHours(outboundTimestamp.getHours() + this.randInt(1,3)); // Make outbound timestamp newer than inbound timestamp
          const outboundHistory: InventoryHistoryDb = {
            id: this._currentInventoryHistoryId,
            timestamp: outboundTimestamp,
            operationType: InventoryOperationType.Outbound,
            productId: product.id,
            productName: product.name,
            lot: inventory.lot,
            area: inventory.area,
            quantity: inventory.quantity,
            beforeQuantity: inventory.quantity,
            afterQuantity: 0,
          };
          this._inventoryHistory.push(outboundHistory);
          this._currentInventoryHistoryId++;
        } else {
          inventories.push(inventory);
        }
      }

      const totalInventoryQuantity = inventories.reduce((total, current) => {
        return total + current.quantity;
      }, 0);
      // Create inventory product
      this._productInventory.set(product.id, {
        productId: product.id,
        quantity: totalInventoryQuantity,
        inventories: inventories,
      });
    });
  }

  hasProductName(name: string): boolean {
    return [ ...this._products.values() ].some(product => product.name == name);
  }

  hasProductNameFromOtherId(name: string, id: number): boolean {
    return [ ...this._products.values() ].some(product => product.name == name && product.id !== id);
  }

  getProducts(): Product[] {
    return JSON.parse(JSON.stringify([ ...this._products.values() ]));
  }

  getProductNames(query: string, limit: number): string[] {
    let filteredProductNames = this._utilityService.sortArray([ ...this._products.values() ], 'name', true)
      .map(product => product.name);
    if (query) {
      return filteredProductNames.filter((productName) => {
        return productName.toLocaleLowerCase().includes(query.toLocaleLowerCase());
      }).slice(0, limit);
    } else {
      return filteredProductNames.slice(0, limit);
    }
  }

  getPageProducts(page: number, pageSize: number, query: string, category: string, sort: string): Pagination<Product> {
    let filteredProducts = [ ...this._products.values() ];
    if (query) {
      query = query?.toLocaleLowerCase();
      filteredProducts = filteredProducts.filter(product => {
        return product.name.toLocaleLowerCase().includes(query) || product.description?.toLocaleLowerCase().includes(query);
      });
    }
    if (category) {
      filteredProducts = filteredProducts.filter(product => {
        return product.category === category;
      });
    }
    let sortData = sort.split(':');
    let sortColumn = sortData.at(0);
    let sortDirection = sortData.at(1);
    if (sortColumn) {
      filteredProducts = this._utilityService.sortArray(filteredProducts, sortColumn, sortDirection == 'asc');
    }

    return this.paginateItems(filteredProducts, page, pageSize);
  }

  getProductById(id: number): Product | null {
    return this._products.get(id) ?? null;
  }

  addProduct(input: AddProduct): Product {
    const addedProduct: Product = {
      id: this._currentProductId,
      name: input.name,
      description: input.description,
      unitPrice: input.unitPrice,
      category: input.category,
      tags: [],
      imageUrl: input.imageUrl,
    }

    this._products.set(this._currentProductId, addedProduct);
    this._currentProductId++;

    return addedProduct;
  }

  editProduct(input: EditProduct): Product {
    if (this.hasProductNameFromOtherId(input.name, input.id)) {
      throw Error('This product name already used');
    }
    
    const editProduct = this._products.get(input.id);
    if (!editProduct) {
      throw Error(`This product with id (${input.id}) not found`);
    }

    editProduct.name = input.name;
    editProduct.description = input.description;
    editProduct.unitPrice = input.unitPrice;
    editProduct.category = input.category;
    editProduct.imageUrl = input.imageUrl;
    editProduct.reorderThreshold = input.reorderThreshold;

    return JSON.parse(JSON.stringify(editProduct));
  }

  deleteProduct(id: number): Product | null {
    const deleteProduct = this._products.get(id);
    if (!deleteProduct) {
      return null;
    }

    this._products.delete(id);

    // Clear all inventory data of associated product 
    if (this._productInventory.has(id)) {
      this._productInventory.delete(id);
    }

    return deleteProduct;
  }

  getInventoryProducts(): InventoryProduct[] {
    const inventoryProducts: InventoryProduct[] = [ ...this._productInventory.values() ].filter((inventoryProductDb) => {
      return inventoryProductDb.quantity > 0;
    })
    .map((inventoryProductDb) => {
      const unitPrice = this._products.get(inventoryProductDb.productId)?.unitPrice ?? 0;
      const totalPrice = inventoryProductDb.quantity * unitPrice;
      const reorderThreshold = this._products.get(inventoryProductDb.productId)?.reorderThreshold;
      let inventoryStatus = InventoryStatus.OK;
      if (reorderThreshold != null && reorderThreshold != undefined && inventoryProductDb.quantity < reorderThreshold) {
        inventoryStatus = InventoryStatus.Low;
      }

      return {
        productId: inventoryProductDb.productId,
        productName: this._products.get(inventoryProductDb.productId)?.name ?? '',
        category: this._products.get(inventoryProductDb.productId)?.category ?? '',
        quantity: inventoryProductDb.quantity,
        unitPrice: unitPrice,
        totalPrice: totalPrice,
        reorderThreshold: reorderThreshold,
        inventoryStatus: inventoryStatus,
        inventoryStatusName: this._displayInventoryStatusMap.get(inventoryStatus) ?? '',
        imageUrl: this._products.get(inventoryProductDb.productId)?.imageUrl ?? '',
        inventories: [],
      };
    });

    return JSON.parse(JSON.stringify(inventoryProducts));
  }

  getPageInventoryProducts(page: number, pageSize: number, query: string, category: string, sort: string): Pagination<InventoryProduct> {
    let filteredInventoryProducts = this.getInventoryProducts();
    if (query) {
      query = query?.toLocaleLowerCase();
      filteredInventoryProducts = filteredInventoryProducts.filter(inventoryProduct => {
        return inventoryProduct.productName.toLocaleLowerCase().includes(query);
      });
    }
    if (category) {
      filteredInventoryProducts = filteredInventoryProducts.filter(inventoryProduct => {
        return inventoryProduct.category === category;
      });
    }
    let sortData = sort.split(':');
    let sortColumn = sortData.at(0);
    let sortDirection = sortData.at(1);
    if (sortColumn) {
      filteredInventoryProducts = this._utilityService.sortArray(filteredInventoryProducts, sortColumn, sortDirection == 'asc');
    }

    return this.paginateItems(filteredInventoryProducts, page, pageSize);
  }

  getInventoryProductById(productId: number, sort?: string): InventoryProduct | null {
    const inventoryProductDb = this._productInventory.get(productId);
    if (!inventoryProductDb || inventoryProductDb.quantity <= 0) {
      return null;
    }

    const unitPrice = this._products.get(inventoryProductDb.productId)?.unitPrice ?? 0;
    const totalPrice = inventoryProductDb.quantity * unitPrice;
    const reorderThreshold = this._products.get(inventoryProductDb.productId)?.reorderThreshold;
    let inventoryStatus = InventoryStatus.OK;
    if (reorderThreshold != null && reorderThreshold != undefined && inventoryProductDb.quantity < reorderThreshold) {
      inventoryStatus = InventoryStatus.Low;
    }
    let filteredInventories = inventoryProductDb.inventories.filter((inventory) => {
      return inventory.quantity > 0;
    });
    if (sort) {
      let sortData = sort.split(':');
      let sortColumn = sortData.at(0);
      let sortDirection = sortData.at(1);
      if (sortColumn) {
        filteredInventories = this._utilityService.sortArray(filteredInventories, sortColumn, sortDirection == 'asc');
      }
    }

    return {
      productId: inventoryProductDb.productId,
      productName: this._products.get(inventoryProductDb.productId)?.name ?? '',
      category: this._products.get(inventoryProductDb.productId)?.category ?? '',
      quantity: inventoryProductDb.quantity,
      unitPrice: unitPrice,
      totalPrice: totalPrice,
      reorderThreshold: reorderThreshold,
      inventoryStatus: inventoryStatus,
      inventoryStatusName: this._displayInventoryStatusMap.get(inventoryStatus) ?? '',
      imageUrl: this._products.get(inventoryProductDb.productId)?.imageUrl ?? '',
      inventories: JSON.parse(JSON.stringify(filteredInventories)),
    };
  }

  inventoryInbound(input: InventoryOperation): Inventory {
    const product = this._products.get(input.productId);
    if (!product) {
      throw Error(`This product with id (${input.productId}) not found`);
    }
    const inventoryProduct = this._productInventory.get(input.productId);
    const timestamp = new Date();
    const inboundHistory: InventoryHistoryDb = {
      id: this._currentInventoryHistoryId,
      timestamp: timestamp,
      operationType: InventoryOperationType.Inbound,
      productId: product.id,
      productName: product.name,
      lot: input.lot,
      area: input.area,
      quantity: input.quantity,
      beforeQuantity: input.quantity,
      afterQuantity: input.quantity,
    };

    if (inventoryProduct) {
      const inventory = inventoryProduct.inventories.find(inventory => {
        return inventory.lot == input.lot && inventory.area == input.area;
      });

      if (inventory) {
        inboundHistory.beforeQuantity = inventory.quantity;
        inboundHistory.afterQuantity = inventory.quantity + input.quantity;
        this._inventoryHistory.push(inboundHistory);
        this._currentInventoryHistoryId++;

        inventory.quantity += input.quantity;
        inventoryProduct.quantity += input.quantity;

        return JSON.parse(JSON.stringify(inventory));
      } else {
        inboundHistory.beforeQuantity = 0;
        inboundHistory.afterQuantity = input.quantity;
        this._inventoryHistory.push(inboundHistory);
        this._currentInventoryHistoryId++;

        const newInventory: Inventory = {
          id: this._currentInventoryId,
          productId: input.productId,
          lot: input.lot,
          area: input.area,
          quantity: input.quantity,
        };
        this._currentInventoryId++;
        inventoryProduct.inventories.push(newInventory);
        inventoryProduct.quantity += input.quantity;

        return JSON.parse(JSON.stringify(newInventory));
      }
    } else {
      inboundHistory.beforeQuantity = 0;
      inboundHistory.afterQuantity = input.quantity;
      this._inventoryHistory.push(inboundHistory);
      this._currentInventoryHistoryId++;

      const newInventoryProduct: InventoryProductDb = {
        productId: input.productId,
        quantity: input.quantity,
        inventories: [
          {
            id: this._currentInventoryId,
            productId: input.productId,
            lot: input.lot,
            area: input.area,
            quantity: input.quantity,
          }
        ],
      };
      this._productInventory.set(input.productId, newInventoryProduct);
      this._currentInventoryId++;

      return JSON.parse(JSON.stringify(newInventoryProduct));
    }
  }

  inventoryInboundWithProductName(input: InventoryInboundOperation): Inventory {
    const product = [ ...this._products.values() ].find((product) => {
      return product.name == input.productName;
    });
    if (!product) {
      throw Error(`This product with name (${input.productName}) not found`);
    }
    
    return this.inventoryInbound({
      productId: product.id,
      lot: input.lot,
      area: input.area,
      quantity: input.quantity,
    });
  }

  inventoryOutbound(input: InventoryOperation): Inventory {
    const product = this._products.get(input.productId);
    if (!product) {
      throw Error(`This product with id (${input.productId}) not found`);
    }

    const inventoryProduct = this._productInventory.get(input.productId);
    if (!inventoryProduct) {
      throw Error(`This inventory product with id (${input.productId}) not found`);
    }

    const inventory = inventoryProduct.inventories.find(inventory => {
      return inventory.lot == input.lot && inventory.area == input.area;
    });
    if (!inventory) {
      throw Error(`This inventory with lot (${input.lot}) and area (${input.area}) not found`);
    }
    if (inventory.quantity < input.quantity) {
      throw Error(`Outbound quantity (${input.quantity}) exceed inventory limit (${inventory.quantity})`);
    }

    const timestamp = new Date();
    const outboundHistory: InventoryHistoryDb = {
      id: this._currentInventoryHistoryId,
      timestamp: timestamp,
      operationType: InventoryOperationType.Outbound,
      productId: product.id,
      productName: product.name,
      lot: inventory.lot,
      area: inventory.area,
      quantity: inventory.quantity,
      beforeQuantity: inventory.quantity,
      afterQuantity: inventory.quantity - input.quantity,
    };
    this._inventoryHistory.push(outboundHistory);
    this._currentInventoryHistoryId++;

    inventory.quantity -= input.quantity;
    inventoryProduct.quantity -= input.quantity;

    return JSON.parse(JSON.stringify(inventory));
  }

  inventoryAdjustment(input: InventoryOperation): Inventory {
    const product = this._products.get(input.productId);
    if (!product) {
      throw Error(`This product with id (${input.productId}) not found`);
    }

    const inventoryProduct = this._productInventory.get(input.productId);
    if (!inventoryProduct) {
      throw Error(`This inventory product with id (${input.productId}) not found`);
    }

    const inventory = inventoryProduct.inventories.find(inventory => {
      return inventory.lot == input.lot && inventory.area == input.area;
    });
    if (!inventory) {
      throw Error(`This inventory with lot (${input.lot}) and area (${input.area}) not found`);
    }
    if (input.quantity < 0) {
      throw Error(`Adjustment quantity must be equal or greater than zero`);
    }
    const adjustQuantity = input.quantity - inventory.quantity; // Calculate number of quantity that needs to be add/subtract
    if (adjustQuantity == 0) {
      throw Error(`Adjustment quantity cannot be zero`);
    }

    const timestamp = new Date();
    const adjustmentHistory: InventoryHistoryDb = {
      id: this._currentInventoryHistoryId,
      timestamp: timestamp,
      operationType: InventoryOperationType.Adjustment,
      productId: product.id,
      productName: product.name,
      lot: inventory.lot,
      area: inventory.area,
      quantity: Math.abs(adjustQuantity),
      beforeQuantity: inventory.quantity,
      afterQuantity: inventory.quantity + adjustQuantity,
    };
    this._inventoryHistory.push(adjustmentHistory);
    this._currentInventoryHistoryId++;

    inventory.quantity += adjustQuantity;
    inventoryProduct.quantity += adjustQuantity;

    return JSON.parse(JSON.stringify(inventory));
  }

  inventoryMoveArea(input: InventoryMoveAreaOperation): Inventory {
    const product = this._products.get(input.productId);
    if (!product) {
      throw Error(`This product with id (${input.productId}) not found`);
    }

    const inventoryProduct = this._productInventory.get(input.productId);
    if (!inventoryProduct) {
      throw Error(`This inventory product with id (${input.productId}) not found`);
    }

    const currentAreaInventory = inventoryProduct.inventories.find(inventory => {
      return inventory.lot == input.lot && inventory.area == input.area;
    });
    if (!currentAreaInventory) {
      throw Error(`This inventory with lot (${input.lot}) and area (${input.area}) not found`);
    }

    const timestamp = new Date();
    const moveFromAreaHistory: InventoryHistoryDb = {
      id: this._currentInventoryHistoryId,
      timestamp: timestamp,
      operationType: InventoryOperationType.MoveArea,
      productId: product.id,
      productName: product.name,
      lot: input.lot,
      area: input.area,
      quantity: input.quantity,
      beforeQuantity: currentAreaInventory.quantity,
      afterQuantity: currentAreaInventory.quantity - input.quantity,
    };
    this._inventoryHistory.push(moveFromAreaHistory);
    this._currentInventoryHistoryId++;

    currentAreaInventory.quantity -= input.quantity;

    const newAreaInventory = inventoryProduct.inventories.find(inventory => {
      return inventory.lot == input.lot && inventory.area == input.newArea;
    });
    if (newAreaInventory) {
      const moveToAreaHistory: InventoryHistoryDb = {
        id: this._currentInventoryHistoryId,
        timestamp: timestamp,
        operationType: InventoryOperationType.MoveArea,
        productId: product.id,
        productName: product.name,
        lot: input.lot,
        area: input.newArea,
        quantity: input.quantity,
        beforeQuantity: newAreaInventory.quantity,
        afterQuantity: newAreaInventory.quantity + input.quantity,
      };
      this._inventoryHistory.push(moveToAreaHistory);
      this._currentInventoryHistoryId++;

      newAreaInventory.quantity += input.quantity;

      return JSON.parse(JSON.stringify(newAreaInventory));
    } else {
      const moveToAreaHistory: InventoryHistoryDb = {
        id: this._currentInventoryHistoryId,
        timestamp: timestamp,
        operationType: InventoryOperationType.MoveArea,
        productId: product.id,
        productName: product.name,
        lot: input.lot,
        area: input.newArea,
        quantity: input.quantity,
        beforeQuantity: 0,
        afterQuantity: input.quantity,
      };
      this._inventoryHistory.push(moveToAreaHistory);
      this._currentInventoryHistoryId++;

      const newInventory: Inventory = {
        id: this._currentInventoryId,
        productId: input.productId,
        lot: input.lot,
        area: input.newArea,
        quantity: input.quantity,
      };
      this._currentInventoryId++;
      inventoryProduct.inventories.push(newInventory);

      return JSON.parse(JSON.stringify(newInventory));
    }
  }

  getInventoryHistories(): InventoryHistory[] {
    const inventoryHistory: InventoryHistory[] = [ ...this._inventoryHistory ]
    .map((inventoryHistoryDb) => {
      return {
        ...inventoryHistoryDb,
        operationName: this._displayInventoryOperationMap.get(inventoryHistoryDb.operationType) ?? '',
      };
    });

    return JSON.parse(JSON.stringify(inventoryHistory));
  }

  getPageInventoryHistories(page: number, pageSize: number, query: string, operationType: number | null, sort: string): Pagination<InventoryHistory> {
    let filteredInventoryHistories = this.getInventoryHistories();
    if (query) {
      query = query?.toLocaleLowerCase();
      filteredInventoryHistories = filteredInventoryHistories.filter(inventoryHistory => {
        return inventoryHistory.productName.toLocaleLowerCase().includes(query);
      });
    }
    if (operationType != null && operationType != undefined) {
      filteredInventoryHistories = filteredInventoryHistories.filter(inventoryHistory => {
        return inventoryHistory.operationType === operationType;
      });
    }
    let sortData = sort.split(':');
    let sortColumn = sortData.at(0);
    let sortDirection = sortData.at(1);
    if (sortColumn) {
      filteredInventoryHistories = this._utilityService.sortArray(filteredInventoryHistories, sortColumn, sortDirection == 'asc');
    }

    return this.paginateItems(filteredInventoryHistories, page, pageSize);
  }

  private randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private paginateItems<T>(items: T[], page: number, pageSize: number): Pagination<T> {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    page = Math.max(1, Math.min(page, totalPages)); // Ensure page is within bounds
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return {
      pageSize: pageSize,
      currentPage: page,
      totalItems: items.length,
      items: JSON.parse(JSON.stringify(items.slice(startIndex, endIndex))),
    };
  }
}
