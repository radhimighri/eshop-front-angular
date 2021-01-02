import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
providedIn: 'root'
})

export class ProductService {


private baseUrl = 'http://localhost:8080/api/products';
//private baseUrl = 'http://localhost:8080/api/products?size=100';

private categoryUrl = 'http://localhost:8080/api/product-category';

constructor(private httpClient: HttpClient) { }

getProduct(theProductId: number): Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
    }

getProductList(theCategoryId: number): Observable<Product[]> {

    //need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`

return this.httpClient.get<GetResponseProducts>(searchUrl).pipe( //call the REST API
map(response => response._embedded.products) //returns an observable, then Maps the JSON data from Spring Data REST to products array
);
}

getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
        map(response => response._embedded.productCategory)
        );        
}

searchProducts(theKeyword: string): Observable<Product[]> {
    // need to build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl)
    .pipe(
    map(response => response._embedded.products));
    }

}

interface GetResponseProducts {
_embedded: { //Unwraps the JSON from Spring Data REST using "_embedded entry"
products: Product[];
}
}


interface GetResponseProductCategory {
    _embedded: {
    productCategory: ProductCategory[];
}
}