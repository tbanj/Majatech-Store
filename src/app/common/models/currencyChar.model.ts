import { Injectable } from '@angular/core';

// this a model to show how to make use of interface

export class CurrencyCheck {
    id: number;
    name: string;

    constructor (id: number, name: string) {
        this.id = id;
        this.name = name;
    }
  }

  export class Cur {
      curre: CurrencyCheck;
  }




//   @Injectable()
//   export abstract class CurrencyChar {

//     // abstract method which is partially implemented
//     abstract getCurrencyChar(): CurrencyCheck[];
//   }


