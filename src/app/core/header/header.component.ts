import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { CurrencyCheck, Cur } from './../../common/models/currencyChar.model';
import { ProductService } from './../../common/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from './../../authenticate/authenticate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy, ElementRef , Inject} from '@angular/core';
import { CartComponent } from '../../cart/cart.component';
import { Product } from '../../common/models/product.model';
import { ProductFireService } from '../../common/service/productfire.service';
import { stringify } from '@angular/core/src/util';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
// product search
@ViewChild('navSearch') navSearch;

@ViewChild('ade') ade: ElementRef;


currencyCh = {
  idA: Array<any>(),
  price: '',
};

currencySy: Cur = new Cur();
currencieSymbol = Array<CurrencyCheck>();



// javascript
closeCarousel = true;
CarouselClosed: any;

superCheckL: any;
registerUser = false;

products: Product[];
priceNair: Product[];
@ViewChild(CartComponent)

private cartComponent: CartComponent;
private _products: Product[];
show: boolean;
numCart: any;
user: {id: number, name: string};

urlCheckRedirect: any;
emptyChe: any;
urlCheck: any;
id: any;

productCarouselClean: Subscription;
cartChangedClean: Subscription;
urlCheckCarouseHClean: Subscription;
cartChangedProductClean: Subscription;

signConfirm: string;
signoutConfirm: string;

navSearchCheck: any;
buttondisabledCart = false;

    get totalItemsInCart(): number {
         this.numCart = this.cartComponent && this.cartComponent.totalItems;
        this.cartChangedClean = this._productFireService.cartChanged.subscribe(
          (cartNum: any[]) => {
            // console.log('header sub ' + cartNum);
          // this.numCart = cartNum;
         }
        );
        //  console.log('header ' + this.numCart);
         return this.numCart;
    }
    constructor(@Inject(LOCAL_STORAGE) private localStorage: any, 
      private _productFireService: ProductFireService, public _router: Router,
      private _activatedRoute: ActivatedRoute, private  toast: ToastrService,
      public authenticateService: AuthenticateService,
      private _productService: ProductService, ) {
      this.products = [];
      this._products = [];
      this.priceNair = [] ;
      this.show = false;
     }

    ngOnInit() {

      // to remove a particular variable from local storage
      sessionStorage.removeItem('aNaira');
      sessionStorage.removeItem('curSign');



      this.currencieSymbol = Array<CurrencyCheck>();
      // this.currencieSymbol.push(new CurrencyCheck(-1, 'Please select'));
      this.currencieSymbol.push(new CurrencyCheck(1, 'NGN'));
      this.currencieSymbol.push(new CurrencyCheck(2, 'USD'));
      this.currencieSymbol.push(new CurrencyCheck(3, 'EUR'));
      this.currencySy = new Cur();
      this.currencySy.curre = this.currencieSymbol[0];

      console.log(this.currencySy.curre);

      this.addToCart();

     this.urlCheckCarouseHClean = this._productFireService.urlCheckCarouseH.subscribe(
      (value: any) => {
        this.closeCarousel = true;
     this.CarouselClosed = false;
      }
    );

      // use to call the products from database ans use for updating
    this._productFireService.getProducts();
    this._productFireService.productsChanged.subscribe(
        (product: Product[]) => {
            this.products = this._products = product;
        }
    );



      // to deactivate the cart if the quantity is empty
    if (this.totalItemsInCart <= 0) {
      this.buttondisabledCart = true;
    }

      this.productCarouselClean = this._productFireService.urlCheckCarousel.subscribe(
        (value: any) => {
          this.closeCarousel = false;
      this.CarouselClosed = true;
        }
      );


    }

    checkClick(value) {


      // console.log('THIS HELLO');
      // console.log(value);
      // console.log(this.currencySy.curre.name);
      if (this.currencySy.curre.name === 'NGN') {
        // const scheck: string = this.currencySy.curre.name;
        this._productFireService.priceConfirm.next(this.currencySy.curre.name);


      } else if (this.currencySy.curre.name === 'EUR') {
        this._productFireService.priceConfirm.next(this.currencySy.curre.name);
      } else if (this.currencySy.curre.name === 'USD') {
        this._productFireService.priceConfirm.next(this.currencySy.curre.name);
      }

    }

    // priceRates () {
    //   this.currencyService.currencyApi()
    //   .subscribe((valuea: Object) => {
    //     // convert object to array
    //     const keys = Object.keys(valuea);
    //     const valueRates = Object.values(valuea);

    //     // serching for a particular member in array
    //     const keyRate = keys.findIndex(number => number === 'rates');
    //         // console.log(valueRates[keyRate]);

    //     // valueRates[keyRate] is {} need to be change to []
    //     // convert object to array
    //     const keyRateInner = Object.keys(valueRates[keyRate]);
    //     const valueRateInner = Object.values(valueRates[keyRate]);

    //     const curNaira = keyRateInner.findIndex(number => number === 'NGN');
    //     console.log(valueRateInner[curNaira] + ' ' + keyRateInner[curNaira]);

    //     // display USD
    //     const curUSD = keyRateInner.findIndex(number => number === 'USD');
    //     console.log(valueRateInner[curUSD] + ' ' + keyRateInner[curUSD]);

    //     const curEURO = keyRateInner.findIndex(number => number === 'EUR');
    //     console.log(valueRateInner[curEURO] + ' ' + keyRateInner[curEURO]);

    //     const itemExchange = {keyN : valueRateInner [curNaira],
    //       keyVa: keyRateInner[curNaira]};
    //     localStorage.setItem( 'itemExchange', JSON.stringify(itemExchange) );



    //   });
    // }


    routerHome() {
      this._router.navigate(['/']);
    }
    checkSignup() {
      this.signoutConfirm = 'signCout';
      this._productFireService.urlCheckSignup.next(this.signoutConfirm);
      this._router.navigate(['/s/signup']);
    }


    routerProducts() {
      this._router.navigate(['/products']);
    }

    routerContact() {
      this._router.navigate(['/contact-us']);
    }


    checkSignout() {
      this.signConfirm = 'signCon';

      this._productFireService.urlCheckSignin.next(this.signConfirm);
      this._router.navigate(['/s/signin']);
      this.registerUser = true;
    }



    searchProduct($event) {
      const inputDeterminant = this.navSearch.nativeElement.value;

      // is use to check if string is inputted
      if (isNaN(inputDeterminant)) {
          const value = $event.currentTarget.value.toLowerCase();
          this._productFireService.navSearchProduct.next(value);
          // this.products = this._products.filter((product: Product) =>
          //  this.navSearchCheck = product.name.toLowerCase().includes(value));

          return false;
      } else {
          const value = $event.currentTarget.value.toString();
          this._productFireService.navSearchProduct.next(value);

      }

    }

