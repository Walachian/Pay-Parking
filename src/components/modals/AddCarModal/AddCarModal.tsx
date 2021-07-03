import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSpring, animated } from "react-spring";

interface AddCarModalProps {
    visible: boolean;
    spot: any;
    addCar: (plateNumber: string, spot: any) => void;
    closeModal: () => void;
}

const AddCarModal = ({ visible, spot, closeModal, addCar }: AddCarModalProps) => {

    // state variable for plate number
    const [plateNo, setPlateNo] = useState<string>("");

    // animation style object
    const animation = useSpring({
        config: {
            mass: 1,
            tension: 180,
            friction: 18,
        },
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0%)" : "translateY(-100%)",
    });

    const handleChange = (event: any) => {

        let letters = /[A-Z0-9]*$/;
        const enteredCharacter = event.target.value.toUpperCase();

        if (letters.test(enteredCharacter)) {
            setPlateNo(enteredCharacter);
        }
    }

    useEffect(() => {
        setPlateNo("");
    }, [visible]);


    return (
        <>{visible
            ? <div className="flex h-full w-full justify-center items-center absolute top-0 left-0">
                <div className="flex h-full w-full absolute top-0 left-0 bg-black opacity-70" onClick={() => closeModal()} />
                <animated.div style={animation}>
                    <div className="h-60 w-96 flex relative justify-center items-center
                     flex-col pt-5 bg-yellow-50 rounded-3xl modal-style">
                        <label className="absolute top-0 text-2xl p-3 text-center text-gray-800 ">Enter your plate number and click PARK to start parking</label>
                        <input
                            maxLength={7}
                            value={plateNo}
                            className="w-1/2 bg-white border-black border-4 rounded-lg text-4xl
                            text-center"
                            type="textfield"
                            onChange={handleChange}
                        />
                        <button className="absolute bottom-0 w-3/4 h-16 border-none bg-gray-800
                        text-3xl text-yellow-50 rounded-t-full"
                            onClick={() => {
                                if (plateNo.length > 0) {
                                    addCar(plateNo, spot);
                                } else {
                                    closeModal();
                                }
                            }}>
                            <p className="p-0 m-0">PARK</p>
                        </button>
                    </div>
                </animated.div>
            </div>
            : null
        }</>
    );
}

export default AddCarModal;
