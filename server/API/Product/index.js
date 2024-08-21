import express from "express";
import passport from "passport";

//Database Model
import { ProductModel } from "../../Database/allModels";

import { ValidateBrandId, ValidateCategory } from "../../Validation/product";

const Router = express.Router();

/*
Route           /search
Des             Get all the product based on particular brand
Params          _id
body            searchString
Access          Public
Method          GET
*/

Router.get("/:_id", async(req, res) => {
    try {
        await ValidateBrandId(req.params);

        const { _id} =req.params;
        const products = await ProductModel.find({brand: _id});

        return res.json({products});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route           /r
Des             Get all the products based on particular category
Params          param
body            searchString
Access          Public
Method          GET
*/

Router.get("/r/:category", async(req, res) => {
    try {
        await ValidateCategory(req.params);
        const {category} = req.params;
        const products = await ProductModel.find({
            category: {$regex: category, $options: "i"}
        });

        return res.json({products});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;