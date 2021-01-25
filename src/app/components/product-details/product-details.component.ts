import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  //initially the product will be undefined so we'll have this error on the browser console "ERROR TypeError: Cannot read property..."
  // then when the product take some values, the Angular automatically updates HTML template page--> this is known as data binding in Angular 
  //to avoid this from the begining we can create an instance of Product (One line solution ) or the long one (in the HTML page after every Product instance and before accessing the property we must put a question mark eg: 'product?.imageUrl') 
  product: Product = new Product()

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails()
    })
  }
  handleProductDetails() {
    
    //get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
      this.product = data;
      }
      ) 
  }

  addToCart() {

    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
    
  }

}
