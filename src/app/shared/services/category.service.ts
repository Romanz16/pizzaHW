import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  category: Array<ICategory> = [
    {
      id: 1,
      title: 'Pizza'
    },
    {
      id: 2,
      title: 'Salad'
    },
    {
      id: 3,
      title: 'Drinks'
    }
  ];
  constructor() { }

  getData(): Array<ICategory> {
    return this.category;
  }

  setData(obj: ICategory): void {
    this.category.push(obj);
  }

  deleteData(index: number) {
    this.category.splice(index, 1);
  }

  updateData(obj: ICategory, index: number) {
    this.category.splice(index, 1, obj);
  }
}
