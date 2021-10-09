import * as yup from 'yup'

const schema = yup.object().shape({
	firstName: yup.string()
		.required('First name is required'),
	lastName: yup.string()
		.required('Last name is required'),
    username: yup.string()
        .required('username is required')
        .min(3, 'username must be at least three characters')
		.max(10, 'UserName must be less than 10 characters'),
    password: yup.string()
        .required('password is required')
		.max(10, 'UserName must be less than 10 characters'),
    confirmPassword: yup.string()
        .required('password confirmation is required'),
	email: yup.string()
		.required('Email is required')
		.max(30, 'Email must be less than 30 characters'),
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