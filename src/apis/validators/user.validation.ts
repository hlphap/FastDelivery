import Joi from 'joi';

const createUserSchema = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        displayName: Joi.string().required(),
    }),
};

const updateUserSchema = {
    params: Joi.object().keys({
        userID: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
    }),
    body: Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string(),
        displayName: Joi.string(),
    }),
};

const deleteUserSchema = {
    params: Joi.object().keys({
        userID: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
    }),
};
export { createUserSchema, updateUserSchema, deleteUserSchema };
