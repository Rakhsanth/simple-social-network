import React, { Fragment } from 'react';
import Moment from 'react-moment';

function ProfileEducation(props) {
    const {
        profile: { education },
    } = props;
    return (
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {education.length > 0 ? (
                <Fragment>
                    {education.map((edu) => (
                        <div key={edu._id}>
                            <h3>{edu.school}</h3>
                            <p>
                                <Moment format="YYYY-MM-DD">{edu.from}</Moment>{' '}
                                -{' '}
                                {edu.to === null ? (
                                    'Now'
                                ) : (
                                    <Moment format="YYYY-MM-DD">
                                        {edu.to}
                                    </Moment>
                                )}{' '}
                            </p>
                            {edu.degree ? (
                                <p>
                                    <strong>Degree: </strong>
                                    {edu.degree}
                                </p>
                            ) : null}
                            {edu.fieldofstudy ? (
                                <p>
                                    <strong>Field Of Study: </strong>
                                    {edu.fieldofstudy}
                                </p>
                            ) : null}
                        </div>
                    ))}
                </Fragment>
            ) : (
                <h4>No education details provided</h4>
            )}
        </div>
    );
}

export default ProfileEducation;
