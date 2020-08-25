import React, { Fragment } from 'react';
import Moment from 'react-moment';

function ProfileExperience(props) {
    const {
        profile: { experience },
    } = props;
    return (
        <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {experience.length > 0 ? (
                <Fragment>
                    {experience.map((exp) => (
                        <div key={exp._id}>
                            <h3 className="text-dark">{exp.company}</h3>
                            <p>
                                <Moment format="YYYY-MM-DD">{exp.from}</Moment>{' '}
                                -{' '}
                                {exp.to === null ? (
                                    'Now'
                                ) : (
                                    <Moment format="YYYY-MM-DD">
                                        {exp.to}
                                    </Moment>
                                )}{' '}
                            </p>
                            <p>
                                <strong>Position: </strong>
                                {exp.title}
                            </p>
                        </div>
                    ))}
                </Fragment>
            ) : (
                <h4>No experience credentials</h4>
            )}
        </div>
    );
}

export default ProfileExperience;
