const Joi = require('@hapi/joi');

class DataValidation{
    static registerValidation(req){
        const validationSchema = Joi.object({
            name: Joi.string().min(8).required(),
            email: Joi.string().min(8).required().email(),
            password: Joi.string().min(8).required()
        })
        return validationSchema.validate(req);
    }

    static loginValidation(req){
        const validationSchema = Joi.object({
            email: Joi.string().min(8).required().email(),
            password: Joi.string().min(8).required()
        })
        return validationSchema.validate(req);
    }
}

module.exports = {DataValidation};