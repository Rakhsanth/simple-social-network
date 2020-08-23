import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function ProtectRoutes(props) {
    const { component: Component, isAuthenticated, loading, ...rest } = props;

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated && !loading ? (
                    <Component {...props} />
                ) : !isAuthenticated && !loading ? (
                    <Redirect to="/login" />
                ) : null
            }
        />
    );
}
const mapStateToProps = (store) => {
    return {
        isAuthenticated: store.auth.isAuthenticated,
        loading: store.auth.loading,
    };
};

export default connect(mapStateToProps)(ProtectRoutes);
