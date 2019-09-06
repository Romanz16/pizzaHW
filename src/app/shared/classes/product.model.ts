import { IProduct } from '../interfaces/product.interface';

export class Product implements IProduct {
    constructor(
        public id: number,
        public title: string,
        public text: string,
        public size: string,
        public weight: string,
        public price: string,
        public idCat: string,
        public  src: string
    ) { }
}