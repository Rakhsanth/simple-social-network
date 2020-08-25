import React, { useEffect, Fragment } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { withRouter, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions';
import Spinner from '../layouts/Spinner';

function AddExperience(props) {
    const {
        profile: { profile, loading },
        history,
    } = props;

    useEffect(() => {
        if (profile === null) {
            props.getCurrentProfile();
        }
    }, [loading]);

    const currentOptions = [{ key: 'current', value: 'current' }];
    const initialValues = {
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: [],
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is mandatory'),
        company: Yup.string().required('Company is mandatory'),
        from: Yup.date().required('From date is required'),
        current: Yup.array(),
        to: Yup.date().test(
            'current is present',
            'Provide to-date if this is not your current job!',
            function (to) {
                const { current } = this.parent;
                console.log(current.length);
                if (current.length !== 0 && !to) {
                    return true;
                }
                if (current.length === 0 && !to) {
                    return false;
                }
                if (current.length === 0 && to) {
                    return true;
                }
            }
        ),
    });

    const onSubmit = (values) => {
        // if (values.current.length !== 0) {
        //     values.current = true;
        // }
        console.log(values);
        props.createProfile(values, history, false, 'exp', profile);
    };

    return loading && profile === null ? (
        <Spinner size="lg" />
    ) : (
        <Fragment>
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any
                developer/programming positions that you have had in the past
            </p>
            <small>* = required field</small>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => {
                    console.log(formik);
                    if (formik.values.current.length !== 0) {
                        formik.values.to = '';
                    }
                    return (
                        <Form className="form">
                            <div className="form-group">
                                <Field
                                    type="text"
                                    placeholder="* Job Title"
                                    name="title"
                                />
                                <ErrorMessage name="title">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div className="form-group">
                                <Field
                                    type="text"
                                    placeholder="* Company"
                                    name="company"
                                />
                                <ErrorMessage name="company">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div className="form-group">
                                <Field
                                    type="text"
                                    placeholder="Location"
                                    name="location"
                                />
                            </div>
                            <div className="form-group">
                                <h4>From Date</h4>
                                <Field type="date" name="from" />
                                <ErrorMessage name="from">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div className="form-group">
                                <p>
                                    <Field name="current">
                                        {({ field }) => {
                                            console.log(field);
                                            return currentOptions.map(
                                                (option) => {
                                                    return (
                                                        <Fragment
                                                            key={option.key}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={
                                                                    option.value
                                                                }
                                                                {...field}
                                                                value={
                                                                    option.value
                                                                }
                                                                checked={field.value.includes(
                                                                    option.value
                                                                )}
                                                            />{' '}
                                                            Current Job
                                                        </Fragment>
                                                    );
                                                }
                                            );
                                        }}
                                    </Field>
                                    <ErrorMessage name="current">
                                        {(errorMsg) => (
                                            <span className="errorMessage">
                                                {errorMsg}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </p>
                            </div>
                            <div className="form-group">
                                <h4>To Date</h4>
                                <Field
                                    type="date"
                                    name="to"
                                    disabled={
                                        formik.values.current.length !== 0
                                    }
                                />
                                <ErrorMessage name="to">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <input
                                type="submit"
                                className="btn btn-primary my-1"
                            />
                            <Link
                                className="btn btn-light my-1"
                                to="/dashboard"
                            >
                                Go Back
                            </Link>
                        </Form>
                    );
                }}
            </Formik>
        </Fragment>
    );
}

const mapStateToProps = (store) => {
    return {
        profile: store.profile,
    };
};

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(
    withRouter(AddExperience)
);
