import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSpring, animated } from "react-spring";
import { SpotDataModel, SpotModel } from '../../../models/SpotModel';

interface ExitParkingModalProps {
    visible: boolean;
    spot?: SpotModel;
    removeCar: (spot?: SpotModel) => void;
    closeModal: () => void;
}

const ExitParkingModal = ({ visible, spot, removeCar, closeModal }: ExitParkingModalProps) => {
    const [parkingData, setParkingData] = useState<SpotDataModel>();

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [displayTime, setDisplayTime] = useState<string>();
    const [price, setPrice] = useState<number>(10);

    let startHour = startDate.getHours();
    let startMinutes = startDate.getMinutes();

    const animation = useSpring({
        config: {
            mass: 1,
            tension: 180,
            friction: 18,
        },
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0%)" : "translateY(-100%)",
    });

    useEffect(() => {
        if (spot) {
            const newStart = new Date(spot?.spotData.startTime);

            setParkingData(spot?.spotData);
            setStartDate(new Date(spot?.spotData.startTime));
        }
    }, [spot]);

    useEffect(() => {
        const now = new Date();
        setElapsedTime(now.getTime() - startDate.getTime());
    }, [startDate]);

    useEffect(() => {
        const hours = Math.floor(elapsedTime / (3600 * 1000));
        const minutes = Math.floor(elapsedTime / (60 * 1000));

        const time = `${hours ? hours + "h " : ""}
            ${minutes ? minutes + "m" : "1m"}`

        setDisplayTime(time);
        setPrice(5 + Math.ceil(elapsedTime / (3600 * 1000)) * 5);

    }, [elapsedTime]);




    return (
        <>
            {visible
                ? <div className="flex h-full w-full justify-center items-center absolute top-0 left-0">
                    <div className="flex h-full w-full absolute top-0 left-0 bg-black opacity-70" onClick={() => closeModal()} />
                    <animated.div style={animation}>
                        <div className="h-auto w-auto px-20 py-24 flex flex-col justify-center items-center
                         rounded-3xl bg-yellow-50 modal-style">
                            <label className="absolute top-0 p-4 text-center text-4xl font-bold text-gray-900">Parking session info</label>
                            <div className="py-12">
                                <p className="my-3 flex justify-center items-center text-2xl">Plate Number : {parkingData?.plateNumber}</p>
                                <p className="my-3 flex justify-center items-center text-2xl">Start Time :
                                    {startDate.getHours() < 10 ? " 0" + startHour : " " + startHour}:
                                    {startDate.getMinutes() < 10 ? "0" + startMinutes : startMinutes}</p>
                                <p className="my-3 flex justify-center items-center text-2xl">Elapsed Time : {displayTime}</p>
                                <p className="my-3 flex justify-center items-center text-2xl">Amount to pay : {price} RON</p>
                            </div>
                            <button className="absolute bottom-0 w-3/4 h-16 border-none bg-gray-800
                        text-3xl text-yellow-50 rounded-t-full"
                                onClick={() => removeCar(spot)}>
                                <p className="p-0 m-0">
                                    Leave Parking</p>
                            </button>
                        </div>
                    </animated.div>
                </div>
                : null
            }
        </>
    );
}

export default ExitParkingModal;
