import Joi from 'joi';

const loginSchema = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

const registerSchema = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        displayName: Joi.string().required(),
    }),
};

const changePasswordSchema = {
    body: Joi.object().keys({
        passwordPre: Joi.string().required(),
        passwordNew: Joi.string().required(),
    }),
};

export { loginSchema, registerSchema, changePasswordSchema };
