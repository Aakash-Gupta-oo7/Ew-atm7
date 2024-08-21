import { BrandModel } from "../../Database/allModels";
import express from "express";


const Router = express.Router();

import { ValidateBrandCity, ValidateBrandSearchString } from "../../Validation/brand";
import { ValidateBrandId } from "../../Validation/product";

/*
Route           /
Des             get all brand details
Params          None
Access          Public
Method          GET
*/

Router.get("/", async(req, res) => {
    try {
        await ValidateBrandCity(req.query);
        const {city} = req.query;
        const brands = await BrandModel.find({city});
        return res.json({brands});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route           /
Des             get particular restaurant details on id
Params          _id
Access          Public
Method          GET
*/

Router.get("/:_id", async(req, res) => {
    try {
        await ValidateBrandId(req.params);
        const { _id } = req.params;
        const brand = await BrandModel.findOne({_id});
        
        if(!brand)
        return res.status(404).json({error: "Brand not found"});

        return res.json({brand});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route           /search
Des             get restaurant details on search
Params          none
body            searchString
Access          Public
Method          GET
*/

Router.get("/search", async(req, res) => {
    try {
        await ValidateBrandSearchString(req.body);
        const { searchString } = req.body;
        const brands = await BrandModel.find({
            name: {$regex: searchString, $options: "i"},
        });
        return res.json({brands});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;