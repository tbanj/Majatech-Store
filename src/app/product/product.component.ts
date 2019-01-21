import { AuthenticateService } from './../authenticate/authenticate.service';
import { AuthenticateGuard } from './../authenticate/authenticate-guard.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Helper } from './../common/models/helper.model';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../common/models/product.model';
import { ProductService } from '../common/service/product.service';
import { Router } from '@angular/router';
import { ProductFireService } from '../common/service/productfire.service';


@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
    checkEr: string;

    carouselClosed: any;

    // message to testing user

    popoverDisabledButton = true;


    name = '';
    price = '';
    stock = '';
    imagePath = '';
    description = '';
    id = this.generateId();

    @ViewChild('editedProName') editedProName;
    @ViewChild('editedProPrice') editedProPrice;
    @ViewChild('editedProCount') editedProCount;
    @ViewChild('editedProDescription') editedProDescription;
    @ViewChild('editedProImage') editedProImage;


    products: Product[];
    newProduct: Product;

    newProduc: Product;
    updateProductEdited: Product;
    stateEdited = null;
    showa: boolean;
    proName = '';
    private _products: Product[];
    popa;
    urlCheck: any;

    @ViewChild('form')
    private form: NgForm;



    @ViewChild('formB')
    private formB: NgForm;

    get canSave(): boolean {
        return this.form.valid;
    }

    cleanProducts: Subscription;
    navSearchProductClean: Subscription;
    updateProductClean: Subscription;


    constructor(private _productService: ProductService, private route: Router,
        private _productFireService: ProductFireService, private authService: AuthenticateService,
        private _toastr: ToastrService,
         private helper: Helper) {
        this.products = [];
        this._products = [];
        // this.newProduct.name = '';
        // this.newProduct.id = 0;
        // this.newProduct.imagePath = '';
        // this.newProduct.stock = 0;
        // this.newProduct.price = 0;
        // this.newProduct = new Product(this.generateId(), '', '', 0, 0, '');
        // this.newProduct.description = '';
        // this.newProduct.name = '';
        // this.newProduct = new Product(this.generateId(), '', '', 0, 0, '');

        this.showa = true;



    }

    ngOnInit() {
        this.newProduct = new Product(this.generateId(), '', '', 0, 0, '');

        // this will load data from  remote database
        // this._productService.getProducts();

        this.navCheckSearch();

        if (this.authService.token === null) {
            console.log('hello');

            this.route.navigate(['/']);
        }  else if (this.authService.token !== null) {
            this.urlCheck = 'productCarousel';
            this._productFireService.urlCheckCarousel.next(this.urlCheck);
        }


        // // this will load data from local database storage
        this.products =  this._products = this._productFireService.getProducts();

        this._productFireService.productsChanged
            .subscribe((product: Product[]) => {
        this.products = this._products = product;
        });


        this._productService.getAllProducts().subscribe(data => {
            this._productFireService.setProducts(data);
        });

        // main code is with c# has backend
        // this.fetchProduct();


        this.navCheckSearch();

        this.urlCheck = 'productCarousel';
        this._productFireService.urlCheckCarousel.next(this.urlCheck);

    }

    // fetchProduct() {
    //     this._productService.getProducts().subscribe((data) => {
    //         // this.products = this._products = data;
    //         this._productFireService.setProducts(data);
    //         console.log(this.products);
    //     });
    // }

      navCheckSearch () {
        this.navSearchProductClean = this._productFireService.navSearchProduct.subscribe(
            (productSearch: any) => {
                if (isNaN(productSearch)) {
                    this.products = this._products.filter((product: Product) =>
                     product.name.toLowerCase().includes(productSearch));

                    // console.log(inputDeterminant + ' is not a number');
                    return false;
                } else {
                    // const value = $event.currentTarget.value.toString();
                    this.products = this._products.filter((product: Product) =>
                     product.price.toString().includes(productSearch));

                }
            }
        );
    }
    private generateId() {
        return Math.round(Math.random() * 10000);
      }






    addProduct(form: NgForm) {
        // this.eraseContentBefore();
        if (this._validate() === true) {
                // const copiedItem = Object.assign([], this.newProduc, this.newProduct);

                    this.newProduct.id = this.generateId();
                    const newAdded = new Product(this.newProduct.id, this.newProduct.name,
                        this.newProduct.description, this.newProduct.stock , this.newProduct.price,
                        this.newProduct.imagePath);
                this._productFireService.addProduct(newAdded);
                this._toastr.success(`${this.newProduct.name} successfully added to inventory`);
                this._productService.addProduct()
                .subscribe(
                    (response: Response) => {
                    // console.log(response);
                },
                (error) => {

                    console.log(error);
                    this._toastr.error(error);
                 }
            // , (error) => {console.log(error); }
                 );

            this.form.resetForm();
        } else {
            alert('Form not properly filled');
        }

    }




    updateProduct(product: Product) {
       if (this._validateEditedProduct() === true) {
        //    don't unsubscribe here
            const updateIndex = this.products.findIndex(x => x.id === product.id);

            this.products[updateIndex].name = this.formB.value.name;
            this.products[updateIndex].price = this.formB.value.price ;
            this.products[updateIndex].stock = this.formB.value.stock ;
            this.products[updateIndex].imagePath = this.formB.value.image ;
            this.products[updateIndex].description = this.formB.value.description ;
            this.updateProductEdited = this.products[updateIndex] ;

            this._toastr.success(`${this.formB.value.name} has been updated`);

            this._productService.updateProduct()
                .subscribe(
                    (response: Response) => {
                    // console.log(response);
                },
                (error) => {

                   this._toastr.error(error);
                 }
            // , (error) => {console.log(error); }
                 );




        } else {

            this._toastr.error('form not properly filled');
        }


        //  this.broadcastProductDetail();
         this.stateEdited = null;
    }


    productNotEdited(id: number) {
        if (id === this.stateEdited) {
            return true;
        } else {
            return false;
        }
    }

    deleteProduct(id: number) {
    //     this._productService.deleteProduct(id).subscribe(data => {
        
    //  });
    const indexm = this.products.findIndex(x => x.id === id);
     // const productDeleted = this.products[indexm].name;

         // this.showa = !this.showa;
         alert(`${this.products[indexm].name} was removed successfully`);
         this._productFireService.deleteProduct(indexm);
         this._products = this._products.slice(indexm, 1);

         this.removeProduct(id) ;
         this._productService.updateProduct()
                .subscribe(
                    (response: Response) => {
                    // console.log(response);
                },
                (error) => {

                    this._toastr.error(error);
                 }
            // , (error) => {console.log(error); }
                 );
 }




      removeProduct(id: number) {
        this.products = this.products.filter(x => x.id !== id);
    }



    private _validate(): boolean {
        let matchText = true;
        const productNameT = 'product name' ;
        const productPriceT = 'product price' ;
        const productCountT = 'product stock' ;
        const productDescriptionT = 'product description' ;
        const productImageT = 'image file' ;


    try {

        if (this.newProduct.name.length < 3 ) {
            this.helper.editLengthCheck(this.newProduct.name, productNameT, 3);
            // this.editLengthCheck(this.newProduct.name, productNameT, 3 );
            alert('Invalid ' + ' ' + productNameT);
            matchText = false;
        }


        if (this.newProduct.price < 1 ) {
            this.helper.editLengthCheck(this.newProduct.price.toString(), productPriceT, 1);
            alert('Invalid ' + ' ' + productPriceT);
            matchText = false;
        }


        if (this.newProduct.stock < 1 ) {
            this.helper.editLengthCheck(this.newProduct.stock.toString(), productCountT, 1);
            alert('Invalid ' + ' ' + productCountT);
            matchText = false;
        }



        if (this.newProduct.description.length < 3) {
            this.helper.editLengthCheck(this.newProduct.description, productDescriptionT , 3);

            alert(productDescriptionT + ' too short');
            matchText = false;
        }

        if (this.newProduct.description.length < 3) {
            this.helper.editLengthCheck(this.newProduct.description.toString(), productDescriptionT , 3);

            alert(productDescriptionT + ' too short');
            matchText = false;
        }





    } catch (Exception) {
        alert('Error encounter during data validation');
    }
    return matchText;
}

    // validate input value
    private  _validateEditedProduct(): boolean {
        let matchText = true;
        const editedNameProduct = this.editedProName.nativeElement.value;
        const editedCountProduct = this.editedProCount.nativeElement.value;
        const editedPriceProduct = this.editedProPrice.nativeElement.value;
        const editedDescriptionProduct = this.editedProDescription.nativeElement.value;
        const productNameT = 'product name' ;
        const productPriceT = 'product price' ;
        const productCountT = 'product stock' ;
        const productDescriptionT = 'product description' ;


        try {

            if (this.formB.value.name < 3 ) {

                this.helper.editLengthCheck(this.formB.value.name, productNameT, 3 );
                alert('Invalid ' + ' ' + productNameT);
                matchText = false;
                 }

            if (this.formB.value.price < 1 ) {
                this.helper.editLengthCheck(this.formB.value.price, productPriceT, 1);
                 alert('Invalid ' + productPriceT);
                 matchText = false;
                }


                 if (this.formB.value.stock < 1 ) {
                    this.helper.editLengthCheck(this.formB.value.stock, productCountT, 1);
                     alert('Invalid ' + productCountT);
                     matchText = false;
                    }

                    if (this.formB.value.image < 3) {
                        this.helper.editLengthCheck(this.formB.value.image,
                          productDescriptionT , 3);

                            alert(productDescriptionT + ' too short');
                            matchText = false;
                        }


            if (this.formB.value.description < 3) {
                this.helper.editLengthCheck(this.formB.value.description, productDescriptionT , 3);

                    alert(productDescriptionT + ' too short');
                    matchText = false;
                }

         } catch (Exception) {
                alert('Error encounter during data validation');
        }
            return matchText;
    }


    ngOnDestroy(): void {
        // this.cleanProducts.unsubscribe();
        this.navSearchProductClean.unsubscribe();
        // this.updateProductClean.unsubscribe();
    }

}
