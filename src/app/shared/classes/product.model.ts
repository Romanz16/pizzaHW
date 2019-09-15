import { IProduct } from '../interfaces/product.interface';

export class Product implements IProduct {
    constructor(
        public id: string,
        public title: string,
        public text: string,
        public size: string,
        public weight: string,
        public price: string,
        public idCat: string,
        public  src: string
    ) { }
}