addToCart() {
  this.cartChangedProductClean = this._productFireService.cartChangedProduct.subscribe(
    (produ: Product) => {
      this.cartComponent.addItemToCarts(produ);
      console.log(produ);
      // localStorage.setItem('produCart', stringify('produ'));
      // sessionStorage.setItem( 'produCart', JSON.stringify(produ));
       this.toast.success('Total Products in cart: ' + this.totalItemsInCart, ''
       , {timeOut: 2000, progressAnimation: 'increasing', positionClass: 'toast-bottom-left'});


    }
  );

}

carouselChange() {
  this.closeCarousel = false;
  this.CarouselClosed = true;
}

    // use to make the cart visible and invisible
    toggleCartView() {
      this.cartComponent.showCart();
}


    // check if checkout is successful
    checkOutSuccessful($event: any[]) {
      this._products.forEach(product => {

        // const itemInCart = $event.find((x: any) =>
        //   x.productId === product.name,
        //   console.log(product.name));
        const itemInCart = $event.find((x) =>
        x.productId === product.id );
        console.log(itemInCart);
        
        if (itemInCart) {
            product.stock -= itemInCart.quantity;

            this._productService.addProduct()
                  .subscribe(
                      (response: Response) => {
                      // console.log(response);
                      // this.toast.success('Thanks for your patronage');
                  },
                  (error) => {

                      this.toast.error(error);
                   }
              // , (error) => {console.log(error); }
                   );
        }
    });

  }

  onLogout () {

  this.authenticateService.logout();
  this.authenticateService.isNotAuthenticated();
  this._router.navigate(['/']);
  this.toast.success('logout successful');
  // alert('logout successful');
      }


  ngOnDestroy() {
  this.productCarouselClean.unsubscribe();
  this.cartChangedClean.unsubscribe();
  this.urlCheckCarouseHClean.unsubscribe();
  this.cartChangedProductClean.unsubscribe();
}
}
