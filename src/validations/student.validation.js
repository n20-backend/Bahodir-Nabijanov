import Joi from 'joi';

export const StudentValidation = (body, isUpdate = false) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .min(2)
            .required(!isUpdate),

        lastName: Joi.string()
            .min(2)
            .required(!isUpdate),

        email: Joi.string()
            .email()
            .required(!isUpdate),

        birthdate: Joi.date()
            .less('now')
            .required(!isUpdate),

        enrollmentDate: Joi.date()
            .greater(Joi.ref('birthdate'))
            .required(!isUpdate),

        status: Joi.string()
            .valid('active', 'graduated', 'suspended', 'expelled')
            .required(!isUpdate),

        address: Joi.string()
            .allow('', null),

        phoneNumber: Joi.string()
            .pattern(/^[0-9+\-\s]{7,20}$/)
            .allow('', null),

        courses: Joi.array()
            .items(Joi.string().guid({ version: 'uuidv4' }))
            .default([])
    });

    return schema.validate(body, {
        abortEarly: false,
        allowUnknown: false
    });
};
