// LocalStrategy
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user';

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return done(null, false, { message: 'Email not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password as string);

        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user, { message: `Hello! ${user.name}.`});
    } catch (error) {
        return done(error);
    }
}));