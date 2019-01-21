import { AuthenticateService } from './../../authenticate/authenticate.service';
import { Headers } from '@angular/http';
import { Product } from './../models/product.model';
import { Inquiry } from './../models/inquiry.model';
import { ProductFireService } from './productfire.service';
import { Injectable, Output, Optional, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, retry, catchError, tap } from 'rxjs/operators';
import { APP_BASE_HREF } from '@angular/common';

@Injectable()
export class ProductService {
    //  private productApiURL = 'https://mompop-9c94f.firebaseio.com/practice.json';
    // private checkoutApiURL = 'http://localhost:50781/api/transaction/checkout';

    private checkoutApiURL = 'https://mompop-9c94f.firebaseio.com/checkout.json';
    private productApiURL = 'https://mompop-9c94f.firebaseio.com/data.json';
    private currencyApiURL = 'https://mompop-9c94f.firebaseio.com/currencyapi.json';



    constructor(private _http: HttpClient, private authSer: AuthenticateService,
        private productFireService: ProductFireService,
       ) {

      }


      getAllProducts(): Observable<Product[]> {
        return this._http.get<Product[]>(this.productApiURL);
    }




addProduct() {
    // const token = this.authSer.getToken();
const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
return this._http.put('https://mompop-9c94f.firebaseio.com/data.json' ,
this.productFireService.getProducts(), {headers: headers});

    }

        updateProduct() {
            // const token = this.authSer.token;
            // console.log(token);
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
   return this._http.put('https://mompop-9c94f.firebaseio.com/data.json',
    this.productFireService.getProducts() , {headers: headers});

}

deleteProduct(id: number): Observable<any> {
    const token = this.authSer.token;
    return this._http.delete('https://mompop-9c94f.firebaseio.com/data.json?auth=' + token, { params: { id: id.toString() } });
}




    // updateProduct(product: Product) {
    //     const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    //     return this._http.put(`${'https://mompop-9c94f.firebaseio.com/practice'}/${this.arrayPos}/.json`, product, {headers: headers});
    // }

    checkout(orders: object[]) {
        return this._http.post(this.checkoutApiURL, orders);
    }

}
