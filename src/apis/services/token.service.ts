import jwt from 'jsonwebtoken';

import { JwtPayload } from '../../types/jwt-payload.type';
import { env } from '../../configs/env';
import { IStaff, IStore, IUser, Role } from '../types';

const generateJwtToken = async (user: IStaff | IStore): Promise<string> => {
    let payload = {} as JwtPayload;

    if (user.kind === 'staff') {
        payload = {
            id: user.id,
            name: user.fullName,
            email: user.email,
            role: user.typeStaff.role,
        };
    } else {
        payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }

    const token = jwt.sign(payload, env.passport.jwtToken, {
        expiresIn: env.passport.jwtAccessExpired,
    });

    return `Bearer ${token}`;
};

export { generateJwtToken };
