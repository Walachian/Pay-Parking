import React, { useState } from 'react';
import { useEffect } from 'react';
import './AvailableSpotsContainerStyles.css';

interface AvailableSpotsContainerProps {
    store: any;
}

const AvailableSpotsContainer = ({ store }: AvailableSpotsContainerProps) => {
    const [availablePlacesCount, setAvailablePlacesCount] = useState<number>(0);

    useEffect(() => {
        if (store) {
            let count = 0;
            Object.keys(store).map((columnNumber) => {
                return Object.keys(store[columnNumber].spots).map((spotNumber) => {
                    if (store[columnNumber].spots[spotNumber].available) {
                        count++;
                    }
                    return 0;
                })
            });

            setAvailablePlacesCount(count);
        }
    }, [store]);

    return (
        <div className="available-spots-container h-">
            <p className="top-infos-text">{availablePlacesCount}</p>
            <button className="top-infos-button">
                <p className="top-infos-text top-infos-button-text" id="available-spots-button-text">P</p>
            </button>
        </div>
    );
}

export default AvailableSpotsContainer;
