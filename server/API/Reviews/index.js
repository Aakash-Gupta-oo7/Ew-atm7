import express from "express";

import { ReviewModel } from "../../Database/allModels";

const Router = express.Router();

/*
Route           /new
Descrip         Add new review
Params          None
Body            Review Object
Access          Public
Method          POST
*/

Router.post("/new/:_id", async(req, res) => {
    try {
        const {reviewData} = req.body;
        await ReviewModel.create(reviewData);

        return res.json({review: "Successfull created review"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route           /delete
Descrip         Delete review
Params          _id
Access          Public
Method          DELETE
*/

Router.post("/delete/:_id", async(req, res) => {
    try {
        const {_id} = req.params;
        await ReviewModel.findByIdAndDelete(_id);

        return res.json({review: "Successfully deleted review"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;