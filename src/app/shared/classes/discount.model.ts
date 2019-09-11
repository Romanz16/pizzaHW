import { IDiscount } from '../interfaces/discout.interface';

export class Discount implements IDiscount {
    constructor(
        public id: number,
        public title: string,
        public text: string,
        public src: string
    ) {}
} 
