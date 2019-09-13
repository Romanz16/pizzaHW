import { Injectable } from '@angular/core';
import { IDiscount } from '../interfaces/discout.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  formData: any;
  constructor(private firestore: AngularFirestore) {

  }

  public getDiscounts() {
    return this.firestore.collection('discounts').snapshotChanges();
  }
  // public getOneDiscount(id: string) {
  //   return this.firestore.collection('discounts/' + id).snapshotChanges();
  // }
  // discounts: Array<IDiscount> = [
  //   {
  //     id: 1,
  //     title: 'Free pizza',
  //     text: 'lorem lorem lorem'
  //   }
  // ];
  // url: string;
  // constructor(private http: HttpClient) {
  //   this.url = 'http://localhost:3000/discounts';
  //  }


  // public getDiscounts(): Observable<Array<IDiscount>> {
  //   return this.http.get<Array<IDiscount>>(this.url);
  // }

  // public addDiscount(obj: IDiscount): Observable<Array<IDiscount>> {
  //   return this.http.post<Array<IDiscount>>(this.url, obj);
  // }

  // public deleteDiscount(id: number): Observable<Array<IDiscount>> {
  //   return this.http.delete<Array<IDiscount>>(`${this.url}/${id}`);
  // }

  // public editDiscount(obj: IDiscount): Observable<Array<IDiscount>> {
  //   return this.http.put<Array<IDiscount>>(`${this.url}/${obj.id}`, obj);
  // }
  // public getOneDiscount(id: number): Observable<IDiscount> {
  //   return this.http.get<IDiscount>(`${this.url}/${id}`);
  // }
  // getData(): Array<IDiscount> {
  //   return this.discounts;
  // }

  // setData(obj: IDiscount): void {
  //   this.discounts.push(obj);
  // }

  // deleteData(index: number) {
  //   this.discounts.splice(index, 1);
  // }

  // updateData(obj: IDiscount, index) {
  //   this.discounts.splice(index, 1, obj);
  // }
}
