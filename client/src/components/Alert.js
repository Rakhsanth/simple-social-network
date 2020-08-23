import React, { Fragment } from 'react';
import { connect } from 'react-redux';

// action creators
// import setAlert from '../actions';

const renderAlert = (alerts) => {
    if (Object.keys(alerts).length !== 0) {
        return (
            <div className={`alert alert-${alerts.color}`}>
                {alerts.message}
            </div>
        );
    }
};

function Alert(props) {
    const { alerts } = props;
    return <Fragment>{renderAlert(alerts)}</Fragment>;
}

const mapStateToProps = (store) => {
    return { alerts: store.alerts };
};

export default connect(mapStateToProps)(Alert);
