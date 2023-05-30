import { Pipe, PipeTransform } from '@angular/core';
import {IProduct} from "../models/IProduct";

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: IProduct[], favouritesProducts: IProduct[],  category: string): IProduct[] {
    if (category == 'all')
      return products
    if (category == 'favourites')
    {
      return products.filter(p => favouritesProducts.find(f => f.id == p.id) != undefined)
    }
    return products.filter(p => p.category == category)
  }
}
