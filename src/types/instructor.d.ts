export interface Permission {
    read: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
}
  
export interface PermissionGroup {
    group: string;
    permissions: Permission;
}
  
export interface Instructor {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    number: number;
    password: string;
    permissionGroups: PermissionGroup[];
    createdAt?: Date;
    updatedAt?: Date;
}