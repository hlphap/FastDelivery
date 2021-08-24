import Joi from "joi";

const schema = {
    id: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    }),

    // createDVMethod: Joi.object().keys({
    //     name: Joi.string().min(1).max(100).required(),
    //     innerDistrictFee: Joi.string().min(1).max(100).required(),
    //     outerDistrictFee: Joi.string().min(1).max(100).required(),
    //     surChargeInner: Joi.string().min(1).max(100).required(),
    //     surChargeOuter: Joi.string().min(1).max(100).required(),
    //     feeChangeAddressDelivery: Joi.string().min(1).max(100).required(),
    //     feeStorageCharges: Joi.string().min(1).max(100).required(),
    //     feeReturn: Joi.string().min(1).max(100).required(),
    // })
}

export default schema;