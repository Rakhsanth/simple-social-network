import React, { Fragment } from 'react';

function Spinner(props) {
    const { size } = props;
    return (
        <Fragment>
            <span className={`spinner-${size}`}></span>
        </Fragment>
    );
}

export default Spinner;
