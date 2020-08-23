import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';

function Navbar(props) {
    const { isAuthenticated, loading } = props;

    const userLinks = (
        <ul>
            <li>
                <Link to="/" onClick={props.logout}>
                    <i className="fas fa-sign-out-alt" />{' '}
                    <span className="hide-sm">Logout</span>
                </Link>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li>
                <a href="#!">Developers</a>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );

    const renderUserOrGuestUI = () => {
        if (!isAuthenticated && !loading) {
            return <Fragment>{guestLinks}</Fragment>;
        } else {
            return <Fragment>{userLinks}</Fragment>;
        }
    };

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> Tech Network
                </Link>
            </h1>
            {renderUserOrGuestUI()}
        </nav>
    );
}

const mapStateToProps = (store) => {
    return {
        isAuthenticated: store.auth.isAuthenticated,
        loading: store.auth.loading,
    };
};

export default connect(mapStateToProps, { logout })(Navbar);
