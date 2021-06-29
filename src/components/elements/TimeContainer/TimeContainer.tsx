import { useEffect, useRef, useState } from 'react';
import "./TimeContainer.css"
import clock from '../../../assets/clock.svg'

const TimeContainer = (props: any) => {

    const [hours, setHours] = useState<string>("00");
    const [minutes, setMinutes] = useState<string>("00");
    const [seconds, setSeconds] = useState<string>("00");

    let interval: any = useRef();

    useEffect(() => {
        startTimer();
        const intervalId = interval?.current;

        return () => {
            clearInterval(intervalId);
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
        <div className="clock-container">
            <img src={clock} alt="Clock" id="clock-svg-icon" />
            <p className="top-infos-text">{hours}:{minutes}:{seconds}</p>
        </div>
    );
}

export default TimeContainer;
