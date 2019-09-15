import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {
  title: string = 'Напої';
  drinks: Array<IProduct>;
  constructor(private productService: ProductsService) {
    this.getProdData();
  }

  ngOnInit() {
  }
  private getProdData(): void {
    this.productService.getProducts().subscribe(
      myArray => {
        this.drinks = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as IProduct;
        }).filter(prod => prod.idCat === 'drinks');
      }
    );
  }
}
