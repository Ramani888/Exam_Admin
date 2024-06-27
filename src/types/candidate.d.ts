export interface ICandidate {
    _id?: ObjectId;
    batchId?: string;
    rollNumber?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    email?: string;
    number?: number;
    profileImg?: string;
    createdAt?: Date;
    updatedAt?: Date;
}