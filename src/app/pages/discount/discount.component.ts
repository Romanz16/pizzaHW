import { Component, OnInit } from '@angular/core';
import { IDiscount } from 'src/app/shared/interfaces/discout.interface';
import { DiscountService } from 'src/app/shared/services/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  title: string = 'Акції';
  discounts: Array<IDiscount>;
  constructor(private discountService: DiscountService) {
    this.getDisData();
  }

  ngOnInit() { }
  private getDisData(): void {
    this.discountService.getDiscounts().subscribe(
      myArray => {
        // console.log('myarray', myArray);
        this.discounts = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as IDiscount;
        });
      }
    );


  }
  // private getDisData(): void {
  //   this.discounts = this.discountService.getData();
  //   console.log(this.discounts);
  // }

}
