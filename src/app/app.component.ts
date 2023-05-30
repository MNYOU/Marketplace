import {Component, OnInit} from '@angular/core';
import {IProduct} from './models/IProduct';
import {products, products as data} from './data/products';
import {ProductsService} from "./services/products.service";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Маркетплейс'

  ngOnInit(): void {
    // инициализация корзины и
  }

}
