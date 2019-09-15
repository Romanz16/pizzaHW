import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/shared/services/discount.service';
import { IDiscount } from 'src/app/shared/interfaces/discout.interface';
import { Discount } from 'src/app/shared/classes/discount.model';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {
  pageTitle = 'Акції';
  adminDiscounts: Array<any>;
  formData: IDiscount = {
    id: '',
    title: '',
    text: '',
    src: ''
  };
  title: string;
  text: string;
  editId: number;
  editStatus: boolean;
  productImage: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;

  sort1: Array<number> = [3, 3, 3];
  constructor(private discountService: DiscountService, private prStorage: AngularFireStorage,
    private firestore: AngularFirestore) {
    // this.getDisData();
  }

  ngOnInit() {
    this.discountService.getDiscounts().subscribe(
      myArray => {
        this.adminDiscounts = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as IDiscount;
        });
      }
    );
  }
  public onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    data.src = this.productImage;
    delete data.id;
    this.firestore.collection('discounts').add(data);
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
        src: ''
      };
    }
    this.productImage = '';
  }

  public deleteDiscount(obj: IDiscount): void {
    this.firestore.doc('discounts/' + obj.id).delete();
    this.prStorage.storage.refFromURL(obj.src).delete();
  }

  public editDiscount(obj: IDiscount): void {
    this.formData = obj;
    this.productImage = obj.src;
    this.editStatus = true;
  }
  public saveEditDiscount(form: NgForm): void {
    const data = Object.assign({}, form.value);
    data.src = this.productImage;
    delete data.id;
    this.firestore.doc('discounts/' + form.value.id).update(data);
    this.resetForm();
    this.editStatus = false;
  }
  // private getDisData(): void {
  //   this.discountService.getDiscounts().subscribe(
  //     data => {
  //       this.adminDiscounts = data;
  //       console.log(this.adminDiscounts);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  // public addDiscount(): void {
  //   const newDis = new Discount(1, this.title, this.text, this.productImage);
  //   if (this.adminDiscounts.length > 0) {
  //     newDis.id = this.adminDiscounts.slice(-1)[0].id + 1;
  //   }
  //   this.discountService.addDiscount(newDis).subscribe(
  //     () => {
  //       this.getDisData();
  //     }
  //   );
  //   this.title = '';
  //   this.text = '';
  //   this.productImage = '';
  // }

  // public deleteDiscount(obj: IDiscount): void {
  //   this.discountService.deleteDiscount(obj.id).subscribe(
  //     () => {
  //       this.getDisData();
  //     }
  //   );
  //   this.prStorage.storage.refFromURL(obj.src).delete();
  // }

  // public editDiscount(obj: IDiscount): void {
  //   this.title = obj.title;
  //   this.text = obj.text;
  //   this.editId = obj.id;
  //   this.productImage = obj.src;
  //   this.editStatus = true;

  // }

  // public saveEditDiscount(): void {
  //   const editDis = new Discount(this.editId, this.title, this.text, this.productImage);
  //   this.discountService.editDiscount(editDis).subscribe(
  //     () => {
  //       this.getDisData();
  //     }
  //   );
  //   this.title = '';
  //   this.text = '';
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

  public sort(name: string, num: number): void {
    let sortColumn = this.sort1[num];
    this.sort1[0] = 3;
    this.sort1[1] = 3;
    this.sort1[2] = 3;
    if (sortColumn !== 2) {
      this.sort1[num] = 2;
      this.adminDiscounts.sort(function (a, b) {
        let nameA = a[name];
        let nameB = b[name];
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
    else {
      this.sort1[num] = 1;
      this.adminDiscounts.sort(function (a, b) {
        let nameA = a[name];
        let nameB = b[name];
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


}
