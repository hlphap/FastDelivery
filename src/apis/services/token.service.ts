import jwt from "jsonwebtoken";

import { JwtPayload } from "../../types/jwt-payload.type";
import { env } from "../../configs/env";
import { IUser, Role } from "../types";

const generateJwtToken = async (user: IUser): Promise<string> => {
    const payload: JwtPayload = {
        id: user.id,
        name: user.displayName,
        email: user.email,
        role: user.role as Role,
    };

    const token = jwt.sign(payload, env.passport.jwtToken, {
        expiresIn: env.passport.jwtAccessExpired,
    });

    return `Bearer ${token}`;
};

export { generateJwtToken };
