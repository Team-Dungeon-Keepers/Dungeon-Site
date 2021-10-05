import * as yup from 'yup'

const schema = yup.object().shape({
    username: yup.string()
        .required('username is required')
        .min(3, 'username must be at least three characters'),
    password: yup.string()
        .required('password is required'),
    confirmPassword: yup.string()
        .required('password confirmation is required')
})

const loginSchema = yup.object().shape({
    username: yup.string()
        .required('username is required')
        .min(3, 'username must be at least three characters'),
    password: yup.string()
        .required('password is required')
})

const updateSchema = yup.object().shape({
    username: yup.string()
        .required('username is required')
        .min(3, 'username must be at least three characters'),
    password: yup.string()
        .required('password is required'),
    confirmPassword: yup.string()
        .required('password confirmation is required'),
    USER_FIRST_NAME: yup.string(),
    USER_LAST_NAME: yup.string(),
    USER_EMAIL: yup.string()
})


export {
    loginSchema,
    schema,
    updateSchema
}