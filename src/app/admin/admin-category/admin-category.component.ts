import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/classes/category.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  pageTitle: string = 'Категорії';
  adminCategories: Array<ICategory>;
  formData: ICategory = {
    id: '',
    title: '',
  };
  title: string;
  editId: number;
  editStatus: boolean;

  sort1: Array<number> = [3, 3];
  constructor(private categoryService: CategoryService, private firestore: AngularFirestore) {
    // this.getCatData();
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      myArray => {
        this.adminCategories = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );
  }
  public onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    this.firestore.collection('categories').add(data);
    this.resetForm();
  }
  public resetForm(form?: NgForm): void {
    if (form != null) {
      form.reset();
    } else {
      this. formData = {
        id: '',
        title: '',
      };
    }
  }
  public deleteCategory(obj: ICategory): void {
    this.firestore.doc('categories/' + obj.id).delete();
  }

  public editCategory(obj: ICategory): void {
    this.formData = obj;
    this.editStatus = true;
  }
  public saveEditCategory(form: NgForm): void {
    const data = Object.assign({}, form.value);
    delete data.id;
    this.firestore.doc('categories/' + form.value.id).update(data);
    this.resetForm();
    this.editStatus = false;
  }

  public sort(name: string, num: number): void {
    let sortColumn = this.sort1[num];
    this.sort1[0] = 3;
    this.sort1[1] = 3;
    if (sortColumn !== 2) {
      this.sort1[num] = 2;
      this.adminCategories.sort(function (a, b) {
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
      this.adminCategories.sort(function (a, b) {
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
  // private getCatData(): void {
  //   this.categoryService.getCategories().subscribe(
  //     data => {
  //       this.adminCategories = data;
  //       console.log( this.adminCategories);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  // public addCategory(): void {
  //   const newDis = new Category(1, this.title);
  //   if (this.adminCategories.length > 0) {
  //     newDis.id = this.adminCategories.slice(-1)[0].id + 1;
  //   }
  //   this.categoryService.addCategory(newDis).subscribe(
  //     () => {
  //       this.getCatData();
  //     }
  //   );
  //   this.title = '';
  // }

  // public deleteCategory(obj: ICategory): void {
  //   this.categoryService.deleteCategory(obj.id).subscribe(
  //     () => {
  //       this.getCatData();
  //     }
  //   );
  // }

  // public editCategory(obj: ICategory): void {
  //   this.title = obj.title;
  //   this.editId = obj.id;
  //   this.editStatus = true;
  // }

  // public saveEditCategory(): void {
  //   const editDis = new Category(this.editId, this.title);
  //   this.categoryService.editCategory(editDis).subscribe(
  //     () => {
  //       this.getCatData();
  //     }
  //   );
  //   this.title = '';
  //   this.editStatus = false;
  // }


}
