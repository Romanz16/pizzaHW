import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 products: Array<IProduct> = [
  {
    id: 1,
    title: 'Піца La П’єц',
    text: 'соус томатний, шинка, баварські ковбаски, сир моцарела, ковбаса салямі, прошуто.',
    size: '30 см',
    weight: '460 гр',
    price: 157,
    idCat: 1
  },
  {
    id: 2,
    title: 'Капрічоза',
    text: 'соус томатний, сир моцарела, шинка, свіжі гриби.',
    size: '30 см',
    weight: '430 гр',
    price: 141,
    idCat: 1
  },
  {
    id: 3,
    title: 'Цезаріо',
    text: 'соус вершковий, помідори, хрусткий салат, пармезан, куряче мясо, сир моцарела, перепелині яйця.',
    size: '30 см',
    weight: '580 гр',
    price: 182,
    idCat: 1
  },
  {
    id: 4,
    title: 'Інсалата ді Сальмоне',
    text: 'рукола, помідор чері, огірок, салат айсберг, соус айолі, пармезан, лосось, перепелине яйце, кунжут',
    size: '',
    weight: '285 гр',
    price: 134,
    idCat: 2
  },
  {
    id: 5,
    title: 'Coca Cola — 0,5 л',
    text: '',
    size: '',
    weight: '',
    price: 24,
    idCat: 3
  },
 ]
  constructor() { }
  getData(): Array<IProduct> {
    return this.products;
  }

  setData(obj: IProduct): void {
    this.products.push(obj);
  }

  deleteData(index: number) {
    this.products.splice(index, 1);
  }

  updateData(obj: IProduct, index: number) {
    this.products.splice(index, 1, obj);
  }
}
