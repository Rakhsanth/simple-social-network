import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles, getCurrentProfile } from '../../actions';
import Spinner from '../layouts/Spinner';
import ProfileItem from './ProfileItem';

function Profiles(props) {
    const {
        profile: { profile, profiles, loading },
        isAuthenticated,
    } = props;
    useEffect(() => {
        if (isAuthenticated) {
            props.getCurrentProfile();
        }
        props.getProfiles();
    }, []);
    return (
        <Fragment>
            {loading ? (
                <Spinner size="lg" />
            ) : (
                <Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i> Browse and
                        connect with developers
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (
                            profile !== null ? (
                                profiles.map((currentProfile) => {
                                    if (
                                        profile.user._id !==
                                        currentProfile.user._id
                                    ) {
                                        return (
                                            <ProfileItem
                                                key={currentProfile._id}
                                                profile={currentProfile}
                                            />
                                        );
                                    }
                                })
                            ) : (
                                profiles.map((currentProfile) => {
                                    return (
                                        <ProfileItem
                                            key={currentProfile._id}
                                            profile={currentProfile}
                                        />
                                    );
                                })
                            )
                        ) : (
                            <Spinner size="lg" />
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

const mapStateToProps = (store) => {
    return {
        isAuthenticated: store.auth.isAuthenticated,
        profile: store.profile,
    };
};

export default connect(mapStateToProps, { getProfiles, getCurrentProfile })(
    Profiles
);
