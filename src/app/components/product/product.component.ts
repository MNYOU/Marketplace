import {Component, Input, OnInit} from '@angular/core'
import {IProduct} from "../../models/IProduct";
import {ActivatedRoute} from "@angular/router";
import {Observable, tap} from "rxjs";
import {products} from "../../data/products";
import {ProductsService} from "../../services/products.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {IProductInfo} from "../../models/IProductInfo";
import {Action} from "rxjs/internal/scheduler/Action";
// import * as trace_events from "trace_events";


@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css']
})

export class ProductComponent implements OnInit{

  @Input() product: IProduct

  @Input() details: boolean = false

  @Input() callback = (): void => {}
  // @Input() callback = Action

  // @Input() isFavourites: boolean = false
  //
  // @Input() inShoppingCart: boolean = false
  private _isFavourites: boolean
  private _inShoppingCart: boolean

  constructor(
    private storage: LocalStorageService,
  ) {
    let favourites: IProductInfo[] | null = this.storage.getItem('cart')
    if (favourites == null)
      storage.setItem('favourites', [])

  }

  ngOnInit(): void {
    // console.log(this.product.id)
    // let id = this.route.snapshot.params['id']
    // this.product$ = this.productService.get(id).pipe(tap())
  }

  get isFavourites(): boolean {
    const products: IProductInfo[] | null = this.storage.getItem('favourites')
    if (products == null) return false;
    const productInfo = products.find(p => p.product.id == this.product.id)
    return productInfo != undefined && productInfo.value
  }

  set isFavourites(value: boolean) {
    this.storage.setToArray('favourites', this.product, value)
    // this.storage.setItem(`favourites_${this.product.id}`, value)
    this._isFavourites = value

  }

  get inShoppingCart(): boolean {
    const products: IProductInfo[] | null = this.storage.getItem('cart')
    if (products == null) return false;
    const productInfo = products.find(p => p.product.id == this.product.id)
    return productInfo != undefined && productInfo.value
  }
  set inShoppingCart(value: boolean){
    this.storage.setToArray('cart', this.product, value)
    this._inShoppingCart = value
  }
}
