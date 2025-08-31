import { Injectable } from '@angular/core';
import { Pagination } from '@app/core/models/pagination';
import { InventoryStatus } from '@app/modules/inventory/enums/inventory-status';
import { InventoryProduct } from '@app/modules/inventory/models/inventory-product';
import { InventoryProductDb } from '@app/modules/inventory/models/inventory-product-db';
import { AddProduct } from '@app/modules/product/models/add-product';
import { EditProduct } from '@app/modules/product/models/edit-product';
import { Product } from '@app/modules/product/models/product';

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
    const pickInventoryProductCount = 7; // Number for picking top X products for generating inventory product data
    const minRandomQuantity = 10;
    const maxRandomQuantity = 30;
    const firstXProducts = this._products.size > pickInventoryProductCount ? 
      [ ...this._products.values() ].slice(0, pickInventoryProductCount)
      : [ ...this._products.values() ];

    firstXProducts.forEach(product => {
      this._productInventory.set(product.id, {
        productId: product.id,
        quantity: this.randInt(minRandomQuantity, maxRandomQuantity),
        inventories: [],
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
      let firstItem = Object(this._products.entries().next().value?.[1]);
      let columnType = firstItem ? typeof(firstItem[sortColumn]) : 'string';
      if (columnType == 'number') {
        filteredProducts = filteredProducts.sort((p1, p2) => Object(p1)[sortColumn] - Object(p2)[sortColumn]);
        filteredProducts = sortDirection == 'asc' ? filteredProducts : filteredProducts.reverse();
      } else {
        filteredProducts = filteredProducts.sort((p1, p2) => {
          let value1 = String(Object(p1)[sortColumn] ?? '');
          let value2 = String(Object(p2)[sortColumn] ?? '');

          return value1.toLocaleLowerCase().localeCompare(value2.toLocaleLowerCase());
        });
        filteredProducts = sortDirection == 'asc' ? filteredProducts : filteredProducts.reverse();
      }
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

    return JSON.parse(JSON.stringify(editProduct));
  }

  deleteProduct(id: number): Product | null {
    const deleteProduct = this._products.get(id);
    if (!deleteProduct) {
      return null;
    }

    this._products.delete(id);

    return deleteProduct;
  }

  getInventoryProducts(): InventoryProduct[] {
    const inventoryProducts: InventoryProduct[] = [ ...this._productInventory.values() ].map((inventoryProductDb) => {
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
      let firstItem = Object(filteredInventoryProducts.at(0));
      let columnType = firstItem ? typeof(firstItem[sortColumn]) : 'string';
      if (columnType == 'number') {
        filteredInventoryProducts = filteredInventoryProducts.sort((p1, p2) => Object(p1)[sortColumn] - Object(p2)[sortColumn]);
        filteredInventoryProducts = sortDirection == 'asc' ? filteredInventoryProducts : filteredInventoryProducts.reverse();
      } else {
        filteredInventoryProducts = filteredInventoryProducts.sort((p1, p2) => {
          let value1 = String(Object(p1)[sortColumn] ?? '');
          let value2 = String(Object(p2)[sortColumn] ?? '');

          return value1.toLocaleLowerCase().localeCompare(value2.toLocaleLowerCase());
        });
        filteredInventoryProducts = sortDirection == 'asc' ? filteredInventoryProducts : filteredInventoryProducts.reverse();
      }
    }

    return this.paginateItems(filteredInventoryProducts, page, pageSize);
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
