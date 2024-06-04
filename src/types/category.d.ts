export interface ICategory {
    _id?: ObjectId;
    name: string;
    // image: any;
    imagePath: string;
    createdAt?: Date;
    updatedAt?: Date;
}