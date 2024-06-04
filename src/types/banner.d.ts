export interface IBanner {
    _id?: ObjectId;
    name: String;
    // image: any;
    imagePath: string;
    createdAt?: Date;
    updatedAt?: Date;
}