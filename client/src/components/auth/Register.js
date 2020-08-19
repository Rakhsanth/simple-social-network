import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import axios from 'axios';
import * as Yup from 'yup';

const initialValues = {
    name: '',
    email: '',
    password: '',
    password2: '',
};

const validatePassword = (password) => {
    if (!password) return false;

    if (password.length < 7) return false;

    if (password.search(/[A-Z]/i) === -1) return false;

    if (password.search(/[a-z]/i) === -1) return false;

    if (password.search(/[0-9]/i) === -1) return false;

    if (password.search(/\W/i) === -1) return false;

    return true;
};

const validationSchema = Yup.object({
    name: Yup.string().required('name is required'),
    email: Yup.string().email('invalid email').required('email is required'),
    password: Yup.string().test(
        'test-pwd',
        'password must have uppercase, lowercase, numbers and special charachers and atleast 7 characters',
        (value) => validatePassword(value)
    ),
    password2: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'passwords did not match')
        .test(
            'test-pwd',
            'password must have uppercase, lowercase, numbers and special charachers and atleast 7 characters',
            (value) => validatePassword(value)
        ),
});

const onSubmit = async (values) => {
    console.log(values);
    // const { name, email, password } = values;
    // let body = {
    //     name,
    //     email,
    //     password,
    // };
    // body = JSON.stringify(body);
    // const axiosConfig = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // };
    // try {
    //     const response = await axios.post(
    //         `http://localhost:4010/api/v1/auth/register`,
    //         body,
    //         axiosConfig
    //     );
    //     console.log(response.data);
    // } catch (err) {
    //     console.log(err.response.data);
    // }    To later replace the redux logics for the token storage etc.
};

function Register() {
    return (
        <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className="form">
                    <div className="form-group">
                        <Field type="text" placeholder="Name" name="name" />
                        <ErrorMessage name="name">
                            {(errorMsg) => (
                                <span className="errorMessage">{errorMsg}</span>
                            )}
                        </ErrorMessage>
                    </div>
                    <div className="form-group">
                        <Field
                            type="email"
                            placeholder="Email Address"
                            name="email"
                        />
                        <ErrorMessage name="email">
                            {(errorMsg) => (
                                <span className="errorMessage">{errorMsg}</span>
                            )}
                        </ErrorMessage>
                        <small className="form-text">
                            This site uses Gravatar so if you want a profile
                            image, use a Gravatar email
                        </small>
                    </div>
                    <div className="form-group">
                        <Field
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                        <ErrorMessage name="password">
                            {(errorMsg) => (
                                <span className="errorMessage">{errorMsg}</span>
                            )}
                        </ErrorMessage>
                    </div>
                    <div className="form-group">
                        <Field
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                        />
                        <ErrorMessage name="password2">
                            {(errorMsg) => (
                                <span className="errorMessage">{errorMsg}</span>
                            )}
                        </ErrorMessage>
                    </div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Register"
                    />
                </Form>
            </Formik>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </section>
    );
}

export default Register;
