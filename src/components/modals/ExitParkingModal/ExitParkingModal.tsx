import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSpring, animated } from "react-spring";
import { SpotDataModel, SpotModel } from '../../../models/SpotModel';
import './ExitParkingModal.css';

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
                ? <div className="modal-container">
                    <div className="modal-backdrop" onClick={() => closeModal()} />
                    <animated.div style={animation}>
                        <div className="exit-parking-modal">
                            <label className="exit-parking-modal-title">Parking session info</label>
                            <div className="exit-parking-labels-container">
                                <p className="exit-parking-label">Plate Number : {parkingData?.plateNumber}</p>
                                <p className="exit-parking-label">Start Time :
                                    {startDate.getHours() < 10 ? " 0" + startHour : " " + startHour}:
                                    {startDate.getMinutes() < 10 ? "0" + startMinutes : startMinutes}</p>
                                <p className="exit-parking-label">Elapsed Time : {displayTime}</p>
                                <p className="exit-parking-label">Amount to pay : {price} RON</p>
                            </div>
                            <button className="add-car-modal-button" onClick={() => removeCar(spot)}>
                                <p className="add-car-modal-button-text">Leave Parking</p>
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
