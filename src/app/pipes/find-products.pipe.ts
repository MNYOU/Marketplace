import {Input, Pipe, PipeTransform} from '@angular/core';
import {IProduct} from "../models/IProduct";

@Pipe({
  name: 'findProducts'
})
export class FindProductsPipe implements PipeTransform {

  transform(products: IProduct[], search: string): IProduct[] {
    return products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
  }
}
