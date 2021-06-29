import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { clearInterval } from 'timers';
import "../TimeContainer/TimeContainer.css"

const TimerElement = (props: any) => {
    const [hours, setHours] = useState<string>("00");
    const [minutes, setMinutes] = useState<string>("00");
    const [seconds, setSeconds] = useState<string>("00");

    let interval: any = useRef();

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval?.current);
        }
    }, []);


    const startTimer = () => {
        if (interval.current) {
            return;
            // clearInterval(interval.current);
        }

        interval = setInterval(() => {
            const now = new Date();

            const hour = now.getHours();
            const minute = now.getMinutes();
            const second = now.getSeconds();

            setHours(hour < 10 ? "0" + hour : hour.toString());
            setMinutes(minute < 10 ? "0" + minute : minute.toString());
            setSeconds(second < 10 ? "0" + second : second.toString());

        }, 1000);
    }

    return (
        <p className="time-text">{hours}:{minutes}:{seconds}</p>
    );
}

export default TimerElement;
