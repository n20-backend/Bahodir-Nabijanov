import Joi from 'joi';

export const CourseValidation = (body, isUpdate = false) => {
    const schema = Joi.object({
        title: Joi.string()
            .min(5)
            .required(!isUpdate)
            .messages({
                'string.min': `"title" kamida 5 ta belgidan iborat bo'lishi kerak`,
                'any.required': `"title" majburiy maydon`
            }),

        description: Joi.string()
            .allow('', null)
            .optional(),

        credits: Joi.number()
            .integer()
            .min(1)
            .max(10)
            .required(!isUpdate)
            .messages({
                'number.base': `"credits" butun son bo'lishi kerak`,
                'number.min': `"credits" 1 dan kam bo'lmasligi kerak`,
                'number.max': `"credits" 10 dan ko'p bo'lmasligi kerak`
            }),

        facultyId: Joi.string()
            .guid({ version: ['uuidv4'] })
            .required(!isUpdate)
            .messages({
                'string.guid': `"facultyId" UUID v4 formatda bo'lishi kerak`
            }),

        status: Joi.string()
            .valid('active', 'inactive')
            .required(!isUpdate)
            .messages({
                'any.only': `"status" faqat ['active', 'inactive'] qiymatlarini oladi`
            })
    });

    return schema.validate(body, {
        abortEarly: false,
        allowUnknown: false
    });
};
