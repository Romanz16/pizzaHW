import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/classes/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  pageTitle: string = 'Категорії';
  adminCategories: Array<ICategory>;
  title: string;
  editId: number;
  editStatus: boolean;
  constructor(private categoryService: CategoryService) {
    this.getCatData();
  }

  ngOnInit() {
  }
  private getCatData(): void {
    this.categoryService.getCategories().subscribe(
      data => {
        this.adminCategories = data;
        console.log( this.adminCategories);
      },
      err => {
        console.log(err);
      }
    );
  }

  public addCategory(): void {
    const newDis = new Category(1, this.title);
    if (this.adminCategories.length > 0) {
      newDis.id = this.adminCategories.slice(-1)[0].id + 1;
    }
    this.categoryService.addCategory(newDis).subscribe(
      () => {
        this.getCatData();
      }
    );
    this.title = '';
  }

  public deleteCategory(obj: ICategory): void {
    this.categoryService.deleteCategory(obj.id).subscribe(
      () => {
        this.getCatData();
      }
    );
  }

  public editCategory(obj: ICategory): void {
    this.title = obj.title;
    this.editId = obj.id;
    this.editStatus = true;
  }

  public saveEditCategory(): void {
    const editDis = new Category(this.editId, this.title);
    this.categoryService.editCategory(editDis).subscribe(
      () => {
        this.getCatData();
      }
    );
    this.title = '';
    this.editStatus = false;
  }


}
