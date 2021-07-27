import React, { useState } from 'react';
import moment from 'moment'

const Session = () => {
    const [sessionLengthInSeconds, setSessionLengthInSeconds] useState(60 * 25);
    return(
        <div>
            <p id="session-label">Session</p>
            <p id="session-length">{sessionLengthInSeconds}</p>
        </div>
    );
};

export default Session;
