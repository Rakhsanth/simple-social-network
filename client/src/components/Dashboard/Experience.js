import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { deleteExpOrEdu } from '../../actions';
import { connect } from 'react-redux';

function Experience(props) {
    const { experiences, profile } = props;

    const deleteExperience = (index) => {
        const listToUpdate = profile.experience.filter(
            (exp, expInd) => expInd !== index
        );
        props.deleteExpOrEdu(listToUpdate, 'exp', profile);
    };

    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {experiences.map((exp, index) => (
                        <tr key={index}>
                            <td>{exp.company}</td>
                            <td className="hide-sm">{exp.title}</td>
                            <td className="hide-sm">
                                <Moment format="YYYY-MM-DD">{exp.from}</Moment>{' '}
                                -{' '}
                                {exp.to === null ? (
                                    'Now'
                                ) : (
                                    <Moment format="YYYY-MM-DD">
                                        {exp.to}
                                    </Moment>
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteExperience(index)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default connect(null, { deleteExpOrEdu })(Experience);
