import { Role } from "./role";

export interface User {
    
    id: string;
    email: string;
    name: string;
    surnames: string;
    avatars: string[];
    state: boolean;
    accountValidated: boolean;
    accountValidatedDate: Date;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}