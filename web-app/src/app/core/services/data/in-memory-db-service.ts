import { Injectable } from '@angular/core';
import { Pagination } from '@app/core/models/pagination';
import { Product } from '@app/modules/product/models/product';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDbService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Apple Watch #1',
      description: 'Description for Apple Watch',
      unitPrice: 599,
      category: 'Smart Watches',
      tags: [],
      imageUrl: 'https://flowbite.com/docs/images/products/apple-watch.png',
    },
    {
      id: 2,
      name: 'Apple Watch #2',
      description: 'Description for Apple Watch',
      unitPrice: 599,
      category: 'Smart Watches',
      tags: [],
      imageUrl: 'https://flowbite.com/docs/images/products/apple-watch.png',
    },
    {
      id: 3,
      name: 'Apple Watch #3',
      description: 'Description for Apple Watch',
      unitPrice: 599,
      category: 'Smart Watches',
      tags: [],
      imageUrl: 'https://flowbite.com/docs/images/products/apple-watch.png',
    },
    {
      id: 4,
      name: 'Apple Watch #4',
      description: 'Description for Apple Watch',
      unitPrice: 599,
      category: 'Smart Watches',
      tags: [],
      imageUrl: 'https://flowbite.com/docs/images/products/apple-watch.png',
    },
    {
      id: 5,
      name: 'iMac 27" #1',
      description: 'Description for iMac 27"',
      unitPrice: 2499,
      category: 'PC',
      tags: [],
      imageUrl: 'https://flowbite.com/docs/images/products/imac.png',
    },
    {
      id: 6,
      name: 'iMac 27" #2',
      description: 'Description for iMac 27"',
      unitPrice: 2499,
      category: 'PC',
      tags: [],
      imageUrl: 'https://flowbite.com/docs/images/products/imac.png',
    },
    {
      id: 7,
      name: 'iMac 27" #3',
      description: 'Description for iMac 27"',
      unitPrice: 2499,
      category: 'PC',
      tags: [],
      imageUrl: 'https://flowbite.com/docs/images/products/imac.png',
    },
    {
      id: 8,
      name: 'iMac 27" #4',
      description: 'Description for iMac 27"',
      unitPrice: 2499,
      category: 'PC',
      tags: [],
      imageUrl: 'https://flowbite.com/docs/images/products/imac.png',
    },
    {
      id: 9,
      name: 'iPhone 12 #1',
      description: 'Description for iPhone 12',
      unitPrice: 999,
      category: 'Smart Phones',
      tags: [],
      imageUrl: 'https://flowbite.com/docs/images/products/iphone-12.png',
    },
    {
      id: 10,
      name: 'iPhone 12 #2',
      description: 'Description for iPhone 12',
      unitPrice: 999,
      category: 'Smart Phones',
      tags: [],
      imageUrl: 'https://flowbite.com/docs/images/products/iphone-12.png',
    },
    {
      id: 11,
      name: 'iPhone 12 #3',
      description: 'Description for iPhone 12',
      unitPrice: 999,
      category: 'Smart Phones',
      tags: [],
      imageUrl: 'https://flowbite.com/docs/images/products/iphone-12.png',
    },
    {
      id: 12,
      name: 'iPhone 12 #4',
      description: 'Description for iPhone 12',
      unitPrice: 999,
      category: 'Smart Phones',
      tags: [],
      imageUrl: 'https://flowbite.com/docs/images/products/iphone-12.png',
    },
  ];

  getProducts(): Product[] {
    return JSON.parse(JSON.stringify(this.products));
  }

  getPageProducts(page: number, pageSize: number, query: string, category: string, sort: string): Pagination<Product> {
    let filteredProducts = [ ...this.products ];
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
      let columnType = this.products.at(0) ? typeof(Object(this.products.at(0))[sortColumn]) : 'string';
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
