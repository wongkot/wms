import { Injectable } from '@angular/core';
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
      name: 'iMac 27"',
      description: 'Description for iMac 27"',
      unitPrice: 2499,
      category: 'PC',
      tags: [],
      imageUrl: 'https://flowbite.com/docs/images/products/imac.png',
    },
    {
      id: 6,
      name: 'iPhone 12',
      description: 'Description for iPhone 12',
      unitPrice: 999,
      category: 'Smart Phones',
      tags: [],
      imageUrl: 'https://flowbite.com/docs/images/products/iphone-12.png',
    }
  ];

  getProducts(): Product[] {
    return JSON.parse(JSON.stringify(this.products));
  }
}
