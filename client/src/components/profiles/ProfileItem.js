import React from 'react';
import { Link } from 'react-router-dom';

function ProfileItem(props) {
    const { profile } = props;
    return (
        <div className="profile bg-light">
            <img
                className="round-img"
                src={
                    'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
                }
                alt=""
            />
            <div>
                <h2>{profile.user.name}</h2>
                <p>
                    {profile.status}{' '}
                    {profile.company ? ` at ${profile.company}` : null}
                </p>
                <p>{profile.location}</p>
                <Link
                    to={`/profiles/${profile.user._id}`}
                    className="btn btn-primary"
                >
                    View Profile
                </Link>
            </div>

            <ul>
                {profile.skills.slice(0, 5).map((skill, index) => (
                    <li key={index} className="text-primary">
                        <i className="fas fa-check"></i> {skill}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProfileItem;
