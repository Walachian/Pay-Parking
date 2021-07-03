import React, { useState } from 'react';
import { useEffect } from 'react';
import { StoreModel } from '../../../models/StoreModel';

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
        <div className="h-16 flex justify-center items-center flex-row pt-3 select-none">
            <p className="text-center text-4xl">{availablePlacesCount}</p>
            <div className="flex justify-center items-center bg-transparent border-4 border-black
            rounded-full mx-2 p-5 w-0 h-0 top-infos-button">
                <p className="font-bold text-3xl">P</p>
            </div>
        </div>
    );
}

export default AvailableSpotsContainer;
