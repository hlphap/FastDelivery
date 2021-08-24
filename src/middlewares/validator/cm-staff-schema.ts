import Joi from "joi";

const schema = {
    id: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    }),
}

export default schema;