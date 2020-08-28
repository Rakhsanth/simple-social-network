import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { setAlert } from '../../actions';
import { uploadProfilePicture } from '../../apiRequests/profileRequests';
import { Redirect } from 'react-router-dom';

function ProfilePictureUpload(props) {
    const { profile, history } = props;

    const supportedFiles = ['jpeg', 'jpg', 'png'];

    const initialValues = {
        profilePicture: '',
    };

    const validationSchema = Yup.object({
        profilePicture: Yup.mixed().required('Please select a file to upload'),
    });

    const onSubmit = (values, onSubmitProps) => {
        const { profilePicture } = values;
        console.log(profilePicture);
        console.log(onSubmitProps);
        uploadProfilePicture(profilePicture, profile.user._id);
        return <Redirect to="/dashboard" />;
    };

    const handleFileUpload = (event, form) => {
        form.setFieldValue('profilePicture', event.currentTarget.files[0]);
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => {
                    console.log(formik);
                    if (
                        formik.values.profilePicture &&
                        supportedFiles.indexOf(
                            formik.values.profilePicture.type.split('/')[1]
                        ) === -1
                    ) {
                        formik.isValid = false;
                        props.setAlert(
                            'Files of type jpg, jpeg and png only are supported',
                            'danger'
                        );
                    }
                    if (
                        formik.values.profilePicture &&
                        formik.values.profilePicture.size > 3 * 1024 * 1024
                    ) {
                        formik.isValid = false;
                        props.setAlert(
                            'Please upload an image less than 3 MB',
                            'danger'
                        );
                    }

                    return (
                        <Form className="form">
                            <Field>
                                {(fieldPrps) => {
                                    const { field, form, meta } = fieldPrps;

                                    return (
                                        <div className="file-upload-container">
                                            <input
                                                type="file"
                                                id="profilePicture"
                                                name="profilePicture"
                                                className="picture-upload"
                                                onChange={(event) =>
                                                    handleFileUpload(
                                                        event,
                                                        form
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor="profilePicture"
                                                className="picture-upload-label"
                                            >
                                                Select an image
                                            </label>
                                        </div>
                                    );
                                }}
                            </Field>
                            <div className="center">
                                <input
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!(formik.isValid && formik.dirty)}
                                    value="upload"
                                />
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default connect(null, { setAlert })(ProfilePictureUpload);
