import jwt from "jsonwebtoken";
import { IStaff } from "../interfaces";

function SignJWT(user: IStaff){
    let issuer = "Phap Huynh";
    let issuedAt = new Date().getTime();
    let expiresIn = new Date().setDate(new Date().getDate() + 3);

    return jwt.sign({
        sub: user.id,
        iss: issuer,
        iat: issuedAt,
        exp: expiresIn,
    },"KeySecret",{
        algorithm: "HS256",
    })
}

export default SignJWT;


