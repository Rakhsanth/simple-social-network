import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExpOrEdu } from '../../actions';

function Education(props) {
    const { educations, profile } = props;

    const deleteEducation = (index) => {
        const listToUpdate = profile.education.filter(
            (edu, eduIndex) => eduIndex !== index
        );
        props.deleteExpOrEdu(listToUpdate, 'edu', profile);
    };

    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {educations.map((edu, index) => (
                        <tr key={index}>
                            <td>{edu.school}</td>
                            <td className="hide-sm">{edu.degree}</td>
                            <td className="hide-sm">
                                <Moment format="YYYY-MM-DD">{edu.from}</Moment>{' '}
                                -{' '}
                                {edu.to === null ? (
                                    'Now'
                                ) : (
                                    <Moment format="YYYY-MM-DD">
                                        {edu.to}
                                    </Moment>
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteEducation(index)}
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

export default connect(null, { deleteExpOrEdu })(Education);
