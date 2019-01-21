import { ProductFireService } from './../common/service/productfire.service';
import { Cart } from '../common/models/cart.model';
import { Component, Input, ViewChild, EventEmitter, Output, OnInit } from '@angular/core';
import { Product } from '../common/models/product.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ProductService } from '../common/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
    buttondisabledCart = false;
    // develop deactivate this features
    popoverDisabledButton = true;
    checkEr;

    carts: Cart[];
    cartProduct: Product[];
    itemsToCheckoutDTOSess: Object[];

    // tslint:disable-next-line:no-output-on-prefix
    @Output()
    onCheckOutSuccessful: EventEmitter<object[]>;

    @Input()
    show: boolean;
    cartNumber = 0;

    @ViewChild('cart')
    template: any;
    initalquantity = 0;

    get totalItems(): number {
        return this.carts.reduce((prev, curr) => prev = curr.quantity + prev, this.initalquantity);
    }
    modalRef: BsModalRef;
    config = {
      backdrop: true,
      ignoreBackdropClick: true
    };


    constructor(private modalService: BsModalService, private productService: ProductService,
        private _productFireService: ProductFireService, private _toastr: ToastrService,
        private router: Router) {
        this.carts = [];
        this.show = false;
        this.onCheckOutSuccessful = new EventEmitter<object[]>();
    }

    ngOnInit() {

        // if (JSON.parse(sessionStorage.getItem('produCart'))) {
        //     this.carts = JSON.parse(sessionStorage.getItem('produCart'));
        //     console.log(this.carts);
        //     this.itemsToCheckoutDTOSess = this.carts.map(item => item.toDTO());

        //     // sessionStorage.setItem( 'produCart', JSON.stringify(this.carts));
        //   }
    }

    addItemToCarts(product: Product) {
        let cartInList = this.carts.find(x => x.id === product.id,
            );
            // const cartCheck = this.cartProduct.find(x => x.id === product.id,
            //     );

        if (cartInList) {
            cartInList.quantity += 1;
            // cartCheck.stock -= 1;

        } else {
            cartInList = new Cart(product.id, product.name, product.price, 1);
            this.carts.push(cartInList);
            // this.cartProduct.push(cartCheck);
            // console.log(this.cartProduct);
            console.log(this.carts);


        }

        // console.log(this.carts.slice());
        // this._productFireService.
        // const count = this.carts.reduce( (total, cart: Cart) => cart.id == product.id ? total + 1 : total, 0);

        // const cart = new Cart(product.id, product.name, product.price, count);

        // this.carts.push(cart);
        sessionStorage.setItem( 'produCart', JSON.stringify(this.carts));
    }

    showCart() {
        this.modalRef = this.modalService.show(this.template, this.config);
    }

    checkout() {
        
        if (JSON.parse(sessionStorage.getItem('produCart'))) {
            const itemsToCheckoutDTO = this.carts.map(item => item.toDTO()
            );
            this.productService.checkout(itemsToCheckoutDTO ).subscribe(data => {
                this.carts = [];
                this.onCheckOutSuccessful.emit(itemsToCheckoutDTO );
                this.router.navigate(['/product-summary']);
                sessionStorage.removeItem('produCart');
                this.modalRef.hide();
            });
        } else {
            const itemsToCheckoutDTO = this.carts.map(item => item.toDTO());
            this.productService.checkout(itemsToCheckoutDTO).subscribe(data => {
                this.carts = [];
                this.onCheckOutSuccessful.emit(itemsToCheckoutDTO);
                this.router.navigate(['/product-summary']);
                sessionStorage.removeItem('produCart');
                this.modalRef.hide();
            });
        }
        
        // this.popoverDisabledButton = false;
        // this.checkEr = 'contact developer 08074551280';
        // this._toastr.error('contact developer 08074551280');
    }



    remove(id: number) {
        this.carts = this.carts.filter(x => x.id !== id);
    }
}
