import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  product: Array<IProduct>;
  constructor(private productService: ProductsService) {
    this.getProdData();
  }

  ngOnInit() {
  }
  private getProdData(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.product = data.filter(prod => prod.idCat === '1');
      },
      err => {
        console.log(err);
      }
    );
  }
}
