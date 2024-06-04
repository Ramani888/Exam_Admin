type AuthorizedRequest = Express.Request & ?({ headers: { authorization: string } } & ?{ userData: JwtSign });

declare namespace Express {
  type Request = AuthorizedRequest;
}

export type UserJwt = {
  firstName?: string;
  lastName?: string;
  id?: number;
  roleId: number;
  customerId: number;
  dataModelId: number;
  exp?: number;
};

interface IRealProfile {
  _id: ObjectId;
  name: String;
  userName: String;
  age: Number;
  gender: String;
  profilePictureUrl: String;
  location: String;
}

interface IPseudonymousProfile {
  userName: String,
  profilePictureUrl: String,
}

interface IAnonymousProfile {
  _id: ObjectId;
}

interface IUser {
  _id: ObjectId;
  email: string;
  password: string;
  timestamps: Date;
  realProfile: IRealProfile;
  pseudonymousProfile: IPseudonymousProfile;
  anonymousProfile: IAnonymousProfile;
  identityMode: String;
  isDeleted: Boolean;
}

export interface IUsers {
  _id: ObjectId;
  businessType: string;
  name: string;
  companyName: string;
  mobileNumber: number;
  email: string;
  phoneNumber: number;
  addressFirst: string;
  addressSecond: string;
  area: string;
  country: string;
  state: string;
  city: string;
  pinCode: number;
  panNo: string;
  gstNo: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}