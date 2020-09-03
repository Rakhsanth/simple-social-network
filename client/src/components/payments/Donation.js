import React, { Fragment } from 'react';
import { razorpayAPIKeyId } from '../../config/config';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { backendBaseURL } from '../../config/config';

const validateAmount = (amount) => {
    if (!amount) {
        return false;
    }
    if (amount.search(/[^0-9]/) !== -1) {
        return false;
    }
    return true;
};

function Donation(props) {
    const { history } = props;

    const initialValues = {
        amount: '',
    };

    const validationSchema = Yup.object({
        amount: Yup.string().test(
            'amount-test',
            'Please enter a valid amount to proceed',
            (value) => validateAmount(value)
        ),
    });

    const onSubmit = async (values, onSubmitProps) => {
        const { amount } = values;
        const API_URL = `${backendBaseURL}/api/v1/payments`;
        const orderUrl = `${API_URL}/order/${amount}`;
        let data;
        try {
            const response = await axios.get(orderUrl);
            data = response.data.data;
        } catch (err) {
            // console.log(err.response.data);
        }

        const options = {
            key: razorpayAPIKeyId,
            currency: data.currency,
            amount: data.amount,
            name: 'Tech Network',
            description: 'Any amount would be accepted as donation',
            order_id: data.id,
            handler: async (response) => {
                const {
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                } = response;
                const body = {
                    order_id: data.id,
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                };
                const axiosConfig = {
                    headers: {
                        'Content-type': 'application/json',
                    },
                };
                const confirmedResponse = await axios.post(
                    `${API_URL}/confirm`,
                    body,
                    axiosConfig
                );
                // console.log(confirmedResponse.data);
                if (confirmedResponse.data.success) {
                    props.setAlert(
                        confirmedResponse.data.data.message,
                        'success'
                    );
                } else {
                    props.setAlert(confirmedResponse.data.data, 'danger');
                }
                history.push('/');
            },
            theme: {
                color: '#686CFD',
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        onSubmitProps.resetForm();
    };

    return (
        <Fragment>
            <h1 className="large text-primary">
                We are thankful for the contribution
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to
                make your payment
            </p>
            <small>* = required field</small>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => {
                    if (!formik.isValid && formik.isSubmitting) {
                        props.setAlert(
                            'Please enter as directed in the form',
                            'danger'
                        );
                    }

                    return (
                        <Form className="form">
                            <div className="form-group">
                                <label htmlFor="amount">Amount in INR</label>
                                <Field
                                    type="text"
                                    placeholder="100"
                                    name="amount"
                                    id="amount"
                                />
                                <ErrorMessage name="amount">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                                <small className="form-text">
                                    Could be your own company or one you work
                                    for
                                </small>
                            </div>

                            <input
                                type="submit"
                                className="btn btn-primary my-1"
                                value="Pay"
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

export default connect(null, { setAlert })(withRouter(Donation));
