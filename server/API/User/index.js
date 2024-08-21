import express from "express";

import { UserModel } from "../../Database/allModels";

const Router = express.Router();

/*
Route           /_id
Descrip         Get an user data
Params          _id
Body            none
Access          Public
Method          Get
*/

Router.get("/:_id", async(req, res) => {
    try {
        const {_id} = req.params;
        const {getUser} = await UserModel.findById(_id);

        return res.json({user: getUser});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route           /update
Descrip         Update an user data
Params          _userId
Body            user data
Access          Public
Method          PUT
*/

Router.put("/update/:_id", async(req, res) => {
    try {
        const {userId} = req.params;
        const {userData} = req.body;
        const updateUserData = await UserModel.findByIdAndUpdate(
            userId,
            {
                $set: userData
            },
            {
                new: true
            }
        );

        return res.json({user: updateUserData});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;