import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // url: string;
  // constructor(private http: HttpClient) {
  //   this.url = 'http://localhost:3000/categories';
  //  }
  formData: any;
  constructor(private firestore: AngularFirestore) {

  }

  public getCategories() {
    return this.firestore.collection('categories').snapshotChanges();
  }

  // public getCategories(): Observable<Array<ICategory>> {
  //   return this.http.get<Array<ICategory>>(this.url);
  // }

  // public addCategory(obj: ICategory): Observable<Array<ICategory>> {
  //   return this.http.post<Array<ICategory>>(this.url, obj);
  // }

  // public deleteCategory(id: number): Observable<Array<ICategory>> {
  //   return this.http.delete<Array<ICategory>>(`${this.url}/${id}`);
  // }

  // public editCategory(obj: ICategory): Observable<Array<ICategory>> {
  //   return this.http.put<Array<ICategory>>(`${this.url}/${obj.id}`, obj);
  // }

}


