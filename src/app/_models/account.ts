import { Role } from './role';

export class Account {
    id?: string;
    // title?: string;
    userName?: string;
    staffId?: number;
    // lastName?: string;
    email?: string;
    role?: Role;
    jwtToken?: string;
    access_token?: string;
}