import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from 'src/app/shared/classes/product.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  adminProducts: Array<IProduct>;
  category: Array<ICategory>;
  title: string;
  text: string;
  weight: string;
  size: string;
  price: string;
  idCat: string;
  src: string = 'https://www.lapiec-pizza.com.ua/wp-content/uploads/2019/03/Insalata-di-Salmone-big-1.jpg';
  editId: number;
  editStatus: boolean;
  constructor(private productService: ProductsService, private categoryService: CategoryService) {
    this.getProdData();
  }

  ngOnInit() {
  }
  private getProdData(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.adminProducts = data;
      },
      err => {
        console.log(err);
      }
    );
    this.categoryService.getCategories().subscribe(
      data => {
        this.category = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  public addProduct(): void {
    const newDis = new Product(1, this.title, this.text, this.size, this.weight, this.price, this.idCat, this.src);
    if (this.adminProducts.length > 0) {
      newDis.id = this.adminProducts.slice(-1)[0].id + 1;
    }
    this.productService.addProduct(newDis).subscribe(
      () => {
        this.getProdData();
      }
    );
    this.title = '';
  }
  public deleteProduct(obj: IProduct): void {
    this.productService.deleteProduct(obj.id).subscribe(
      () => {
        this.getProdData();
      }
    );
  }

  public editProduct(obj: IProduct): void {
    this.title = obj.title;
    this.text = obj.text;
    this.editId = obj.id;
    this.size = obj.size;
    this.weight = obj.weight;
    this.price = obj.price;
    this.idCat = obj.idCat;
    this.editStatus = true;
  }

  public saveEditProduct(): void {
    const editProd = new Product(this.editId, this.title, this.text, this.size, this.weight, this.price, this.idCat, this.src);
    this.productService.editProduct(editProd).subscribe(
      () => {
        this.getProdData();
      }
    );
    this.title = '';
    this.text = '';
    this.size = '';
    this.weight = '';
    this.price = '';
    this.editStatus = false;
  }
}
