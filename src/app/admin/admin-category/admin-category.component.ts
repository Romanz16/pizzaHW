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
  adminCategorys: Array<ICategory>;
  title: string;
  text: string;
  editId: number;
  editStatus: boolean;
  constructor(private categoryService: CategoryService) {
    this.getCatData();
  }

  ngOnInit() {
  }
  private getCatData(): void {
    this.adminCategorys = this.categoryService.getData();
    // console.log(this.adminCategorys);
  }

  public addCategory(): void {
    const newDis = new Category(1, this.title);
    if (this.adminCategorys.length > 0) {
      newDis.id = this.adminCategorys.slice(-1)[0].id + 1;
    }
    this.categoryService.setData(newDis);
    this.title = '';
    this.text = '';
  }

  public deleteCategory(obj: ICategory): void {
    const index = this.adminCategorys.findIndex(val => val.id === obj.id);
    this.categoryService.deleteData(index);
  }

  public editCategory(obj: ICategory): void {
    this.title = obj.title;
    this.editId = obj.id;
    this.editStatus = true;
  }

  public saveEditCategory(): void {
    const editDis = new Category(this.editId, this.title);
    const index = this.adminCategorys.findIndex(val => val.id === this.editId);
    this.categoryService.updateData(editDis, index);
    this.title = '';
    this.text = '';
    this.editStatus = false;
  }
}
