import React from 'react';
import './App.css';
import AvailableSpotsContainer from "./components/elements/AvailableSpotsContainer/AvailableSpotsContainer";
import TimeContainer from './components/elements/TimeContainer/TimeContainer';
import ParkingColumn from "./components/elements/ParkingColumn/ParkingColumn";
import AddCarModal from './components/modals/AddCarModal/AddCarModal';
import ExitParkingModal from './components/modals/ExitParkingModal/ExitParkingModal';
import { useState } from 'react';
import { useEffect } from 'react';
import { DefaultStore, StoreModel } from './models/StoreModel';
import { SpotModel } from './models/SpotModel';

function App() {

  const [showAddCarModal, setShowAddCarModal] = useState<boolean>(false);
  const [showExitParkingModal, setShowExitParkingModal] = useState<boolean>(false);
  const [store, setStore] = useState<StoreModel>({});
  const [selectedSpot, setSelectedSpot] = useState<SpotModel>();


  const initStore = () => {
    setStore(DefaultStore)
  }

  useEffect(() => {
    initStore();
  }, []);


  const addCar = (plateNumber: string, spot: SpotModel) => {
    const storeCopy: StoreModel = {};
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


  const removeCar = (spot?: SpotModel) => {
    console.log("remove car for :", spot);
    if (spot) {
      const storeCopy: StoreModel = {};
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
  }


  const toggleAddCarModal = (spot?: SpotModel) => {
    // if (spot)
    console.log("spot: ", spot);
    setSelectedSpot(spot);

    setShowAddCarModal(lastValue => !lastValue);
  }

  const toggleExitParkingModal = (spot?: SpotModel) => {
    // if (spot)
    setSelectedSpot(spot);

    setShowExitParkingModal(lastValue => !lastValue);
  }


  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      <div className="flex justify-around bg-yellow-50 px-5 py-3 rounded-3xl app-container">
        <AvailableSpotsContainer store={store} />
        <div className="flex flex-row justify-center items-center pt-28 w-60 mx-10">
          {Object.keys(store).map((item) => {
            const itemIntValue = parseInt(item);

            return <ParkingColumn
              columnNumber={itemIntValue}
              columnData={store[itemIntValue]}
              borderRight={itemIntValue === 0}
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
