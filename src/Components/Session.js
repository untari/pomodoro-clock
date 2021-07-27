import React, { useState } from 'react';
import moment from 'moment'

const Session = () => {
    const [sessionLengthInSeconds, setSessionLengthInSeconds] = useState(60 * 25);

    const decrementSessionByOneMinute = () => {
        const newSessionLengthInSeconds = sessionLengthInSeconds - 60;
        if (newSessionLengthInSeconds < 0 ){
            setSessionLengthInSeconds(0);
        } else {
            setSessionLengthInSeconds(newSessionLengthInSeconds);
        }
    };
    const incrementSessionLengthByOneMinute = () => setSessionLengthInSeconds(sessionLengthInSeconds + 60);
    
    const sessionLengthInMinutes = moment.duration(sessionLengthInSeconds, 's').minutes();
    return(
        <div>
            <p id="session-label">Session</p>
            <p id="session-length">{sessionLengthInMinutes}</p>
            <button id="session-increment" onClick={incrementSessionLengthByOneMinute}> + </button>
            <button id="session-decrement" onClick={decrementSessionByOneMinute}> - </button>
        </div>
    );
};

export default Session;
