import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "http://localhost:3000/products"
  constructor(private http:HttpClient ) { }

  findAll() {
    return this.http.get<Product[]>(this.apiUrl);
  }
  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
  persist(product){
    return this.http.post<Product>(this.apiUrl, product);
  }
  completed(id, completed){
    return this.http.patch(`${this.apiUrl}/${id}`, {completed: !completed})
  }
  update(product){
    return this.http.put(`${this.apiUrl}/${product.id}`,product)
  }
}
