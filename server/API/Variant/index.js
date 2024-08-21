import express from "express";

//Database Model
import { VariantModel, ImageModel } from "../../Database/allModels";

const Router = express.Router();

/*
Route           /list
Des             Get all list of Variants based on id
Params          _id
Access          Public
Method          GET
*/

Router.get("/list/:_id", async(req, res) => {
    try {
        const {_id} =req.params;
        const variants = await VariantModel.findOne(_id);

        return res.json({variants});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route           /image
Des             Get image of menu based on id
Params          _id
Access          Public
Method          GET
*/

Router.get("/image/:_id", async(req, res) => {
    try {
        const {_id} =req.params;
        const variants = await ImageModel.findOne(_id);

        return res.json({menus});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;