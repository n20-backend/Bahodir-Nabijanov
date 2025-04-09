import Joi from 'joi';

export const UserValidation = (body, isUpdate = false) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(!isUpdate)
            .messages({
                'string.email': `"email" to'g'ri email formatida bo'lishi kerak`,
                'any.required': `"email" majburiy maydon`
            }),

        username: Joi.string()
            .min(3)
            .required(!isUpdate)
            .messages({
                'string.min': `"username" kamida 3 ta belgidan iborat bo'lishi kerak`,
                'any.required': `"username" majburiy maydon`
            }),

        password: Joi.string()
            .min(8)
            .required(!isUpdate)
            .messages({
                'string.min': `"password" kamida 8 belgidan iborat bo'lishi kerak`,
                'any.required': `"password" majburiy maydon`
            }),

        role: Joi.string()
            .valid('student', 'teacher', 'admin')
            .required(!isUpdate)
            .messages({
                'any.only': `"role" faqat ['student', 'teacher', 'admin'] qiymatlarini olishi mumkin`
            }),

        status: Joi.string()
            .valid('active', 'inactive')
            .required(!isUpdate)
            .messages({
                'any.only': `"status" faqat ['active', 'inactive'] qiymatlari bo'lishi mumkin`
            })
    });

    return schema.validate(body, {
        abortEarly: false,
        allowUnknown: false
    });
};
