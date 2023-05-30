import { Injectable } from '@angular/core';
import {IProduct} from "../models/IProduct";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  transform(products: IProduct[], favoritesProducts: IProduct[], orderParam: string, sortOrder: string, category: string, name: string): IProduct[] {
    products = this.filterByCategory(products, favoritesProducts, category);
    products = this.filterByName(products, name)
    return this.sort(products, orderParam, sortOrder);
  }

  filterByCategory(products: IProduct[], favouritesProducts: IProduct[],  category: string): IProduct[] {
    if (category == 'all')
      return products
    if (category == 'favourites') {
      return products.filter(p => favouritesProducts.find(f => f.id == p.id) != undefined)
    }
    return products.filter(p => p.category == category)
  }

  filterByName(products: IProduct[], name: string): IProduct[] {
    return products.filter(p => p.title.toLowerCase().includes(name.toLowerCase()))
  }

  sort(products: IProduct[], param: string, sortOrder: string): IProduct[] {
    if (param == 'title')
      products = products.sort((a,b) =>  {
        if (a.title > b.title) return 1
        if (a.title < b.title) return -1
        return 0
      });
    else if (param == 'price')
      products = products.sort((a,b) => a.price - b.price)
    else if (param == 'popularity')
      products = products.sort((a,b) => a.rating.count - b.rating.count)
    else if (param == 'rating')
      products = products.sort((a,b) => a.rating.rate - b.rating.rate)
    else
      products = products.sort()
    if (sortOrder == 'des')
      products.reverse()
    return products
  }
}
