import React, { useState } from 'react'
import bike from '../assets/images/delivery-bike.png'
import van from '../assets/images/delivery-van.png'
import box from '../assets/images/box.png'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const StepTwo = ({prevStep}) => {
    const [mobilePhone, setMobilePhone] = useState(''); // State for the second input
    const [selectedVehicle, setSelectedVehicle] = useState(""); // State to track selected vehicle
    const [selectedOption, setSelectedOption] = useState(""); // State for this section
    const [showTextField, setShowTextField] = useState(false);
     const handleSelectChange = (event) => {
            if (event.target.value === "Other") {
                setShowTextField(true);
            } else {
                setShowTextField(false);
            }
        };
        const handleOptionChange = (option) => {
            setSelectedOption(option); // Update selected option
        };
        const handleSelect = (vehicle) => {
            setSelectedVehicle(vehicle); // Update the selected vehicle
        };
  return (
    <div>
    <div className="all-step-2-to-5 ">
        <div className="step-2 mt-4 pt-3">
            <label className="label-md">What’s inside your package?</label>
            <div className="row mt-3">
                <div className="col-md-5 col-12">
                    <select className="form-select" aria-label="inside Your Package" onChange={handleSelectChange}>
                        <option selected>Please select the item type</option>
                        <option value="Documents">Documents</option>
                        <option value="Documents – Embassy Pickup">Documents – Embassy Pickup
                        </option>
                        <option value="Clothes">Clothes</option>
                        <option value="Other">Other</option>
                    </select>

                </div>
                <div className='col-md-5'>
                    {showTextField && (
                        <input
                            type="text"
                            className="form-control border-0 border-bottom ps-0 border-radious-0"
                            placeholder="Please specify the item type"
                        />
                    )}
                </div>
            </div>
        </div>

        <div className="step-3 mt-4 pt-3">
            <div className="package-guide-box bg-ligh-blue d-flex border px-3 py-3">
                <span>
                    <img src={box} width="50" height="50" alt="icon"
                        className="img-fluid" />
                </span>
                <div className="ms-4">
                    <h5>Packaging Guide</h5>
                    <p className="mb-0 font-14">Click to see steps on how to package your items in
                        the best way possible </p>
                </div>
            </div>
        </div>

        <div className="step-4 mt-4 pt-3">
            <label className="label-md">Your package will fit in:</label>
            <div className="row mt-3">
                <div className="col-md-4">
                    <div className="package-box">
                        <label
                            className={`position-relative ${selectedVehicle === "bike" ? "active" : ""
                                }`}
                            htmlFor="bike"
                        >
                            <div className="package-icon d-flex">
                                <img src={bike} width="50" height="50" alt="bike" />
                                <div className="text ms-3">
                                    <b className="d-block">Bike</b>
                                    <span className="text-muted">Max Weight: 4kgs</span>
                                </div>
                            </div>
                            <span className="position-absolute package-check">
                                <svg
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12.6111L8.92308 17.5L20 6.5"
                                        stroke="#fff"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </span>
                            <input
                                type="radio"
                                id="bike"
                                name="vehicle"
                                onChange={() => handleSelect("bike")}
                                checked={selectedVehicle === "bike"}
                            />

                            <span className="position-absolute package-check">
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                        stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#fff"
                                            stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </g>
                                </svg>
                            </span>
                            <input
                                type="radio"
                                id="bike"
                                name="vehicle"
                                onChange={() => handleSelect("bike")}
                                checked={selectedVehicle === "bike"}
                            />
                        </label>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="package-box">
                        <label
                            className={`position-relative ${selectedVehicle === "van" ? "active" : ""
                                }`}
                            htmlFor="van"
                        >
                            <div className="package-icon d-flex">
                                <img src={van} width="50" height="50"
                                    alt="van" />
                                <div className="text ms-3">
                                    <b className="d-block">Van</b>
                                    <span className="text-muted">Max Weight: 10 kgs</span>
                                </div>
                            </div>
                            <span className="position-absolute package-check">
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                        stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#fff"
                                            stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </g>
                                </svg>
                            </span>
                            <input
                                type="radio"
                                id="van"
                                name="vehicle"
                                onChange={() => handleSelect("van")}
                                checked={selectedVehicle === "van"}
                            />
                        </label>
                    </div>
                </div>

            </div>
        </div>

        <div className="step-4 mt-4 pt-3">
            <label className="label-md">When do you want your package to be delivered?</label>
            <div className="row mt-3">
                <div className="col-md-3">
                    <div className="package-delivery-box">
                        <label
                            className={`position-relative ${selectedOption === "same-day" ? "active" : ""
                                }`}
                            htmlFor="same-day"
                        >
                            <div className="package-icon">
                                <div>
                                    <b className="d-block">Same Day</b>
                                    <span className="text-muted">AED 36</span>
                                </div>
                            </div>
                            <span className="position-absolute package-check">
                                <svg
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12.6111L8.92308 17.5L20 6.5"
                                        stroke="#fff"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </span>
                            <input
                                type="radio"
                                id="same-day"
                                name="delivery-options"
                                onChange={() => handleOptionChange("same-day")}
                                checked={selectedOption === "same-day"}
                            />
                        </label>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="package-delivery-box">
                        <label
                            className={`position-relative ${selectedOption === "60-minutes" ? "active" : ""
                                }`}
                            htmlFor="60-minutes"
                        >
                            <div className="package-icon">
                                <div>
                                    <b className="d-block">60 Minutes</b>
                                    <span className="text-muted">AED 36</span>
                                </div>
                            </div>
                            <span className="position-absolute package-check">
                                <svg
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12.6111L8.92308 17.5L20 6.5"
                                        stroke="#fff"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </span>
                            <input
                                type="radio"
                                id="60-minutes"
                                name="delivery-options"
                                onChange={() => handleOptionChange("60-minutes")}
                                checked={selectedOption === "60-minutes"}
                            />
                        </label>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="package-delivery-box">
                        <label
                            className={`position-relative ${selectedOption === "next-day" ? "active" : ""
                                }`}
                            htmlFor="next-day"
                        >
                            <div className="package-icon">
                                <div>
                                    <b className="d-block">Next Day</b>
                                    <span className="text-muted">AED 36</span>
                                </div>
                            </div>
                            <span className="position-absolute package-check">
                                <svg
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12.6111L8.92308 17.5L20 6.5"
                                        stroke="#fff"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </span>
                            <input
                                type="radio"
                                id="next-day"
                                name="delivery-options"
                                onChange={() => handleOptionChange("next-day")}
                                checked={selectedOption === "next-day"}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div className="step-5 mt-4 pt-3">
            <label className="">Mobile Number</label>
            <div className="row">
                <div className="col-md-6">
                    <div className="d-flex step-form-5">
                        <PhoneInput
                            country={'ae'}
                            value={mobilePhone} // Use the same state
                            onChange={(value) => setMobilePhone(value)} // Update shared state
                            inputStyle={{
                                width: '100%',
                            }}
                        />

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className='mt-4'>
        <button type="button" onClick={prevStep} className="btn btn-previous me-2">
            Previous
        </button>
        <button type="submit" className="btn btn-payment">
            Proceesed To Payment
        </button>
    </div>
</div>
  )
}

export default StepTwo