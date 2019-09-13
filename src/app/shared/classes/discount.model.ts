import { IDiscount } from '../interfaces/discout.interface';

export class Discount implements IDiscount {
    constructor(
        public id: string,
        public title: string,
        public text: string,
        public src: string
    ) {}
} 
