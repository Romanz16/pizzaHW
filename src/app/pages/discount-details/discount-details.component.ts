import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IDiscount } from 'src/app/shared/interfaces/discout.interface';
import { DiscountService } from 'src/app/shared/services/discount.service';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss']
})
export class DiscountDetailsComponent implements OnInit {
  discountId: string;
  discount: any[];
  view: IDiscount;
  constructor(private discountService: DiscountService,
              private route: ActivatedRoute,
              private location: Location) {
    this.getMoreDetails();
  }

  ngOnInit() {
  }
  public getMoreDetails() {
    this.discountId = this.route.snapshot.paramMap.get('id');
    this.discountService.getOneDiscounts(this.discountId).subscribe(
      myArray => {
        this.view = { id: myArray.payload.id, ...myArray.payload.data() } as IDiscount;
      }
    );
}

  public goBack(): void {
    this.location.back();
  }
}
