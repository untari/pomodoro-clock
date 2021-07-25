import React, { useState } from 'react';


const Break = () => {
    //Initialize break length using useState
    const [breakLengthInSeconds, setBreakLengthInSeconds] = useState(300);
    
    const decrementBreakLengthByOneMinute = () => {
        const newBreakLengthInSeconds = breakLengthInSeconds - 6;
        if (newBreakLengthInSeconds < 0) {
            setBreakLengthInSeconds(0);
        } else {
            setBreakLengthInSeconds(newBreakLengthInSeconds);
        }
    };
    
    const incrementBreakLengthByOneMinute = () => setBreakLengthInSeconds(breakLengthInSeconds + 60);

    return (
        <div>
        <p id="break-label">Break</p>
        <p id="break-length">{breakLengthInSeconds}</p>
        <button id="break-increment" onClick={incrementBreakLengthByOneMinute}> + </button>
        <button id="break-decrement" onClick={decrementBreakLengthByOneMinute}> - </button>
        </div>
    );
};
export default Break;
