import React, { useRef, useEffect, useState, Fragment } from "react";

// useTimer 
const useTimer = (milisecond) => {
    const [time, setTime] = useState(0);
    const timerID = useRef(0);
    useEffect(() => {
        timerID.current = setInterval(() => {
            setTime(c => c+1);
        }, milisecond);
        return () => {
            clearInterval(timerID.current);
        }
    }, [milisecond]);
    const clearTimer = () => {
        clearInterval(timerID.current);
    }
    return [ time, clearTimer ];
}


function Timer (prop) {
    const [ time, clearTimer ] = useTimer(1000);
    prop.time.current = time;
    prop.clearTimer.current = clearTimer;
    return (
        <Fragment >    
            <h1 className={'Timer'}> Time : {time} </h1>
        </Fragment>
    );
}

export default Timer;