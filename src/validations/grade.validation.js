import Joi from 'joi';

export const GradeValidation = (body, isUpdate = false) => {
    const schema = Joi.object({
        studentId: Joi.string()
            .guid({ version: 'uuidv4' })
            .required(!isUpdate),

        courseId: Joi.string()
            .guid({ version: 'uuidv4' })
            .required(!isUpdate),

        grade: Joi.string()
            .valid('A', 'B', 'C', 'D', 'F')
            .required(!isUpdate)
    });

    return schema.validate(body, {
        abortEarly: false,
        allowUnknown: false
    });
};
