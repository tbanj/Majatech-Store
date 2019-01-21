export class Product {
    id: number;
    name: string;
    description: string;
    stock: number;
    price: number;
    imagePath: string;

    constructor (id: number, name: string, description: string,
        stock: number,
        price: number,
        imagePath: string) {

            this.id = id;
            this.name = name;
            this.description = description;
            this.stock = stock;
            this.price = price;
            this.imagePath = imagePath;
    }

}
