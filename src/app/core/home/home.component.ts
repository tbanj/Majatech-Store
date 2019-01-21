import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Helper } from './../../common/models/helper.model';
import { CurrencyService } from './../../common/service/currency.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ProductService } from './../../common/service/product.service';
import { Component, OnInit, ViewChild, OnDestroy , Inject} from '@angular/core';
import { Product } from '../../common/models/product.model';
import { CartComponent } from '../../cart/cart.component';
import { ProductFireService } from '../../common/service/productfire.service';
import { ToastrService } from 'ngx-toastr';
import { Meta, Title } from '@angular/platform-browser';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy  {
    urlCheck: any;
    @ViewChild('searchInputH') searchInputH;
    show: boolean;
    products: Product[];
    productPrice: Product[];

    priceEur: Product[];
    priceNair: Product[];
    priceUsd: Product[];


    priceTest = 0;

    aNaira: number;
    datan: Product[];
    am:  Product[];
    proAdd: Product;
    numCart: any;
    numCartCheck: any;
    currencydecide = 1;
    currencydecideLog = 'NGN';
    currdecideLog = '₦';
    amPrice: number;

    symbolCur: string;
    newPrice: number;
    valueSymCheck: string;
    Umm; jmm; temparray;
    chunk = 6;

    private _products: Product[];
    dispCarousel: any;
    id: number;
    nairaCurrency = 'NGN' ;

    cleanProduct: Subscription;
    cleanProductFilter: Subscription;
    navSearchProductClean: Subscription;
    paramsSubscription: Subscription;
    cartTotalClean: Subscription;

    get totalItemsInCart(): number {
        this.numCart = this.cartComponen && this.cartComponen.totalItems;
        this._productFireService.cartChanged.next(this.cartComponen && this.cartComponen.totalItems);
        return this.numCart;
    }



    @ViewChild('form')
    private form: NgForm;

    @ViewChild(CartComponent)
    private cartComponen: CartComponent;

    constructor(
    private _productService: ProductService, private _productFireService: ProductFireService
        , private _toastr: ToastrService, private title: Title, private meta: Meta,
        private activatedRoute: ActivatedRoute, private helper: Helper,
        private currencyService: CurrencyService) {
        this.products = [];
        this._products = [];
        this.datan = [];
        this.productPrice = [];
        this.priceEur = [];
        this.priceNair = [];
        this.priceUsd = [];

    }

    ngOnInit(): void {

        this.urlCheck = 'featured-services';
        this.dispCarousel = true;
        this._productFireService.urlCheckHeader.next(this.urlCheck);
        this._productFireService.urlCheckCarouseH.next(this.dispCarousel);



        this.currencyService.priceRates();

        if (!JSON.parse(sessionStorage.getItem('aNaira'))) {

            this.products = this._products = this._productFireService.getProducts();
            this.cleanProduct = this._productService.getAllProducts().subscribe(data => {
                this._productFireService.setProducts(data);
            });
        }

        if (JSON.parse(sessionStorage.getItem('aNaira'))) {
            // const products = JSON.parse(sessionStorage.getItem('aNaira'));
            this.products = JSON.parse(sessionStorage.getItem('aNaira'));
            this.currdecideLog = sessionStorage.getItem('curSign');
            // const storedPru = Object.values(storedPraitemNairm);
            // this.aNaira = parseInt(storedPru[0].toString(), 10) ;
            // console.log(this.currdecideLog);
        }

        this._productFireService.productsChanged.subscribe(
            (product: Product[]) => {

                this.products = this._products = product;

            }
        );

        this._productFireService.priceConfirm.subscribe((valueLo: string) => {
            this.valueSymCheck = valueLo;
            // console.log(this.valueSymCheck);
            const aa = this.currencyService.priceC(this.valueSymCheck);
            this.currencydecide = aa[0];
            this.currencydecideLog = aa[1];
            // console.log(this.currencydecideLog);
            // console.log(aa);


            this.products = this._products = [];

            this.priceNair = this._productFireService.getProducts();

            this.priceNair.forEach(element => {
                if (this.currencydecideLog === 'NGN') {
                    this.currdecideLog = '₦';
                    this.priceTest = element.price * this.currencydecide;
                    this.priceTest = Math.round(this.priceTest * 100) / 100;
                } else if (this.currencydecideLog === 'USD') {
                    // this.currencydecide = this.currencydecide;
                    this.priceTest = element.price / this.currencydecide;
                    this.priceTest = Math.round(this.priceTest * 100) / 100;
                    this.currdecideLog = '$';
                } else if (this.currencydecideLog === 'EUR') {
                    // const JSON.parse(sessionStorage.getItem('itemNairm')
                    this.currencydecide = this.currencydecide;
                    this.priceTest = element.price / this.currencydecide;
                    // is use to limit priceTest to 2 d.p
                    this.priceTest = Math.round(this.priceTest * 100) / 100;
                    this.currdecideLog = '€';
                }

                this._products.push(new Product(element.id, element.name, element.description,
                            element.stock, this.priceTest, element.imagePath));
                const itemNaira = this._products;
                sessionStorage.setItem( 'aNaira', JSON.stringify(itemNaira));

                sessionStorage.setItem( 'curSign', this.currdecideLog);



        }
        );

            // console.log(this.products);

            this._productFireService.productsChanged.subscribe(
                (product: Product[]) => {

                    this.products = this._products = product;

                }
            );




        });

 

        // this._productFireService.getProducts();
          // use to minimize the carousel at home url


          // use to recieve data which is being inputted at the search bar of the header
          this.cleanProductFilter = this._productFireService.navSearchProduct.subscribe();

          // use to call the navCheckSearch method
          this.navCheckSearch();

          this.cartTotalClean = this._productFireService.urlCartTotal.subscribe(
            (cart: any) => {
                this._toastr.success(cart, '' , {timeOut: 3000});
                // this.toastrService.error('everything is broken', 'Major Error', {
                //     timeOut: 3000
                //   });
            }
        );

         // seo meta tag
    this.title.setTitle(`Majatech Store`);
    this.meta.updateTag({
        'description': 'Your No. 1 store for durable, pocket friendly notebooks, laptops ,gadgets and innovative tech products',
        'keyword': ' maja affordable hp laptops, maja lenovo laptops ,maja macintosh laptops, maja Apple laptops'
    });

    this.paramsSubscription = this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          // + is use to conver the string return we get to number type
          this.id = +params['id'];
        //   this.products = this.recipeService.getRecipe(this.id);

          // seo tags
            // this.title.setTitle(`Detail description of ${this.recipe.name} meal`);
            this.meta.updateTag({
           'description': 'Detail of personalized recipes menu, food, meal, onje which display detail information about the meal in stock',
           'keyword': ' detail of maja abula, owanbe buka,  detail of maja efokore, detail of maja ila-alasepo,detail of maja Spaghetti'
       });
        }
      );


    }


        checkLocal () {
            this.priceNair = this._productFireService.getProducts();
            this.priceNair.forEach(element => {
                if (this.aNaira === undefined && this.currencydecideLog === 'NGN' ) {
                    element.price = element.price;

                } else if ( this.currencydecideLog === 'USD' ) {
                    element.price = element.price / this.currencydecide;
                }
                element.price = element.price / this.currencydecide;

            this._products.push(new Product(element.id, element.name, element.description,
                element.stock, element.price, element.imagePath));
                this.products = this._products;
                // const itemNaira = {id: element.id, name: element.name, description: element.description, stock: element.stock,
                //     price: element.price, imagePath: element.imagePath };
                const itemNaira = this._products;
                sessionStorage.setItem( 'aNaira', JSON.stringify(itemNaira));

        }
        );

        }






        // it filter the products based on inputs at the search bar
        navCheckSearch () {
            this.navSearchProductClean = this._productFireService.navSearchProduct.subscribe(
                (productSearch: any) => {
                    if (isNaN(productSearch)) {
                        this.products = this._products.filter((product: Product) =>
                         product.name.toLowerCase().includes(productSearch));
                        return false;
                    } else {
                        this.products = this._products.filter((product: Product) =>
                         product.price.toString().includes(productSearch));

                    }
                }
            );
        }

    addToCart(product: Product) {
        this.proAdd = product;
        this._productFireService.cartChangedProduct.next(product);
    }

    // use to make the cart visible and invisible
    toggleCartView() {
          this.cartComponen.showCart();
    }



    // check if checkout is successful
    checkOutSuccessful($event: any[]) {
        this._products.forEach(product => {
            const itemInCart = $event.find(x => x.productId === product.id);

            if (itemInCart) {
                product.stock -= itemInCart.quantity;
            }
        });

    }

    ngOnDestroy() {
        this.cleanProduct.unsubscribe();
        this.cleanProductFilter.unsubscribe();
         this.navSearchProductClean.unsubscribe();
         this.cartTotalClean.unsubscribe();
         this.paramsSubscription.unsubscribe();
    }

}
