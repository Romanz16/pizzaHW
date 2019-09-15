import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from 'src/app/shared/classes/product.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  pageTitle = 'Продукти';
  adminProducts: Array<IProduct>;
  category: Array<ICategory>;
  title = '';
  text = '';
  weight: string;
  size: string;
  price = '';
  idCat = '';
  editId: number;
  editStatus: boolean;
  productImage: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;

  formData: IProduct = {
    id: '',
    title: '',
    text: '',
    idCat: '',
    weight: '',
    size: '',
    price: '',
    src: ''
  };

  sort1: Array<number> = [3, 3, 3, 3, 3, 3, 3];
  // tslint:disable-next-line: max-line-length
  constructor(private productService: ProductsService, private categoryService: CategoryService, private prStorage: AngularFireStorage, private firestore: AngularFirestore) {
    // this.getProdData();
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      myArray => {
        this.category = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );
    this.productService.getProducts().subscribe(
      myArray => {
        this.adminProducts = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );
  }

  public onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    this.firestore.collection('products').add(data);
    this.resetForm();
  }

  public resetForm(form?: NgForm): void {
    if (form != null) {
      form.reset();
    } else {
      this.formData = {
        id: '',
        title: '',
        text: '',
        idCat: '',
        weight: '',
        size: '',
        price: '',
        src: ''
      };
    }
  }

  public deleteProduct(obj: IProduct): void {
    this.firestore.doc('products/' + obj.id).delete();
    this.prStorage.storage.refFromURL(obj.src).delete();
  }

  public editProduct(obj: IProduct): void {
    this.formData = obj;
    this.productImage = obj.src;
    this.editStatus = true;
  }
  public saveEditProduct(form: NgForm): void {
    const data = Object.assign({}, form.value);
    data.src = this.productImage;
    delete data.id;
    this.firestore.doc('products/' + form.value.id).update(data);
    this.resetForm();
    this.editStatus = false;
  }

  public sort(name: string, num: number): void {
    const sortColumn = this.sort1[num];
    this.sort1[0] = 3;
    this.sort1[1] = 3;
    this.sort1[2] = 3;
    this.sort1[3] = 3;
    this.sort1[4] = 3;
    this.sort1[5] = 3;
    this.sort1[6] = 3;
    if (sortColumn !== 2) {
      this.sort1[num] = 2;
      // tslint:disable-next-line: only-arrow-functions
      this.adminProducts.sort(function(a, b) {
        const nameA = a[name];
        const nameB = b[name];
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      this.sort1[num] = 1;
      // tslint:disable-next-line: only-arrow-functions
      this.adminProducts.sort(function(a, b) {
        const nameA = a[name];
        const nameB = b[name];
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    }
  }
  // private getProdData(): void {
  //   this.productService.getProducts().subscribe(
  //     data => {
  //       this.adminProducts = data;
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // this.categoryService.getCategories().subscribe(
  //   data => {
  //     this.category = data;
  //   },
  //   err => {
  //     console.log(err);
  //   }
  // );
  // }

  //   public addProduct(): void {
  //   let check: boolean = true;
  //   if(this.title === '') {
  //   document.getElementById('adminProductTitle').classList.add('is-invalid');
  //   check = false;
  // } else { document.getElementById('adminProductTitle').classList.remove('is-invalid'); }
  // if (this.text === '') {
  //   document.getElementById('adminProductText').classList.add('is-invalid');
  //   check = false;
  // } else { document.getElementById('adminProductText').classList.remove('is-invalid'); }
  // if (this.price === '') {
  //   document.getElementById('adminProductPrice').classList.add('is-invalid');
  //   check = false;
  // } else { document.getElementById('adminProductPrice').classList.remove('is-invalid'); }
  // if (this.idCat === '') {
  //   document.getElementById('adminProductCat').classList.add('is-invalid');
  //   check = false;
  // } else { document.getElementById('adminProductCat').classList.remove('is-invalid'); }

  // if (check) {
  //   const newDis = new Product(1, this.title, this.text, this.size, this.weight, this.price, this.idCat, this.productImage);
  //   if (this.adminProducts.length > 0) {
  //     newDis.id = this.adminProducts.slice(-1)[0].id + 1;
  //   }
  //   this.productService.addProduct(newDis).subscribe(
  //     () => {
  //       this.getProdData();
  //     }
  //   );
  //   this.title = '';
  //   this.text = '';
  //   this.size = '';
  //   this.weight = '';
  //   this.price = '';
  //   this.productImage = '';
  // };
  //   }

  //   public deleteProduct(obj: IProduct): void {
  //   this.productService.deleteProduct(obj.id).subscribe(
  //     () => {
  //       this.getProdData();
  //     }
  //   );
  // }

  //   public editProduct(obj: IProduct): void {
  //   this.title = obj.title;
  //   this.text = obj.text;
  //   this.editId = obj.id;
  //   this.size = obj.size;
  //   this.weight = obj.weight;
  //   this.price = obj.price;
  //   this.idCat = obj.idCat;
  //   this.productImage = obj.src;
  //   this.editStatus = true;
  // }

  //   public saveEditProduct(): void {
  //   const editProd = new Product(this.editId, this.title, this.text, this.size, this.weight, this.price, this.idCat, this.productImage);
  //   this.productService.editProduct(editProd).subscribe(
  //     () => {
  //       this.getProdData();
  //     }
  //   );
  //   this.title = '';
  //   this.text = '';
  //   this.size = '';
  //   this.weight = '';
  //   this.price = '';
  //   this.productImage = '';
  //   this.editStatus = false;
  // }

  public upload(event): void {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.prStorage.ref(`images/${id}`);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => this.productImage = url);
      })
    ).subscribe();
  }

}

