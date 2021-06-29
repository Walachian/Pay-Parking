import React, { useState } from 'react';
import { useEffect } from 'react';
import { StoreModel } from '../../../models/StoreModel';
import './AvailableSpotsContainerStyles.css';

interface AvailableSpotsContainerProps {
    store: StoreModel;
}

const AvailableSpotsContainer = ({ store }: AvailableSpotsContainerProps) => {
    const [availablePlacesCount, setAvailablePlacesCount] = useState<number>(0);

    useEffect(() => {
        if (store) {
            let count = 0;
            Object.keys(store).map((columnNumber) => {
                const columnNumberIntValue = parseInt(columnNumber);
                return Object.keys(store[columnNumberIntValue].spots).map((spotNumber) => {
                    const spotNumberIntValue = parseInt(spotNumber);

                    if (store[columnNumberIntValue].spots[spotNumberIntValue].available) {
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
