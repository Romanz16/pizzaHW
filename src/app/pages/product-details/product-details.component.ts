import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId: string;
  view: IProduct;
  constructor(private productService: ProductsService,
              private route: ActivatedRoute,
              private location: Location) {
    this.getMoreDetails();
  }

  ngOnInit() {
  }
  public getMoreDetails() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.getOneProducts(this.productId).subscribe(
      myArray => {
        this.view = { id: myArray.payload.id, ...myArray.payload.data() } as IProduct;
      }
    );
}
  public goBack(): void {
    this.location.back();
  }
}
