
import { Key } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CurrencyService {
    currencyApiUri = 'http://data.fixer.io/api/latest?access_key=';
    currencyApiUriKey = '81ab990be969aaf2e8a138474413818b';

    newAddPrice: any[];
    symbolCur: string;
    newPrice: number;
    newNaira: number;
    checkRate = 'rates';
     priceIndex: Array<any>;
    constructor( private _http: HttpClient) {}
    // currencyApi () {
    //     return this._http.get(this.currencyApiUri + this.currencyApiUriKey);
    // }

    currencyApi () {
        return this._http.get('http://data.fixer.io/api/latest?access_key=81ab990be969aaf2e8a138474413818b');

    }

    priceRates () {
        this.currencyApi()
        .subscribe((valuea: Object) => {
          // convert object to array
          const keys = Object.keys(valuea);
          const valueRates = Object.values(valuea);

          // serching for a particular member in array
          const keyRate = keys.findIndex(number => number === 'rates');
              // console.log(valueRates[keyRate]);

          // valueRates[keyRate] is {} need to be change to []
          // convert object to array
          const keyRateInner = Object.keys(valueRates[keyRate]);
          const valueRateInner = Object.values(valueRates[keyRate]);
            for (let index = 0; index < keyRateInner.length; index++) {
                if (keyRateInner[index] === 'EUR') {
                    console.log(valueRateInner[index] + ' ' + keyRateInner[index]);
                    // const eurPri = valueRateInner[index];
                    const eurItem = {eurPri: valueRateInner[index], eurPriSy: keyRateInner[index] };

                    sessionStorage.setItem( 'eurPriceIndex', JSON.stringify(eurItem));
                }
                if (keyRateInner[index] === 'NGN') {
                    console.log(valueRateInner[index] + ' ' + keyRateInner[index]);
                    const naiItem = {naiPri: valueRateInner[index], naiPriSy: keyRateInner[index] };

                    sessionStorage.setItem( 'naiPriceIndex', JSON.stringify(naiItem));

                }
                if (keyRateInner[index] === 'USD') {
                    console.log(valueRateInner[index] + ' ' + keyRateInner[index]);
                    const usdItem = {usdPri: valueRateInner[index], usdPriSy: keyRateInner[index] };

                    sessionStorage.setItem( 'usdPriceIndex', JSON.stringify(usdItem));

                }

            }
        });
      }

      priceC (dCheck: string) {
        // get the stored data in database in object form
        const storedNam = JSON.parse(sessionStorage.getItem('naiPriceIndex'));
        const valueRateIn = Object.values(storedNam);
          this.newNaira = parseFloat(valueRateIn[0].toString());
        //   const dnewNaira = this.newNaira/ this.newNaira;
console.log(this.newNaira);

      if (dCheck === 'NGN') {

      this.symbolCur = valueRateIn[1].toString();
      // console.log(parseInt(this.symbolCur, 10));
      this.newAddPrice = [1, this.symbolCur];
      console.log(this.newAddPrice);

      } else if (dCheck === 'EUR') {
        const storedNames = JSON.parse(sessionStorage.getItem('eurPriceIndex'));
        const valueRateInne = Object.values(storedNames);
        this.newPrice = this.newNaira / parseFloat(valueRateInne[0].toString());
        this.symbolCur = valueRateInne[1].toString();
        // // console.log(parseInt(this.symbolCur, 10));
        this.newAddPrice = [this.newPrice, this.symbolCur];
        console.log(this.newAddPrice);

      }  else if (dCheck === 'USD') {
        const storedNames = JSON.parse(sessionStorage.getItem('usdPriceIndex'));
        const valueRateInne = Object.values(storedNames);
        // this.newPrice = this.newNaira / parseInt(valueRateInne[0].toString(), 10);
         this.newPrice = this.newNaira / parseFloat(valueRateInne[0].toString());
        this.symbolCur = valueRateInne[1].toString();
        // // console.log(parseInt(this.symbolCur, 10));
        this.newAddPrice = [this.newPrice, this.symbolCur];
        console.log(parseFloat(valueRateInne[0].toString()));
        console.log(this.newAddPrice);
      }

      return this.newAddPrice;
    }
}
