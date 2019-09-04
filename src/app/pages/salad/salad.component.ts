import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-salad',
  templateUrl: './salad.component.html',
  styleUrls: ['./salad.component.scss']
})
export class SaladComponent implements OnInit {
  salads: Array<IProduct>;
  constructor(private productService: ProductsService) {
    this.getProdData();
  }

  ngOnInit() {
  }
  private getProdData(): void {
    this.salads = this.productService.getData().filter(prod => prod.idCat === 2);
  }
}
