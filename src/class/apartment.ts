import { Advertiser } from "./advertiser";
import { Category } from "./category";
import { City } from "./city";

export class Apartment {
    
    constructor(
        public address?:string,
        public numBeds?:Number, 
        public price?:Number, 
        public img?:string, 
        public name?:string,
        public description?:string, 
        public additions?:string,
        public advertiser?:Advertiser,
        public category?:Category,
        public city?:City,
        public _id?:string) {}
    
}