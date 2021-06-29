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
        <div className={`parking-spot 
        ${lastInColumn ? "last-spot-in-column " : ""}
        `}>
            {spotData.available
                ? <button className="parking-button" onClick={() => toggleAddCarModal ? toggleAddCarModal() : null}>
                    <p className="parking-button-text">P</p>
                </button>

                : <button className={`car-button ${!faceRight ? "reversed-car " : ""}`} onClick={() => toggleExitParkingModal ? toggleExitParkingModal() : null}>
                    <img className="car-image" src={car} alt="car" />
                </button>
            }
        </div>
    );
}

export default ParkingSpot;
