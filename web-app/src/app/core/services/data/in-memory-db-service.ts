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
import {
  AREA_COLUMNS,
  AREA_ROWS,
  DATE_FORMAT,
  PRODUCT_CATEGORY_CABLES,
  PRODUCT_CATEGORY_COMPUTERS,
  PRODUCT_CATEGORY_MISC,
  PRODUCT_CATEGORY_NETWORKING,
  PRODUCT_CATEGORY_PERIPHERALS,
  ZONE_PREFIXES,
} from '@app/core/constants/app';
import { InventoryOperation } from '@app/modules/inventory/models/inventory-operation';
import { InventoryMoveAreaOperation } from '@app/modules/inventory/models/inventory-move-area-operation';
import { InventoryInboundOperation } from '@app/modules/inventory/models/inventory-inbound-operation';
import { InventoryHistoryDb } from '@app/modules/inventory-history/models/inventory-history-db';
import { InventoryOperationType } from '@app/modules/inventory-history/enums/inventory-operation-type';
import { InventoryHistory } from '@app/modules/inventory-history/models/inventory-history';
import { formatDate } from '@angular/common';
import { InventoryDashboardApiOutput } from '@app/modules/dashboard/models/inventory-dashboard-api-output';
import { NotificationService } from '@app/core/services/state/notification-service';

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
  private _notificationService = inject(NotificationService);
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
    let inventoryProductRandomParameters = new Map<number, InventoryProductRandomParam>();

    // Products
    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Notebook',
        description: 'Quad-Core, 16GB RAM, 512GB SSD, 16 inch, LCD',
        unitPrice: 15000,
        category: PRODUCT_CATEGORY_COMPUTERS,
        tags: [],
        reorderThreshold: 50,
        imageUrl: './product/images/notebook.png',
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 5,
      outboundProbability: 40,
      maxTotalGeneratedQuantity: 40,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'PC',
        description: '8-Core, 32GB RAM, 1TB SSD',
        unitPrice: 22000,
        category: PRODUCT_CATEGORY_COMPUTERS,
        tags: [],
        reorderThreshold: 40,
        imageUrl: './product/images/pc.png',
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 3,
      outboundProbability: 10,
      maxTotalGeneratedQuantity: 15,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Server',
        description: '32-Core, 64GB RAM, 2TB SSDx2, 4TB HDDx2',
        unitPrice: 35000,
        category: PRODUCT_CATEGORY_COMPUTERS,
        tags: [],
        imageUrl: './product/images/server.png',
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 1,
      outboundProbability: 0,
      maxTotalGeneratedQuantity: 3,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Tablet',
        description: '16GB RAM, 512GB, 12.5 inch, LCD',
        unitPrice: 17500,
        category: PRODUCT_CATEGORY_COMPUTERS,
        tags: [],
        imageUrl: './product/images/tablet.png',
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 2,
      outboundProbability: 20,
      maxTotalGeneratedQuantity: 10,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Power Strip',
        description: '6 Sockets, 2m Cable, 1200 W',
        unitPrice: 1000,
        category: PRODUCT_CATEGORY_MISC,
        tags: [],
        imageUrl: './product/images/power_strip.png',
        reorderThreshold: 15,
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 2,
      outboundProbability: 20,
      maxTotalGeneratedQuantity: 10,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'NAS',
        description: '4 Bays, 8TB HDDx4, ARM 4-Core, 2GB RAM',
        unitPrice: 23500,
        category: PRODUCT_CATEGORY_NETWORKING,
        tags: [],
        imageUrl: './product/images/nas.png',
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 1,
      outboundProbability: 0,
      maxTotalGeneratedQuantity: 2,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Switching Hub',
        description: '3x 10/100/1000Mbps Ports, LED Indicator',
        unitPrice: 500,
        category: PRODUCT_CATEGORY_NETWORKING,
        tags: [],
        imageUrl: './product/images/switching_hub.png',
        reorderThreshold: 5,
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 1,
      outboundProbability: 10,
      maxTotalGeneratedQuantity: 5,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Wi-Fi Router',
        description: '2.4/5GHz, 1200Mbps, 3x Antennas, 4x LAN Ports',
        unitPrice: 750,
        category: PRODUCT_CATEGORY_NETWORKING,
        tags: [],
        imageUrl: './product/images/wifi_router.png',
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 1,
      outboundProbability: 0,
      maxTotalGeneratedQuantity: 3,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Headphones (Black)',
        description: 'Noise Cancelling, USB/Bluetooth',
        unitPrice: 3500,
        category: PRODUCT_CATEGORY_PERIPHERALS,
        tags: [],
        imageUrl: './product/images/headphones_dark.png',
        reorderThreshold: 15,
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 4,
      outboundProbability: 30,
      maxTotalGeneratedQuantity: 10,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Headphones (White)',
        description: 'Noise Cancelling, USB/Bluetooth',
        unitPrice: 3500,
        category: PRODUCT_CATEGORY_PERIPHERALS,
        tags: [],
        imageUrl: './product/images/headphones_light.png',
        reorderThreshold: 15,
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 0,
      outboundProbability: 0,
      maxTotalGeneratedQuantity: 0,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Inkjet Printer',
        description: 'USB/Wi-Fi, 45 ppm, Resolution 4800 x 1200 dpi',
        unitPrice: 4750,
        category: PRODUCT_CATEGORY_PERIPHERALS,
        tags: [],
        imageUrl: './product/images/inkjet_printer.png',
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 1,
      outboundProbability: 0,
      maxTotalGeneratedQuantity: 2,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Laser Printer',
        description: 'USB/Wi-Fi, 100 ppm, Resolution 6400 x 1200 dpi',
        unitPrice: 16500,
        category: PRODUCT_CATEGORY_PERIPHERALS,
        tags: [],
        imageUrl: './product/images/laser_printer.png',
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 1,
      outboundProbability: 0,
      maxTotalGeneratedQuantity: 1,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Monitor',
        description: '27 inch, Full HD, IPS, 2x HDMI, 1x DisplayPort',
        unitPrice: 4500,
        category: PRODUCT_CATEGORY_PERIPHERALS,
        tags: [],
        imageUrl: './product/images/monitor.png',
        reorderThreshold: 10,
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 3,
      outboundProbability: 30,
      maxTotalGeneratedQuantity: 15,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Mouse (Blue)',
        description: '2.4 GHz Wireless, Optical, 1000 DPI',
        unitPrice: 950,
        category: PRODUCT_CATEGORY_PERIPHERALS,
        tags: [],
        imageUrl: './product/images/mouse_blue.png',
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 0,
      outboundProbability: 0,
      maxTotalGeneratedQuantity: 0,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Mouse (Red)',
        description: '2.4 GHz Wireless, Optical, 1000 DPI',
        unitPrice: 950,
        category: PRODUCT_CATEGORY_PERIPHERALS,
        tags: [],
        imageUrl: './product/images/mouse_red.png',
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 3,
      outboundProbability: 20,
      maxTotalGeneratedQuantity: 15,
    });
    this._currentProductId++;
    
    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Keyboard',
        description: 'Wired/Wireless, QWERTY, Red Switch',
        unitPrice: 2500,
        category: PRODUCT_CATEGORY_PERIPHERALS,
        tags: [],
        imageUrl: './product/images/keyboard.png',
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 0,
      maxQuantityPerMonth: 2,
      outboundProbability: 10,
      maxTotalGeneratedQuantity: 15,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'Ethernet Cable',
        description: 'Cat 6, 1m, 1Gbps',
        unitPrice: 120,
        category: PRODUCT_CATEGORY_CABLES,
        tags: [],
        imageUrl: './product/images/ethernet_cable.png',
        reorderThreshold: 20,
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 4,
      maxQuantityPerMonth: 8,
      outboundProbability: 70,
      maxTotalGeneratedQuantity: 15,
    });
    this._currentProductId++;

    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'USB Cable',
        description: 'Type-A to Type-A, 0.5m, USB 3.0',
        unitPrice: 60,
        category: PRODUCT_CATEGORY_CABLES,
        tags: [],
        imageUrl: './product/images/usb_a.png',
        reorderThreshold: 20,
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 2,
      maxQuantityPerMonth: 5,
      outboundProbability: 70,
      maxTotalGeneratedQuantity: 25,
    });
    this._currentProductId++;
    
    this._products.set(this._currentProductId,
      {
        id: this._currentProductId,
        name: 'HDMI Cable',
        description: 'HDMI 2.0, 2m, 4K @ 60Hz',
        unitPrice: 100,
        category: PRODUCT_CATEGORY_CABLES,
        tags: [],
        imageUrl: './product/images/hdmi.png',
        reorderThreshold: 10,
      });
    inventoryProductRandomParameters.set(this._currentProductId, {
      minQuantityPerMonth: 3,
      maxQuantityPerMonth: 6,
      outboundProbability: 50,
      maxTotalGeneratedQuantity: 20,
    });
    this._currentProductId++;

    // Product inventory
    const totalGeneratedMonths = 8;
    for (let product of [...this._products.values()]) {
      let inventories: Inventory[] = [];
      let totalQuantity = 0;
      const randomParams = inventoryProductRandomParameters.get(product.id);

      if (!randomParams || randomParams.maxTotalGeneratedQuantity == 0 || randomParams.maxQuantityPerMonth == 0) {
        continue;
      }

      // Create random inventories of current product
      // Reverse index key in order to generate lot number from oldest to newest
      for (let monthOffset of [...Array(totalGeneratedMonths).keys()].reverse()) {
        if (totalQuantity >= randomParams.maxTotalGeneratedQuantity) {
          continue;
        }
        let quantity = this.randInt(randomParams.minQuantityPerMonth, randomParams.maxQuantityPerMonth);
        if (quantity <= 0) {
          continue;
        }

        const timestamp = new Date();
        timestamp.setMonth(timestamp.getMonth() - monthOffset);
        // Generate random date if the current date is not in this month
        if (monthOffset !== 0) {
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
        // Prevent quantity exceed maximum total quantity
        quantity = Math.min(quantity, randomParams.maxTotalGeneratedQuantity - totalQuantity);
        
        const inventory: Inventory = {
          id: this._currentInventoryId,
          productId: product.id,
          lot: lot,
          area: area,
          quantity: quantity,
        };
        totalQuantity += quantity;
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

        // Remove inventory randomly
        if (this.randInt(1, 100) <= randomParams.outboundProbability) {
          const currentTime = new Date();
          const outboundTimestamp = new Date(timestamp);
           // Make outbound timestamp newer than inbound timestamp
          outboundTimestamp.setMinutes(outboundTimestamp.getMinutes() + this.randInt(1, 59));
          outboundTimestamp.setHours(outboundTimestamp.getHours() + this.randInt(0, 2));
          const outboundHistory: InventoryHistoryDb = {
            id: this._currentInventoryHistoryId,
            timestamp: outboundTimestamp >= currentTime ? currentTime : outboundTimestamp, // Avoid future timestamp
            operationType: InventoryOperationType.Outbound,
            productId: product.id,
            productName: product.name,
            lot: inventory.lot,
            area: inventory.area,
            quantity: inventory.quantity,
            beforeQuantity: inventory.quantity,
            afterQuantity: 0,
          };
          totalQuantity -= inventory.quantity;
          this._inventoryHistory.push(outboundHistory);
          this._currentInventoryHistoryId++;
        } else {
          inventories.push(inventory);
        }
      }

      // Create inventory product
      this._productInventory.set(product.id, {
        productId: product.id,
        quantity: totalQuantity,
        inventories: inventories,
      });
    }
  }

  hasProductName(name: string): boolean {
    return [...this._products.values()].some(product => product.name == name);
  }

  hasProductNameFromOtherId(name: string, id: number): boolean {
    return [...this._products.values()].some(product => product.name == name && product.id !== id);
  }

  getProducts(): Product[] {
    return JSON.parse(JSON.stringify([...this._products.values()]));
  }

  getProductNames(query: string, limit: number): string[] {
    let filteredProductNames = this._utilityService.sortArray([...this._products.values()], 'name', true)
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
    let filteredProducts = [...this._products.values()];
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
      const inventoryProductBeforeQuantity = this._productInventory.get(id)!.quantity;
      this._notificationService.notify({
        productName: deleteProduct.name,
        quantityBefore: inventoryProductBeforeQuantity,
        quantityAfter: 0,
        read: false,
        timestamp: new Date(),
      });

      this._productInventory.delete(id);
    }

    return deleteProduct;
  }

  getInventoryProducts(): InventoryProduct[] {
    const inventoryProducts: InventoryProduct[] = [...this._productInventory.values()].filter((inventoryProductDb) => {
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

        const inventoryProductBeforeQuantity = inventoryProduct.quantity;
        const inventoryProductAfterQuantity = inventoryProductBeforeQuantity + input.quantity;
        inventory.quantity += input.quantity;
        inventoryProduct.quantity = inventoryProductAfterQuantity;

        this._notificationService.notify({
          productName: product.name,
          quantityBefore: inventoryProductBeforeQuantity,
          quantityAfter: inventoryProductAfterQuantity,
          read: false,
          timestamp: timestamp,
        });

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

        const inventoryProductBeforeQuantity = inventoryProduct.quantity;
        const inventoryProductAfterQuantity = inventoryProductBeforeQuantity + input.quantity;
        inventoryProduct.inventories.push(newInventory);
        inventoryProduct.quantity = inventoryProductAfterQuantity;

        this._notificationService.notify({
          productName: product.name,
          quantityBefore: inventoryProductBeforeQuantity,
          quantityAfter: inventoryProductAfterQuantity,
          read: false,
          timestamp: timestamp,
        });

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

      this._notificationService.notify({
        productName: product.name,
        quantityBefore: 0,
        quantityAfter: input.quantity,
        read: false,
        timestamp: timestamp,
      });

      return JSON.parse(JSON.stringify(newInventoryProduct));
    }
  }

  inventoryInboundWithProductName(input: InventoryInboundOperation): Inventory {
    const product = [...this._products.values()].find((product) => {
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
      quantity: input.quantity,
      beforeQuantity: inventory.quantity,
      afterQuantity: inventory.quantity - input.quantity,
    };
    this._inventoryHistory.push(outboundHistory);
    this._currentInventoryHistoryId++;

    const inventoryProductBeforeQuantity = inventoryProduct.quantity;
    const inventoryProductAfterQuantity = inventoryProductBeforeQuantity - input.quantity;
    inventory.quantity -= input.quantity;
    inventoryProduct.quantity = inventoryProductAfterQuantity;

    this._notificationService.notify({
      productName: product.name,
      quantityBefore: inventoryProductBeforeQuantity,
      quantityAfter: inventoryProductAfterQuantity,
      read: false,
      timestamp: timestamp,
    });

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

    const inventoryProductBeforeQuantity = inventoryProduct.quantity;
    const inventoryProductAfterQuantity = inventoryProductBeforeQuantity + adjustQuantity;
    inventory.quantity += adjustQuantity;
    inventoryProduct.quantity = inventoryProductAfterQuantity;

    this._notificationService.notify({
      productName: product.name,
      quantityBefore: inventoryProductBeforeQuantity,
      quantityAfter: inventoryProductAfterQuantity,
      read: false,
      timestamp: timestamp,
    });

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
    const inventoryHistory: InventoryHistory[] = [...this._inventoryHistory]
      .map((inventoryHistoryDb) => {
        return {
          ...inventoryHistoryDb,
          operationName: this._displayInventoryOperationMap.get(inventoryHistoryDb.operationType) ?? '',
        };
      });

    return JSON.parse(JSON.stringify(inventoryHistory));
  }

  getPageInventoryHistories(page: number, pageSize: number, query: string, operationType: number | null, startDate: string, endDate: string, sort: string): Pagination<InventoryHistory> {
    let filteredInventoryHistories = this.getInventoryHistories();
    const filterStartDate = new Date(startDate);
    const filterEndDate = new Date(endDate);
    const actualEndDate = new Date(endDate);
    actualEndDate.setDate(actualEndDate.getDate() + 1);

    filteredInventoryHistories = filteredInventoryHistories.filter(inventoryHistory => {
      const timestamp = new Date(inventoryHistory.timestamp);
      return timestamp >= filterStartDate && timestamp < filterEndDate;
    });
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

  getRecentInventoryHistories(limit: number): InventoryHistory[] {
    const sortedInventoryHistories = this._utilityService.sortArray(this.getInventoryHistories(), 'timestamp', false);
    return sortedInventoryHistories.slice(0, limit);
  }

  getDashboardData(): InventoryDashboardApiOutput {
    const totalMonths = 6;
    const timestamp = new Date();
    const inboundByMonth = new Map<string, number>();
    const outboundByMonth = new Map<string, number>();

    for (let offset = totalMonths - 1; offset >= 0; offset--) {
      const month = new Date(timestamp.getFullYear(), timestamp.getMonth() - offset, 1);
      inboundByMonth.set(formatDate(month, DATE_FORMAT, 'en-Us'), 0);
      outboundByMonth.set(formatDate(month, DATE_FORMAT, 'en-Us'), 0);
    }

    for (let inventoryHistory of this._inventoryHistory) {
      const timestamp = new Date(inventoryHistory.timestamp);
      const historyMonth = new Date(timestamp.getFullYear(), timestamp.getMonth(), 1);
      const monthKey = formatDate(historyMonth, DATE_FORMAT, 'en-Us');

      if (!inboundByMonth.has(monthKey)) { // Check either inbound or outbound map is enough (both have the same key)
        continue;
      }

      if (inventoryHistory.operationType == InventoryOperationType.Inbound) {
        const currentQuantity = inboundByMonth.get(monthKey) ?? 0;
        inboundByMonth.set(monthKey, currentQuantity + inventoryHistory.quantity);
      }

      if (inventoryHistory.operationType == InventoryOperationType.Outbound) {
        const currentQuantity = outboundByMonth.get(monthKey) ?? 0;
        outboundByMonth.set(monthKey, currentQuantity + inventoryHistory.quantity);
      }

      if (inventoryHistory.operationType == InventoryOperationType.Adjustment) {
        const hasNegativeQuantity = inventoryHistory.beforeQuantity > inventoryHistory.afterQuantity;
        if (hasNegativeQuantity) {
          const currentQuantity = outboundByMonth.get(monthKey) ?? 0;
          outboundByMonth.set(monthKey, currentQuantity + inventoryHistory.quantity);
        } else {
          const currentQuantity = inboundByMonth.get(monthKey) ?? 0;
          inboundByMonth.set(monthKey, currentQuantity + inventoryHistory.quantity);
        }
      }
    }

    const totalInboundByMonth = [...inboundByMonth.values()];
    const totalOutboundByMonth = [...outboundByMonth.values()];
    const thisMonthTotalInbound = totalInboundByMonth.at(totalMonths - 1) ?? 0;
    const thisMonthTotalOutbound = totalOutboundByMonth.at(totalMonths - 1) ?? 0;
    const lastMonthTotalInbound = totalInboundByMonth.at(totalMonths - 2) ?? 0;
    const lastMonthTotalOutbound = totalOutboundByMonth.at(totalMonths - 2) ?? 0;
    const inboundBarChartData: [string, number][] = [...inboundByMonth.entries()].map((keyValue) => {
      const date = new Date(keyValue[0]);
      const monthName = date.toLocaleString('en-Us', { month: 'short' });

      return [monthName, keyValue[1]];
    });
    const outboundBarChartData: [string, number][] = [...outboundByMonth.entries()].map((keyValue) => {
      const date = new Date(keyValue[0]);
      const monthName = date.toLocaleString('en-Us', { month: 'short' });

      return [monthName, keyValue[1]];
    });

    const totalInventoryByCategory = new Map<string, number>();
    let totalLowInventory = 0;
    for (let productInventory of this._productInventory.values()) {
      const product = this._products.get(productInventory.productId);
      if (!product) {
        continue;
      }

      if (product.category) {
        const quantity = totalInventoryByCategory.get(product.category) ?? 0;
        totalInventoryByCategory.set(product.category, quantity + productInventory.quantity);
      }
      if (productInventory.quantity > 0 && product.reorderThreshold && productInventory.quantity < product.reorderThreshold) {
        totalLowInventory++;
      }
    }
    const pieChartData: [string, number][] = [...totalInventoryByCategory.entries()].map((keyValue) => {
      return [keyValue[0], keyValue[1]];
    });

    return {
      inboundBarChartSeries: inboundBarChartData,
      outboundBarChartSeries: outboundBarChartData,
      pieChartSeries: pieChartData,
      currentMonthTotalInbound: thisMonthTotalInbound,
      currentMonthTotalOutbound: thisMonthTotalOutbound,
      totalInboundPercent: lastMonthTotalInbound ? ((thisMonthTotalInbound - lastMonthTotalInbound) / lastMonthTotalInbound) * 100 : null,
      totalOutboundPercent: lastMonthTotalOutbound ? ((thisMonthTotalOutbound - lastMonthTotalOutbound) / lastMonthTotalOutbound) * 100 : null,
      totalLowInventory: totalLowInventory,
    };
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

interface InventoryProductRandomParam {
  minQuantityPerMonth: number;
  maxQuantityPerMonth: number;
  maxTotalGeneratedQuantity: number;
  outboundProbability: number; // Probability between 1 - 100
}
