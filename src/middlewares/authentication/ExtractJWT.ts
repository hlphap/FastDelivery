import {Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";
import { Staff } from "../../app/models";

const strategy = new JwtStrategy({
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "KeySecret",
}, async (payload, done) => {
    try {
        const { sub: staffID } = payload;

        const staff = await Staff.findById(staffID);

        if (!staff) done(null, false);

        return done(null, staff);

    } catch (error) {
        return done(error, false);
    }
})

export default strategy;
