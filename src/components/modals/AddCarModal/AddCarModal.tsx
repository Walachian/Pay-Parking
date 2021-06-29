import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSpring, animated } from "react-spring";
import './AddCarModal.css';

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
            ? <div className="modal-container">
                <div className="modal-backdrop" onClick={() => closeModal()} />
                <animated.div style={animation}>
                    <div className="add-car-modal">
                        <label className="add-car-modal-title">Enter your plate number and click PARK to start parking</label>
                        <input
                            maxLength={7}
                            value={plateNo}
                            className="add-car-modal-input"
                            type="textfield"
                            onChange={handleChange}
                        />
                        <button className="add-car-modal-button" onClick={() => {
                            if (plateNo.length > 0) {
                                addCar(plateNo, spot);
                            } else {
                                closeModal();
                            }
                        }}>
                            <p className="add-car-modal-button-text">PARK</p>
                        </button>
                    </div>
                </animated.div>
            </div>
            : null
        }</>
    );
}

export default AddCarModal;
