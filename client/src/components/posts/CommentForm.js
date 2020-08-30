import React from 'react';
import { setAlert, addComment } from '../../actions';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

function CommentForm(props) {
    const { postId } = props;
    const initialValues = {
        text: '',
    };
    const validationSchema = Yup.object({
        text: Yup.string().required('Some text is required to post something'),
    });
    const onSubmit = (values, onSubmitProps) => {
        props.addComment(postId, values);
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
                    if (!formik.isValid && formik.isSubmitting) {
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

export default connect(null, { setAlert, addComment })(CommentForm);
