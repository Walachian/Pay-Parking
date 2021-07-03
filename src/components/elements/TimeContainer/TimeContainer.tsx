import { useEffect, useRef, useState } from 'react';
import clock from '../../../assets/clock.svg'

interface TimeContainerProps {

}

const TimeContainer = ({ }: TimeContainerProps) => {

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
        <div className="flex flex-col justify-center items-center max-h-24 select-none">
            <img src={clock} alt="Clock" className="w-12 h-12" />
            <p className="mt-2 text-4xl">{hours}:{minutes}</p>
        </div>
    );
}

export default TimeContainer;
