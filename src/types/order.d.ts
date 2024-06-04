import { IUsers } from "./user";

export interface IOrder {
    _id?: ObjectId;
    userId?: string;
    totalAmount?: number;
    deliveryAddressId?: string;
    paymentId?: string;
    productDetails?: IOrderDetails[];
    userData?: IUsers;
    addressDetails?: IDeliveryAddress;
    trackingDetails?: ITrackingDetails;
    status?: string;
    createdAt?: any;
    updatedAt?: any;
}

export interface IOrderDetails {
    _id?: ObjectId;
    productId?: string;
    userId?: string;
    orderId?: string;
    product?: any[];
    qty?: number;
    totalPrice?: number;
}

export interface IDeliveryAddress {
    _id?: ObjectId;
    userId: string;
    addressFirst: string;
    addressSecond: string;
    area: string;
    landmark: string;
    country: string;
    state: string;
    city: string;
    pinCode: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITrackingDetails {
    _id?: ObjectId;
    trackingId: string;
    packingId: string;
    orderId: string;
    video: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum OrderStatusType {
    Pending = "Pending",
    ReadyToShip = "Ready To Ship",
    Shipped = "Shipped",
    Delivered = "Delivered",
    Cancelled = "Cancelled"
}