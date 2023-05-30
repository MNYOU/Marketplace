import {Component, OnInit} from '@angular/core';
import {Observable, reduce} from "rxjs";
import {IProduct} from "../../models/IProduct";
import {HttpClient} from "@angular/common/http";
// import * as http from "http";
import {ProductsService} from "../../services/products.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {IProductInfo} from "../../models/IProductInfo";
import {products} from "../../data/products";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  products: IProduct[]

  delivery: number = 20



  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    private storage: LocalStorageService
  ) {
  }

  get productsPrice(): number {
    console.log(this.products)
    return this.products
      .map(p => p.price)
      .reduce((sum: number, productPrice: number) => sum += productPrice, 0);
  }

  get summaryPrice(): number {
    return this.productsPrice + this.delivery;
  }

  buy(): void {
    this.clear()
    alert('Успешно!')
  }

  OnChange() {
    location.reload()
  }

  clear(): void {
    this.storage.setItem('cart', [])
    location.reload()
  }


  ngOnInit(): void {
    let data: IProductInfo[] | null = this.storage.getItem('cart');
    if (data == null)
    {
      this.storage.setItem('cart', [])
      data = []
    }
    this.products = data
      .filter(i => i.value)
      .map((obj) => obj.product)
  }
}
