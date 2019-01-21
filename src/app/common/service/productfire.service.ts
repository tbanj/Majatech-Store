import { Product } from './../models/product.model';
import { ProductService } from './product.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { log } from 'util';
@Injectable()

export class ProductFireService {
    productsChanged = new Subject<Product[]>();
    navSearchProduct = new Subject;
    cartChanged = new Subject;
    cartChangedProduct = new Subject;
    urlCheckHeader = new Subject;
    urlCheckCarousel = new Subject;
    urlCheckCarouseH = new Subject;

    urlCheckSignup = new Subject;
    urlCheckSignin = new Subject;
    urlCartTotal = new Subject;


    priceConfirm = new Subject;

    closeFeatureCheck = 'only registered user can access this features';

    // use this image to rediuce data
    // 'https://res.cloudinary.com/dr9bbyvab/v1537188835/mom-pop/laptops/w_150,h_70,c_crop/toshiba3.jpg'
    private productu: Product[] = [

      //   new Product(7146, 'Macbook Pro 612',
      //    'State of the heart notebook with finger print functionality.\n4GB of RAM\n512GB',
      //    45, 20000,
      //    'https://res.cloudinary.com/dr9bbyvab/v1537188835/mom-pop/laptops/w_150,h_70,c_crop/toshiba3.jpg'

      //    ),
      //    new Product(6000, 'Dell Pro',
      //    'State of the heart notebook with finger print functionality.\n4GB of RAM\n512GB',
      //    45, 60000, 'https://res.cloudinary.com/dr9bbyvab/image/upload/v1537188826/mom-pop/laptops/339392-apple-macbook-pro-15-inch-2013.jpg'),


        ];


constructor() {}


    setProducts(product: Product[]) {
        this.productu = product;
        // this.productu.push(product);
          this.productsChanged.next(this.productu);

       }

       getProducts() {
        return this.productu;
    }

    getProduct(index: number) {

        // console.log(this.recipes[index].ingredients);
         return this.productu[index];
      }

    //   getProd() {
    //     return this.productu[index];
    //   }

      addProduct(product: Product) {
        // console.log(product);

        this.productu.push(product);
        this.productsChanged.next(this.productu.slice());
     }

        // addPro(index: number) {
        //     this.productservice.addProduct(this.productu[index]).subscribe(
        //         (response: any) => {
        //             const na = response.json();

        //         (error: any) => {console.log(error); }
        //     );
        // }

     updateProduct(index: number, newProduct: Product) {
      this.productu[index] = newProduct;
      this.productsChanged.next(this.productu);
     }

     deleteProduct(index: number) {
        this.productu.splice(index, 1);
        this.productsChanged.next(this.productu);
     }
}
