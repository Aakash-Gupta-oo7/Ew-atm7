import joi from "joi";

export const ValidateBrandCity = (brandObj) => {
    const Schema = joi.object({
      city: joi.string().required()
    });
    
    return Schema.validateAsync(brandObj);
};

export const ValidateBrandSearchString = (brandObj) => {
    const Schema = joi.object({
      searchString: joi.string().required()
    });
    
    return Schema.validateAsync(brandObj);
};