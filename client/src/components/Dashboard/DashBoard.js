import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions';
import Spinner from '../layouts/Spinner';
import Experience from './Experience';
import Education from './Education';

function DashBoard(props) {
    const {
        auth,
        profile: { profile, loading },
    } = props;
    useEffect(() => {
        props.getCurrentProfile();
    }, [props.getCurrentProfile]);
    return loading && profile === null ? (
        <Spinner size="lg" />
    ) : (
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome{' '}
                {auth.user ? auth.user.name : <Spinner size="sm" />}
            </p>
            <div className="dash-buttons">
                {profile === null ? (
                    <Fragment>
                        <p>
                            You have not yet set up a profile, please add some
                            info
                        </p>
                        <Link
                            to="/create-profile"
                            className="btn btn-primary my-1"
                        >
                            Create Profile
                        </Link>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Link to="/edit-profile" className="btn btn-light">
                            <i className="fas fa-user-circle text-primary"></i>{' '}
                            Edit Profile
                        </Link>
                        <Link to="/add-experience" className="btn btn-light">
                            <i className="fab fa-black-tie text-primary"></i>{' '}
                            Add Experience
                        </Link>
                        <Link to="/add-education" className="btn btn-light">
                            <i className="fas fa-graduation-cap text-primary"></i>{' '}
                            Add Education
                        </Link>
                    </Fragment>
                )}
            </div>
            {profile !== null ? (
                <Fragment>
                    <Experience
                        experiences={profile.experience}
                        profile={profile}
                    />
                    <Education
                        educations={profile.education}
                        profile={profile}
                    />
                </Fragment>
            ) : null}
        </Fragment>
    );
}

const mapStateToProps = (store) => {
    return {
        auth: store.auth,
        profile: store.profile,
    };
};

export default connect(mapStateToProps, { getCurrentProfile })(DashBoard);
