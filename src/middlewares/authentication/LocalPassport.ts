
import { Strategy as LocalStrategy } from "passport-local";
import { Staff } from "../../app/models";

const strategy = new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
}, async (email, password, done) => {
    try {
        const staff = await Staff.findOne({ email });

        if (!staff) return done(null, false);

        const isCorrectPassword = await staff.isValidPassword(password);

        if (!isCorrectPassword) return done(null, false);

        return done(null, staff);
    } catch(error) {
        done(error, false);
    }

})

export default strategy;