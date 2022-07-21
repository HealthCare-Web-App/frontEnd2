import React, { useState , useEffect } from "react";

function StopWatch() {
    const [time, setTime] = useState(0);
    const [start , setStart] = useState(false);

    useEffect(() => {
        let interval = null;

        if (start) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [start]);

    return (
        <div className="stop-watch">
            <div className="timer">
                <span className="digits">
                    {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                </span>
                <span className="digits">
                    {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
                </span>
                <span className="digits">
                    {("0" + ((time / 10) % 100)).slice(-2)}
                </span>
            </div>

            <div className="btn-wrap">
                <div className="watch-btn">
                    <span className="material-symbols-outlined" onClick={() => setStart(true)}>
                        play_circle
                    </span>
                </div>

                <div className="watch-btn">
                    <span className="material-symbols-outlined" onClick={() => setStart(false)}>
                        pause_circle
                    </span>
                </div>

                <div className="watch-btn">
                    <span className="material-symbols-outlined" onClick={() => {setTime(0); setStart(false);}}>
                        stop_circle
                    </span>
                </div>
            </div>
        </div>
    );
}

export default StopWatch;