import React from 'react';
import ParkingSpot from "../ParkingSpot/ParkingSpot"

interface ParkingColumnProps {
    columnData: any;
    columnNumber: number;
    borderLeft?: boolean;
    borderRight?: boolean;
    toggleAddCarModal: (selectedSpot?: any) => void;
    toggleExitParkingModal: (selectedSpot?: any) => void;
}

const ParkingColumn = ({ columnData, columnNumber, borderLeft, borderRight, toggleAddCarModal, toggleExitParkingModal }: ParkingColumnProps) => {

    const openAddModal = (spotNumber: number, spotData: any) => {
        const selectedSpotObject = {
            columnNumber,
            spotNumber,
            spotData,
        }

        toggleAddCarModal(selectedSpotObject);
    }

    const openExitModal = (spotNumber: number, spotData: any) => {
        const selectedSpotObject = {
            columnNumber,
            spotNumber,
            spotData,
        }

        toggleExitParkingModal(selectedSpotObject);
    }

    return (
        <div className={`parking-spots-column 
        ${borderRight ? "left-column " : ""}
        ${borderLeft ? "right-column " : ""}
        `}>
            {Object.keys(columnData?.spots).map((item, index, arr) => {
                const spotData = { ...columnData?.spots[item] };
                const spotNumber = parseInt(item);

                return <ParkingSpot
                    spotNumber={spotNumber}
                    spotData={spotData}
                    toggleAddCarModal={() => openAddModal(spotNumber, spotData)}
                    toggleExitParkingModal={() => openExitModal(spotNumber, spotData)}
                    lastInColumn={index === arr.length - 1}
                    faceRight={columnData.faceRight}
                />
            })}
        </div >
    );
}

export default ParkingColumn;
