import { CartItem, ShippingInfo, User } from "./types";



export interface UserReducerInitail{
    user:User | null;
    loading:boolean
}


export interface CartReducerInitail{
loading:boolean,
cartItems:CartItem[],
subtotal:number,
tax:number,
shippingCharges:number,
discount:number,
total:number,
shippingInfo:ShippingInfo;
}

