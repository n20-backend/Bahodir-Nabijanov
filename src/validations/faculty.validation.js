import Joi from 'joi';
import { version } from 'uuid';

export const FacultyValidation = (body) => {
    const schema = Joi.object({
        name: Joi.string()
            .guid({ version: ['uuidv4']})
            .required({
                'string.guid': `"name" uuid (v4) formatda bolishi kerak`
            }),

        description: Joi.string()
            .trim()
            .min(5)
            .required(!isUpdate)
            .message({
                'string.base': `"description" matn bolishi shart`,
                'string.min': `"description" kamida (#limit) belgi bolishi kerak`
            }),

    });

    return schema.Validate(body, {
        abortEarly: false,
        allowUnknown: false
    });
};