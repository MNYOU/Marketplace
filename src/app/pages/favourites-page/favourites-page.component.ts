import {Component, OnInit, Output} from '@angular/core';
import {IProduct} from "../../models/IProduct";
import {HttpClient} from "@angular/common/http";
import {ProductsService} from "../../services/products.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {IProductInfo} from "../../models/IProductInfo";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrls: ['./favourites-page.component.css']
})
export class FavouritesPageComponent implements OnInit{

  // @Output()
  products$: Observable<IProduct[]>

  flag = false;

  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    private storage: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.initializeData()
  }

  initializeData() {
    let data: IProductInfo[] | null = this.storage.getItem('favourites');
    if (data == null)
    {
      this.storage.setItem('favourites', [])
      data = []
    }
    this.products$ = of(data
      .filter(i => i.value)
      .map((obj) => obj.product))
  }


  OnChange(): void {
    location.reload()
    this.flag = !this.flag;
  }
}
