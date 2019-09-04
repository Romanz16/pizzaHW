import { Injectable } from '@angular/core';
import { IDiscount } from '../interfaces/discout.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  discounts: Array<IDiscount> = [
    {
      id: 1,
      title: 'Free pizza',
      text: 'lorem lorem lorem'
    },
    {
      id: 2,
      title: 'Super pizza',
      text: 'lorem lorem lorem'
    },
    {
      id: 3,
      title: '-10% to Drink',
      text: 'lorem lorem lorem -10% to Drink'
    },
    {
      id: 4,
      title: 'Free New pizza 2=3',
      text: 'lorem lorem lorem'
    }
  ];
  constructor() { }

  getData(): Array<IDiscount> {
    return this.discounts;
  }

  setData(obj: IDiscount): void {
    this.discounts.push(obj);
  }

  deleteData(index: number) {
    this.discounts.splice(index, 1);
  }

  updateData(obj: IDiscount, index: number) {
    this.discounts.splice(index, 1, obj);
  }
}
