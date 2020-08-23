import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import axios from 'axios';
import * as Yup from 'yup';
// action creators
import { setAlert, login } from '../../actions';

const initialValues = {
    email: '',
    password: '',
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
    email: Yup.string().email('invalid email').required('email is required'),
    password: Yup.string().test(
        'test-pwd',
        'password must have uppercase, lowercase, numbers and special charachers and atleast 7 characters',
        (value) => validatePassword(value)
    ),
});

function Login(props) {
    const onSubmit = async (values, onSubmitProps) => {
        const { email, password } = values;
        console.log(values);
        props.login(email, password);
    };

    if (props.isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Sign into Your Account
            </p>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => {
                    console.log(formik);
                    if (!formik.isValid && formik.isSubmitting) {
                        console.log('I am getting validated');
                        props.setAlert(
                            'Please fill the form based on instructions',
                            'danger'
                        );
                    }
                    return (
                        <Form className="form">
                            <div className="form-group">
                                <Field
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                />
                                <ErrorMessage name="email">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div className="form-group">
                                <Field
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                />
                                <ErrorMessage name="password">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value="Login"
                            />
                        </Form>
                    );
                }}
            </Formik>

            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    );
}

const mapStateToProps = (store) => {
    return {
        isAuthenticated: store.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, { setAlert, login })(Login);
