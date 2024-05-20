import { Apartment } from "./apartment";

export class User {
    constructor(public _id?:String, public email?:String, public token?:String, public isAdvertiser?:boolean, public phone?:String, public phone2?:String, public apartments?:Array<Apartment>) {};
}