import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  editForm: false ;
  showForm: false;

  products: Product[] = [];
  resultProducts: Product[] = [];
  
  searchProduct: '';

  myProduct : Product = {
    label:'',
    completed: false
  }

  constructor( private productService:ProductService ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.findAll()
        .subscribe(products => {
          this.resultProducts = this.products = products
          })
  }
  deleteProduct(id){
        this.productService.delete(id)
            .subscribe(()=>{
          this.products = this.products.filter(product => product.id != id)
        })
  }
  persistProduct(){
      this.productService.persist(this.myProduct)
      .subscribe((product)=>{
        this.products = [product, ...this.products];
        this.resetProduct();
        this.showForm = false; 
      })
  }
  resetProduct(){
    this.myProduct={
      label:'',
      completed:false
    }
  }
  toggleCompleted(product){
    this.productService.completed(product.id ,product.completed)
        .subscribe(() => {
          product.completed = !product.completed
        })
  }
  editProduct(product){
    this.myProduct = product;
    this.editForm= false ;

  }
  updateProduct(){
    this.productService.update(this.myProduct)
        .subscribe(product => {
          this.resetProduct();
          this.editForm = false;
        })
  }
  searchProducts(){
    this.resultProducts = this.products.filter((product) => product.label.toLowerCase().includes(this.searchProduct.toLocaleLowerCase()))
  }
}
