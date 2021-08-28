import JwtStrategy from "./ExtractJWT";
import LocalStrategy from "./LocalPassport";
import passport from "passport";

passport.use(JwtStrategy);
passport.use(LocalStrategy);

export default passport;