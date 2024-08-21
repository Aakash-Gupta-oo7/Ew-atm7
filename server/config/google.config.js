import googleOAuth from "passport-google-oauth20";

import { UserModel } from "../Database/allModels";

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:4000/auth/google/callback"
        },
        async(accessToken, refreshToken, profile, done) => {
            //creating a new user
            const newUser = {
                fullname: profile.displayName,
                email: profile.emails[0].value,
                profilePic: profile.photos[0].value
            };
            try {
                //check whether user exists or not
                const user = await UserModel.findOne({email: newUser.email});
                
                if(user) {
                    //generating JWT token
                    const token = user.generateJwtToken();
                    //return user
                    done(null, {user, token});
                }
                else {
                    //ceating new user
                    const user = await UserModel.create(newUser);
                    //JWT token
                    const token = user.generateJwtToken();
                    //return user
                    done(null, {user,token});
                }
            } catch(error) {
                done(error, null);
            }
        }
        )
    );

    passport.serializeUser((userData, done) => done(null, {...userData}));
    passport.deserializeUser((_id, done) => done(null, id));
};