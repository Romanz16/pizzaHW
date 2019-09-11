import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { PizzaComponent } from './pages/pizza/pizza.component';
import { SaladComponent } from './pages/salad/salad.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { AboutComponent } from './pages/about/about.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { DiscountDetailsComponent } from './pages/discount-details/discount-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'discount', component: DiscountComponent},
  {path: 'discount/:id', component: DiscountDetailsComponent},
  {path: 'pizza', component: PizzaComponent},
  {path: 'pizza/:id', component: ProductDetailsComponent},
  {path: 'salad', component: SaladComponent},
  {path: 'drinks', component: DrinksComponent},
  {path: 'about', component: AboutComponent},
  {path: 'admin', component: AdminComponent, children: [
    {path: '', redirectTo: 'category', pathMatch: 'full'},
    {path: 'category', component: AdminCategoryComponent},
    {path: 'products', component: AdminProductsComponent},
    {path: 'discount', component: AdminDiscountComponent},
    {path: 'orders', component: AdminOrdersComponent}
  ]},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
