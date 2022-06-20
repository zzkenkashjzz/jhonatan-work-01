import React from 'react';
import './progressbar.css';

const ProgressBar = ({ percent }) => {
    const style = { "--value": percent } ;
    const allowedProps = { role:"progressbar", "aria-valuenow":"65", "aria-valuemin":"0", "aria-valuemax":"100"}

    return (
        <div {...allowedProps}  style={{"--value": percent} }/>
    )
}

export default ProgressBar;
