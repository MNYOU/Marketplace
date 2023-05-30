import {Component, OnInit} from '@angular/core';
import {Observable, tap} from "rxjs";
import {IProduct} from "../../models/IProduct";
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{
  title: string = 'Marketplace'
  product$: Observable<IProduct>
  loading: boolean = false

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {
  }


  ngOnInit(): void {
    this.loading = true
    let id: number = this.route.snapshot.params['id'] ?? 1
    this.product$ = this.productService.get(id).pipe(
      tap(
        () => this.loading = false
      ))
    this.product$.subscribe(x => console.log(x))
  }

}
