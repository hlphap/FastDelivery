import { Role } from '../apis/types/user.type';

export interface JwtPayload {
    id: string;
    name: string;
    email: string;
    role: Role;
}
