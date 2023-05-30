import {Component, OnInit} from '@angular/core';
import {Observable, tap} from "rxjs";
import {IProduct} from "../../models/IProduct";
import {ProductsService} from "../../services/products.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {PageEvent} from "@angular/material/paginator";
import { of } from 'rxjs';
import {defaultTargetBuilders} from "@angular/cdk/schematics";
import {products} from "../../data/products";
import {FilterPipe} from "../../pipes/filter.pipe";
import {FilterService} from "../../services/filter.service";
import {executeBrowserBuilder} from "@angular-devkit/build-angular";
// import loadConfig = require("tailwindcss/loadConfig");

@Component({
  selector: 'app-product-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  title: string = 'Marketplace';
  loading = false

  products$: Observable<IProduct[]>

  categories$: Observable<string[]>

  term = ''

  category = 'all'

  orderParam = 'title'

  sortOrder = 'asc'

  pageEvent: PageEvent;

  pageIndex:number = 0;

  pageSize:number = 6;

  length:number;

  constructor(
    private productsService: ProductsService,
    private storage: LocalStorageService,
    private filter: FilterService
  ) {
  }

  public get favouritesProducts(): IProduct[] {
    return this.storage.getItem("favourites")
  }

  ngOnInit(): void {
    this.loading = true
    this.doSomething(new PageEvent(),false)
    this.categories$ = this.productsService.getCategories()
  }

  doSomething(event: PageEvent, flag: boolean) {
    this.loading = true;
    this.productsService.getAll().subscribe(data => {
      data = this.filter.transform(data, this.favouritesProducts, this.orderParam, this.sortOrder, this.category, this.term);
      this.length = data.length
      if (flag)
      {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        // console.log(this.pageIndex)
        // console.log(this.pageSize)
      }
      console.log(this.length)
      console.log((this.pageIndex + 1) * this.pageSize)
      if (this.length < (this.pageIndex + 1) * this.pageSize && this.pageIndex != 0)
      {
        console.log(0)
        this.pageIndex = 0
      }
      data = data.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize)

      this.products$ = of(data)
      this.loading = false;
    }
    )
    return event;
  }
}
