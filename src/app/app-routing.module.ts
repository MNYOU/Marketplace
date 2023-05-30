import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from "./components/product/product.component";
import {ProductsPageComponent} from "./pages/products-page/products-page.component";
import {AboutPageComponent} from "./pages/about-page/about-page.component";
import {CartPageComponent} from "./pages/cart-page/cart-page.component";
import {FavouritesPageComponent} from "./pages/favourites-page/favourites-page.component";
import {ProductPageComponent} from "./pages/product-page/product-page.component";

const routes: Routes = [
  {path: '', component: AboutPageComponent},
  {path: 'products', component: ProductsPageComponent},
  {path: 'products/:id', component: ProductPageComponent},
  {path: 'favourites', component: FavouritesPageComponent},
  {path: 'cart', component: CartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
