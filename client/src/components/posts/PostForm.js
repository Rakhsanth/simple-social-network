import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { setAlert, createPost } from '../../actions';

function PostForm(props) {
    const initialValues = {
        text: '',
    };
    const validationSchema = Yup.object({
        text: Yup.string().required('Some text is required to post something'),
    });
    const onSubmit = (values, onSubmitProps) => {
        console.log(values);
        props.createPost(values);
        onSubmitProps.resetForm();
    };

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <Formik
                initialValues={initialValues}
                s
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => {
                    console.log(formik);
                    if (!formik.isValid && formik.isSubmitting) {
                        console.log('validation is happening');
                        props.setAlert(
                            'Please enter some text to post',
                            'danger'
                        );
                    }
                    return (
                        <Form className="form my-1">
                            <Field
                                as="textarea"
                                name="text"
                                cols="30"
                                rows="5"
                                placeholder="Create a post"
                            ></Field>
                            <input
                                type="submit"
                                className="btn btn-dark my-1"
                                value="Post"
                            />
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default connect(null, { setAlert, createPost })(PostForm);
