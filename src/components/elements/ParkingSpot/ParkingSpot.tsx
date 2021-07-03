import React from 'react';
import './ParkingSpot.css';
import car from '../../../assets/car.svg'
import { SpotDataModel } from '../../../models/SpotModel';

interface ParkingSpotProps {
    lastInColumn?: boolean;
    spotNumber: number;
    spotData: SpotDataModel,
    faceRight: boolean;
    toggleAddCarModal?: () => void;
    toggleExitParkingModal?: () => void;
}

const ParkingSpot = ({ spotData, spotNumber, lastInColumn, faceRight, toggleAddCarModal, toggleExitParkingModal }: ParkingSpotProps) => {
    // const [available, setAvailable] = useState(true);


    return (
        <div className={`flex px-3 justify-center items-center h-16 border-b-8 border-gray-800
        ${lastInColumn ? "last-spot-in-column " : ""}
        `}>
            {spotData.available
                ? <button className={`flex justify-center items-center
                bg-transparent border-black border-4 rounded-full w-0 h-0 p-4 parking-button`}
                    onClick={() => toggleAddCarModal ? toggleAddCarModal() : null}>
                    <p className={`text-xl font-extrabold p-0 m-0 flex items-center text-center
                    text parking-button-text`}>P</p>
                </button>

                : <button className={`flex justify-center items-center bg-transparent border-none p-0
                car-button ${!faceRight ? "reversed-car " : ""}`} onClick={() => toggleExitParkingModal ? toggleExitParkingModal() : null}>
                    <img className="w-16 car-image" src={car} alt="car" />
                </button>
            }
        </div>
    );
}

export default ParkingSpot;
