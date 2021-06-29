import React from 'react';
import './App.css';
import AvailableSpotsContainer from "./components/elements/AvailableSpotsContainer/AvailableSpotsContainer";
import TimeContainer from './components/elements/TimeContainer/TimeContainer';
import ParkingColumn from "./components/elements/ParkingColumn/ParkingColumn";
import AddCarModal from './components/modals/AddCarModal/AddCarModal';
import ExitParkingModal from './components/modals/ExitParkingModal/ExitParkingModal';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [showAddCarModal, setShowAddCarModal] = useState<boolean>(false);
  const [showExitParkingModal, setShowExitParkingModal] = useState<boolean>(false);
  const [store, setStore] = useState<any>({});
  const [selectedSpot, setSelectedSpot] = useState<any>();


  const initStore = () => {
    setStore({
      0: {
        "faceRight": true,
        "spots": {
          0: {
            available: true,
            startTime: 0,
            plateNumber: "",
          },
          1: {
            available: true,
            startTime: 0,
            plateNumber: "",
          },
          2: {
            available: true,
            startTime: 0,
            plateNumber: "",
          },
          3: {
            available: true,
            startTime: 0,
            plateNumber: "",
          },
          4: {
            available: true,
            startTime: 0,
            plateNumber: "",
          }
        }
      },
      1: {
        "faceRight": false,
        "spots": {
          0: {
            available: true,
            startTime: 0,
            plateNumber: "",
          },
          1: {
            available: true,
            startTime: 0,
            plateNumber: "",
          },
          2: {
            available: true,
            startTime: 0,
            plateNumber: "",
          },
          3: {
            available: true,
            startTime: 0,
            plateNumber: "",
          },
          4: {
            available: true,
            startTime: 0,
            plateNumber: "",
          }
        }
      },
    });
  }

  useEffect(() => {
    initStore();
  }, []);


  const addCar = (plateNumber: string, spot: any) => {
    const storeCopy: any = {};
    Object.assign(storeCopy, store);

    const colNumber = spot?.columnNumber;
    const spotNumber = spot?.spotNumber;
    const currentTime = new Date();

    const newSpotEntry = {
      available: false,
      plateNumber: plateNumber,
      startTime: currentTime.getTime(),
    }

    storeCopy[colNumber].spots[spotNumber] = newSpotEntry;
    setStore(storeCopy);
    toggleAddCarModal();
  }


  const removeCar = (spot: any) => {
    console.log("remove car for :", spot);
    const storeCopy: any = {};
    Object.assign(storeCopy, store);

    const colNumber = spot?.columnNumber;
    const spotNumber = spot?.spotNumber;

    const newSpotEntry = {
      available: true,
      plateNumber: "",
      startTime: 0,
    }

    storeCopy[colNumber].spots[spotNumber] = newSpotEntry;
    setStore(storeCopy);
    toggleExitParkingModal();
  }


  const toggleAddCarModal = (spot?: any) => {
    // if (spot)
    setSelectedSpot(spot);

    setShowAddCarModal(lastValue => !lastValue);
  }

  const toggleExitParkingModal = (spot?: any) => {
    // if (spot)
    setSelectedSpot(spot);

    setShowExitParkingModal(lastValue => !lastValue);
  }

  return (
    <div className="min-h-screen w-screen">
      <div className="app-container">
        <AvailableSpotsContainer store={store} />
        <div className="middle-container">
          {Object.keys(store).map((item) => {
            return <ParkingColumn
              columnNumber={parseInt(item)}
              columnData={store[item]}
              borderRight={parseInt(item) === 0}
              toggleExitParkingModal={toggleExitParkingModal}
              toggleAddCarModal={toggleAddCarModal}
            />
          })}
        </div>
        <TimeContainer />
      </div>
      <AddCarModal visible={showAddCarModal} addCar={addCar} closeModal={toggleAddCarModal} spot={selectedSpot} />
      <ExitParkingModal visible={showExitParkingModal} removeCar={removeCar} closeModal={toggleExitParkingModal} spot={selectedSpot} />
    </div>
  );
}

export default App;
