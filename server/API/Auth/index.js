import express from "express";
import passport from "passport";

const Router = express.Router();

import { UserModel } from "../../Database/user";
import { ValidateSignup, ValidateSignin } from "../../Validation/auth";

/*
    Route           /signup
    Descrip         Signup with email and password
    Params          None
    Access          Public
    Method          POST
*/

Router.post("/signup", async(req, res) => {
    try {
        const {fullname, email, phoneNumber, password} = req.body;
        await ValidateSignup({fullname, email, phoneNumber, password});

        await UserModel.findEmailAndPhone({email, phoneNumber});

        //Database
        const newUser = await UserModel.create({fullname, email, phoneNumber, password});

        //JWT Auth Token
        const token = await newUser.generateJwtToken();

        return res.status(200).json({token});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
    Route           /signin
    Descrip         Signin with email and password
    Params          None
    Access          Public
    Method          POST
*/

Router.post("/signin", async(req, res) => {
    try {    
        const {email, password} = req.body;

        await ValidateSignin({email, password}); 
        const user = await UserModel.findByEmailAndPassword({email, password});

        //JWT Auth Token
        const token = await user.generateJwtToken();

        return res.status(200).json({token, status: "Success"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

Router.get("/google", passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ],
}));

Router.get("/google/callback", passport.authenticate("google", {failureRedirect: "http://localhost:3000/auth/google", successRedirect: "http://localhost:3000/"}),
async(req, res) => {

    return res.json({token: req.session.passport.user.generateJwtToken()});
});

export default Router;