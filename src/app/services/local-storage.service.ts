import {Injectable, OnInit} from '@angular/core';
import {IProduct} from "../models/IProduct";
import {products} from "../data/products";
import {ProductsService} from "./products.service";
import {IProductInfo} from "../models/IProductInfo";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private productService: ProductsService
  ) {
    // let products: IProduct[] = []
    // productService.getAll().subscribe((data) => products = data)
    // this.setItem()
  }

  getItem(key: string) {
    const item = localStorage.getItem(key);
    return (item) ? JSON.parse(item) : null;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  get countFavourites(): number {
    return this.getItem('favourites')?.length ?? 0
  }

  get countCart(): number {
    return this.getItem('cart')?.length ?? 0
  }

  setToArray(key: string, productValue: IProduct, value: boolean): void {
    let arr: IProductInfo[] = this.getItem(key)
    if (arr === null) {
      this.setItem(key, [])
      arr = this.getItem(key)
    }
    let product = arr.find((p) => p.product.id == productValue.id)
    console.log(product)
    if (product === undefined) {
      console.log(13121231)
      arr.push({product: productValue, value: value})

    }
    else
      product.value = value
    this.setItem(key, arr)
  }
}
