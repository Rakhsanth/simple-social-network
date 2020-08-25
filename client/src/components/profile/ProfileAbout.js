import React, { Fragment } from 'react';

function ProfileAbout(props) {
    const { profile } = props;
    return (
        <div className="profile-about bg-light p-2">
            {profile.bio ? (
                <Fragment>
                    <h2 className="text-primary">
                        {profile.user.name.trim().split(' ')[0]}'s Bio
                    </h2>
                    <p>{profile.bio}</p>
                </Fragment>
            ) : null}

            <div className="line"></div>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {profile.skills.map((skill, index) => (
                    <div key={index} className="p-1">
                        <i className="fa fa-check"></i> {skill}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProfileAbout;
