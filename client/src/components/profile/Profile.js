import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileByUserId } from '../../actions';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGitRepos from './ProfileGitRepos';

function Profile(props) {
    const {
        match,
        profile: { loading, profile },
    } = props;
    useEffect(() => {
        props.getProfileByUserId(match.params.id);
    }, [props.getProfileByUserId, match.params.id]);

    return (
        <Fragment>
            {loading ? (
                <Spinner size="lg" />
            ) : profile === null ? (
                <h4>Person does not have a profile yet</h4>
            ) : (
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">
                        Back To Profiles
                    </Link>
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <ProfileExperience profile={profile} />
                        <ProfileEducation profile={profile} />
                        {profile.githubUserName ? (
                            <ProfileGitRepos
                                username={profile.githubUserName}
                            />
                        ) : (
                            <h4>Has not included GitHub profile</h4>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

const mapStateToProps = (store) => {
    return {
        profile: store.profile,
    };
};

export default connect(mapStateToProps, { getProfileByUserId })(Profile);
