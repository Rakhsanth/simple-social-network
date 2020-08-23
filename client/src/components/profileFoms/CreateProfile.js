import React, { Fragment, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Redirect, withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { setAlert, createProfile } from '../../actions';

function CreateProfile(props) {
    const {
        profile: { profile, loading },
        history,
    } = props;

    const [displaySocial, toggleDisplaySocial] = useState(false);

    if (profile && !loading) {
        return <Redirect to="/dashboard" />;
    }

    const initialValues = {
        status: '',
        company: '',
        website: '',
        location: '',
        skills: '',
        githubusername: '',
        bio: '',
        social: {
            twitter: '',
            facebook: '',
            youtube: '',
            linkedin: '',
            instagram: '',
        },
    };

    const validationSchema = Yup.object({
        status: Yup.string().required('Please select a status'),
        skills: Yup.string().required('Please add you skills as mentioned'),
    });

    const onSubmit = (values, onSubmitProps) => {
        console.log(values);
        props.createProfile(values, history);
    };

    const statusOptions = [
        { key: 'select-a-status', value: '' },
        { key: 'developer', value: 'Developer' },
        { key: 'junior-developer', value: 'Junior Developer' },
        { key: 'senior-developer', value: 'Senior Developer' },
        { key: 'manager', value: 'Manager' },
        { key: 'instructor-or-teacher', value: 'Instructor or Teacher' },
        { key: 'student-or-learning', value: 'Student or Learning' },
        { key: 'intern', value: 'Intern' },
        { key: 'other', value: 'Other' },
    ];

    return (
        <Fragment>
            <h1 className="large text-primary">Create Your Profile</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to
                make your profile stand out
            </p>
            <small>* = required field</small>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => {
                    console.log(formik);
                    if (!formik.isValid && formik.isSubmitting) {
                        props.setAlert(
                            'Please fill all the required fields',
                            'danger',
                            4000
                        );
                    }
                    if (!displaySocial) {
                        formik.values.social.twitter = '';
                        formik.values.social.facebook = '';
                        formik.values.social.youtube = '';
                        formik.values.social.linkedin = '';
                        formik.values.social.instagram = '';
                    }
                    return (
                        <Form className="form">
                            <div className="form-group">
                                <Field as="select" name="status" id="status">
                                    {statusOptions.map((option, index) =>
                                        index === 0 ? (
                                            <option key={option.key} value={''}>
                                                {'Select a Status'}
                                            </option>
                                        ) : (
                                            <option
                                                key={option.key}
                                                value={option.value}
                                            >
                                                {option.value}
                                            </option>
                                        )
                                    )}
                                </Field>
                                <ErrorMessage name="status">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                                <small className="form-text">
                                    Give us an idea of where you are at in your
                                    career
                                </small>
                            </div>
                            <div className="form-group">
                                <Field
                                    type="text"
                                    placeholder="Company"
                                    name="company"
                                    id="company"
                                />
                                <small className="form-text">
                                    Could be your own company or one you work
                                    for
                                </small>
                            </div>
                            <div className="form-group">
                                <Field
                                    type="text"
                                    placeholder="Website"
                                    name="website"
                                    id="website"
                                />
                                <small className="form-text">
                                    Could be your own or a company website
                                </small>
                            </div>
                            <div className="form-group">
                                <Field
                                    type="text"
                                    placeholder="Location"
                                    name="location"
                                    id="location"
                                />
                                <small className="form-text">
                                    City & state suggested (eg. Boston, MA)
                                </small>
                            </div>
                            <div className="form-group">
                                <Field
                                    type="text"
                                    placeholder="* Skills"
                                    name="skills"
                                    id="skills"
                                />
                                <ErrorMessage name="skills">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                                <small className="form-text">
                                    Please use comma separated values (eg.
                                    HTML,CSS,JavaScript,PHP)
                                </small>
                            </div>
                            <div className="form-group">
                                <Field
                                    type="text"
                                    placeholder="Github Username"
                                    name="githubusername"
                                    id="githubusername"
                                />
                                <small className="form-text">
                                    If you want your latest repos and a Github
                                    link, include your username
                                </small>
                            </div>
                            <div className="form-group">
                                <Field
                                    as="textarea"
                                    placeholder="A short bio of yourself"
                                    name="bio"
                                    id="bio"
                                />
                                <small className="form-text">
                                    Tell us a little about yourself
                                </small>
                            </div>

                            <div className="my-2">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() =>
                                        toggleDisplaySocial(!displaySocial)
                                    }
                                >
                                    Add Social Network Links
                                </button>
                                <span>Optional</span>
                            </div>
                            {displaySocial ? (
                                <Fragment>
                                    <div className="form-group social-input">
                                        <i className="fab fa-twitter fa-2x"></i>
                                        <Field
                                            type="text"
                                            placeholder="Twitter URL"
                                            name="social.twitter"
                                            id="twitter"
                                        />
                                    </div>

                                    <div className="form-group social-input">
                                        <i className="fab fa-facebook fa-2x"></i>
                                        <Field
                                            type="text"
                                            placeholder="Facebook URL"
                                            name="social.facebook"
                                            id="facebook"
                                        />
                                    </div>

                                    <div className="form-group social-input">
                                        <i className="fab fa-youtube fa-2x"></i>
                                        <Field
                                            type="text"
                                            placeholder="YouTube URL"
                                            name="social.youtube"
                                            id="youtube"
                                        />
                                    </div>

                                    <div className="form-group social-input">
                                        <i className="fab fa-linkedin fa-2x"></i>
                                        <Field
                                            type="text"
                                            placeholder="Linkedin URL"
                                            name="social.linkedin"
                                            id="linkedin"
                                        />
                                    </div>

                                    <div className="form-group social-input">
                                        <i className="fab fa-instagram fa-2x"></i>
                                        <Field
                                            type="text"
                                            placeholder="Instagram URL"
                                            name="social.instagram"
                                            id="instagram"
                                        />
                                    </div>
                                </Fragment>
                            ) : null}
                            <input
                                type="submit"
                                className="btn btn-primary my-1"
                            />
                            <a
                                className="btn btn-light my-1"
                                href="dashboard.html"
                            >
                                Go Back
                            </a>
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

export default connect(mapStateToProps, { setAlert, createProfile })(
    withRouter(CreateProfile)
);
