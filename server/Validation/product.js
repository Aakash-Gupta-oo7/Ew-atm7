import joi from "joi";

export const ValidateBrandId = (brandId) => {

    const Schema = joi.object({
      _id: joi.string().required()
    });
    
    return Schema.validateAsync(brandId);
};

export const ValidateCategory = (category) => {

    const Schema = joi.object({
      category: joi.string().required()
    });
    
    return Schema.validateAsync(category);
};