const Joi = require('@hapi/joi');


const registerValidation = (body) => {

    const schema = {
        name: Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    }

    return Joi.validate(body,schema);
}

const loginValidation = (body) => {

    const schema = {
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    }

    return Joi.validate(body,schema);
}

module.exports = {
    registerValidation,
    loginValidation
}