import { Product } from './../common/models/product.model';
import { Cart } from './../common/models/cart.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CartService {
    carts: Cart[];

    get totalItems(): number {
        return this.carts.reduce((prev, curr) => prev = curr.quantity + prev, 0);
    }

    addItemToCarts(product: Product) {
        let cartInList = this.carts.find(x => x.id === product.id);

        if (cartInList) {
            cartInList.quantity += 1;
        } else {
            cartInList = new Cart(product.id, product.name, product.price, 1);
            this.carts.push(cartInList);
        }

        // const count = this.carts.reduce( (total, cart: Cart) => cart.id == product.id ? total + 1 : total, 0);

        // const cart = new Cart(product.id, product.name, product.price, count);

        // this.carts.push(cart);
    }
}

