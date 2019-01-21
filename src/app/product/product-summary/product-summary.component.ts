import { WINDOW } from '@ng-toolkit/universal';
import { AuthenticateService } from './../../authenticate/authenticate.service';
import { Component, OnInit, HostListener , Inject} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.css']
})
export class ProductSummaryComponent implements OnInit {
  handler: any;
  amount = 500;
  constructor(@Inject(WINDOW) private window: Window, private _router: Router, private authService: AuthenticateService) { }

  ngOnInit() {
  //   if (this.authService.token === null) {
  //     console.log('hello');

  //     this._router.navigate(['/']);
  // }  else if (this.authService.token !== null) {
  //   this._router.navigate(['/product-summary']);
  // }


    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://diylogodesigns.com/wp-content/uploads/2015/12/best-shopping-Cart-Logo-design-10.gif',
      locale: 'auto',
      token: token => {
        // console.log(token);
        //  this.paymentSvc.processPayment(token, this.amount)
      }
    });
  }

  handlePayment() {
    this.handler.open({
      name: 'FireStarter',
      excerpt: 'Deposit Funds to Account',
      amount: this.amount
    });
  }

  continueShopping() {
    this._router.navigate(['/']);
  }

  @HostListener('window:popstate')
    onPopstate() {
      this.handler.close();
    }

}
