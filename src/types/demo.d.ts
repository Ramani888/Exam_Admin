export interface IDemoRequest {
    _id?: ObjectId;
    companyName?: string;
    name?: string;
    email?: number;
    number?: number;
    isDemoRequest?: boolean;
    subject?: string;
    message?: string;
    createdAt?: Date;
    updatedAt?: Date;
}