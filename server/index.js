//env variable
require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

//config
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

//API
import Auth from "./API/Auth";
import Brand from "./API/Brand";
import Product  from "./API/Product";
import Variant from "./API/Variant";
import Image from "./API/Image";
import Review from "./API/Reviews";
import User from "./API/User";

//DB Connection
import ConnectDB from "./Database/connection";

const electricwaala = express();

electricwaala.use(express.json());
electricwaala.use(express.urlencoded({encoded: false}));
electricwaala.use(helmet());
electricwaala.use(cors());
electricwaala.use(passport.initialize());
electricwaala.use(passport.session());

//passport configuration
googleAuthConfig(passport);
routeConfig(passport);

//For application routes
//localhost:3000/auth/signup
electricwaala.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

electricwaala.use("/auth", Auth);
electricwaala.use("/brand", Brand);
electricwaala.use("/product", Product);
electricwaala.use("/variant", Variant);
electricwaala.use("/image", Image);
electricwaala.use("/review", Review);
electricwaala.use("/profile", User);

electricwaala.get("/", (req, res) => res.json({message: "Setup Success"}));

electricwaala.listen(4000, () => ConnectDB().then(()=>console.log("Server is up and running")).catch(()=>console.log("DB connection failed")));