import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const userLinks = (
    <Fragment>
        <Link to="/dashboard" className="btn btn-primary">
            Dashboard
        </Link>
        <Link to="/donate" className="btn btn-success">
            Donate
        </Link>
    </Fragment>
);

const guestLinks = (
    <Fragment>
        <Link to="/register" className="btn btn-primary">
            Sign Up
        </Link>
        <Link to="/login" className="btn btn-light">
            Login
        </Link>
        <Link to="/donate" className="btn btn-success">
            Donate
        </Link>
    </Fragment>
);

function Landing(props) {
    const { isAuthenticated, loading } = props;

    const renderUserOrGuestLinks = () => {
        if (isAuthenticated && !loading) {
            return userLinks;
        } else {
            return guestLinks;
        }
    };

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Tech Network</h1>
                    <p className="lead">
                        Create a developer profile/portfolio, share posts and
                        get help from other developers
                    </p>
                    <div className="buttons">{renderUserOrGuestLinks()}</div>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = (store) => {
    return {
        isAuthenticated: store.auth.isAuthenticated,
        loading: store.auth.loading,
    };
};

export default connect(mapStateToProps)(Landing);
