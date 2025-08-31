import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-detail',
  standalone: false,
  templateUrl: './inventory-detail-page.html',
  styleUrl: './inventory-detail-page.css'
})
export class InventoryDetailPage implements OnInit {
  private _productId!: number;
  private _route = inject(ActivatedRoute);

  ngOnInit(): void {
    this._productId = Number(this._route.snapshot.paramMap.get('product-id'));
  }
}
