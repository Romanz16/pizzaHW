import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { Product } from '../classes/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Array<IProduct>;
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products';
  }
  public getProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }

  public addProduct(obj: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.url, obj);
  }

  public deleteProduct(id: number): Observable<Array<IProduct>> {
    return this.http.delete<Array<IProduct>>(`${this.url}/${id}`);
  }

  public editProduct(obj: IProduct): Observable<Array<IProduct>> {
    return this.http.put<Array<IProduct>>(`${this.url}/${obj.id}`, obj);
  }
  public getOneProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }
}
