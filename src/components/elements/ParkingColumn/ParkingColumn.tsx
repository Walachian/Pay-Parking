import { SpotDataModel, SpotModel } from '../../../models/SpotModel';
import { ColumnData } from '../../../models/StoreModel';
import ParkingSpot from "../ParkingSpot/ParkingSpot"

interface ParkingColumnProps {
    columnData: ColumnData;
    columnNumber: number;
    borderLeft?: boolean;
    borderRight?: boolean;
    toggleAddCarModal: (selectedSpot?: SpotModel) => void;
    toggleExitParkingModal: (selectedSpot?: SpotModel) => void;
}

const ParkingColumn = ({ columnData, columnNumber, borderLeft, borderRight, toggleAddCarModal, toggleExitParkingModal }: ParkingColumnProps) => {

    const openAddModal = (spotNumber: number, spotData: SpotDataModel) => {
        const selectedSpotObject: SpotModel = {
            columnNumber,
            spotNumber,
            spotData,
        }

        toggleAddCarModal(selectedSpotObject);
    }

    const openExitModal = (spotNumber: number, spotData: SpotDataModel) => {
        const selectedSpotObject: SpotModel = {
            columnNumber,
            spotNumber,
            spotData,
        }

        toggleExitParkingModal(selectedSpotObject);
    }

    return (
        <div className={`flex flex-col w-full 
        ${borderRight ? "left-column " : ""}
        ${borderLeft ? "right-column " : ""}
        `}>
            {Object.keys(columnData?.spots).map((item, index, arr) => {
                const itemIntValue = parseInt(item);
                const spotData = { ...columnData?.spots[itemIntValue] };
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
