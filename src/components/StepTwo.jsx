import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DeliveryTime from './DeliveryTime';

const StepTwo = ({ prevStep, setFormData, formData, handleSubmit, handleVehicleForm }) => {
    const [mobilePhone, setMobilePhone] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [showTextField, setShowTextField] = useState(false);
    const [customerPhone, setCustomerPhone] = useState('');
    const [vehicles, setVehicles] = useState([]); // State to store vehicle data from API

    useEffect(() => {
        // Fetch vehicles from API
        const fetchVehicles = async () => {
            try {
                const response = await fetch('https://admin.beingmotherstore.com/parc_api/vehiclelist.php');
                const data = await response.json();
                if (data.ResponseCode === '200' && data.Result === 'true') {
                    console.log("");
                    setVehicles(data.Vehiclelist);
                } else {
                    console.error('Failed to fetch vehicles:', data.ResponseMsg);
                }
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };
        fetchVehicles();
    }, []);

    const handleSelectChange = (event) => {
        if (event.target.value === 'Other') {
            setShowTextField(true);
        } else {
            setShowTextField(false);
            handleVehicleForm(event);
        }
    };

    const handleSelect = (vehicle) => {
        setSelectedVehicle(vehicle);
    };

    return (
        <div>
            <div className="all-step-2-to-5">
                <div className="step-2 mt-4 pt-3">
                    <label className="label-md">What’s inside your package?</label>
                    <div className="row mt-3">
                        <div className="col-md-5 col-12">
                            <select
                                className="form-select"
                                aria-label="inside Your Package"
                                name="packageType"
                                onChange={handleSelectChange}
                            >
                                <option selected>Please select the item type</option>
                                <option value="Documents">Documents</option>
                                <option value="Documents – Embassy Pickup">Documents – Embassy Pickup</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-md-5">
                            {showTextField && (
                                <input
                                    type="text"
                                    className="form-control border-0 border-bottom ps-0 border-radious-0"
                                    placeholder="Please specify the item type"
                                    name="packageType"
                                    onChange={handleVehicleForm}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="step-4 mt-4 pt-3">
                    <label className="label-md">Your package will fit in:</label>
                    <div className="row mt-3">
                        {vehicles.map((vehicle) => (
                            <div className="col-md-4" key={vehicle.id}>
                                <div className="package-box">
                                    <label
                                        className={`position-relative ${
                                            selectedVehicle === vehicle.title ? 'active' : ''
                                        }`}
                                        htmlFor={vehicle.id}
                                    >
                                        <div className="package-icon d-flex">
                                            <img
                                                src={`https://admin.beingmotherstore.com/parc_api/${vehicle.img}`}
                                                width="50"
                                                height="50"
                                                alt={vehicle.title}
                                            />
                                            <div className="text ms-3">
                                                <b className="d-block">{vehicle.title}</b>
                                                <span className="text-muted">Max Weight: {vehicle.capcity}kgs</span>
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
                                            id={vehicle.id}
                                            name="vehicle"
                                            value={vehicle.title}
                                            onChange={(e) => {
                                                setSelectedVehicle(e.target.value);
                                                handleVehicleForm(e);
                                            }}
                                            checked={selectedVehicle === vehicle.title}
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="step-4 mt-4 pt-3">
                    <label className="label-md">When do you want your package to be delivered?</label>
                    <DeliveryTime />
                </div>

                <div className="step-5 pt-3">
                    <label className="">Mobile Number</label>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-flex step-form-5">
                                <PhoneInput
                                    country={'ae'}
                                    value={mobilePhone}
                                    onChange={(value) => {
                                        setCustomerPhone(value);
                                        handleVehicleForm({
                                            target: { name: 'CustomerPhone', value: value },
                                        });
                                    }}
                                    inputStyle={{
                                        width: '100%',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
            <button type="button" onClick={prevStep} className="btn btn-previous me-2">
    Previous
</button>
                <button type="submit" className="btn btn-payment" onClick={handleSubmit}>
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default StepTwo;
