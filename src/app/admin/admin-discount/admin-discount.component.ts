import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/shared/services/discount.service';
import { IDiscount } from 'src/app/shared/interfaces/discout.interface';
import { Discount } from 'src/app/shared/classes/discount.model';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {
  adminDiscounts: Array<IDiscount>;
  title: string;
  text: string;
  editId: number;
  editStatus: boolean;

  constructor(private discountService: DiscountService) {
    this.getDisData();
  }

  ngOnInit() { }

  private getDisData(): void {
    this.discountService.getDiscounts().subscribe(
      data => {
        this.adminDiscounts = data;
        console.log( this.adminDiscounts);
      },
      err => {
        console.log(err);
      }
    );
  }

  public addDiscount(): void {
    const newDis = new Discount(1, this.title, this.text);
    if (this.adminDiscounts.length > 0) {
      newDis.id = this.adminDiscounts.slice(-1)[0].id + 1;
    }
    this.discountService.addDiscount(newDis).subscribe(
      () => {
        this.getDisData();
      }
    );
    this.title = '';
    this.text = '';
  }

  public deleteDiscount(obj: IDiscount): void {
    this.discountService.deleteDiscount(obj.id).subscribe(
      () => {
        this.getDisData();
      }
    );
  }

  public editDiscount(obj: IDiscount): void {
    this.title = obj.title;
    this.text = obj.text;
    this.editId = obj.id;
    this.editStatus = true;
  }

  public saveEditDiscount(): void {
    const editDis = new Discount(this.editId, this.title, this.text);
    this.discountService.editDiscount(editDis).subscribe(
      () => {
        this.getDisData();
      }
    );
    this.title = '';
    this.text = '';
    this.editStatus = false;
  }


  // private getDisData(): void {
  //   this.adminDiscounts = this.discountService.getData();
  //   console.log(this.adminDiscounts);
  // }

  // public addDiscount(): void {
  //   const newDis = new Discount(1, this.title, this.text);
  //   if (this.adminDiscounts.length > 0) {
  //     newDis.id = this.adminDiscounts.slice(-1)[0].id + 1;
  //   }
  //   this.discountService.setData(newDis);
  //   this.title = '';
  //   this.text = '';
  // }

  //   public deleteDiscount(obj: IDiscount): void {
  //     const index = this.adminDiscounts.findIndex(val => val.id === obj.id);
  //     console.log(index);
  //     this.discountService.deleteData(index);
  //   }

  //   public editDiscount(obj: IDiscount): void {
  //     this.title = obj.title;
  //     this.text = obj.text;
  //     this.editId = obj.id;
  //     this.editStatus = true;
  //   }

  //   public saveEditDiscount(): void {
  //     const editDis = new Discount(this.editId, this.title, this.text);
  //     const index = this.adminDiscounts.findIndex(val => val.id === this.editId);
  //     this.discountService.updateData(editDis, index);
  //     this.title = '';
  //     this.text = '';
  //     this.editStatus = false;
  //   }


}
