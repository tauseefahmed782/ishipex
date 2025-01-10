import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

const Form = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [inputs, setInputs] = useState({});
    const [dropinputs, setDropInputs] = useState({});
    const [vehicalinputs, setVehicalInputs] = useState({});
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    
    
    
    const handlePickUpForm = (event) => {
        const { name, value } = event.target;
        setInputs((values) => ({ ...values, [name]: value }));
        // console.log("inputs ++++++++++++++",{inputs});
    };

    const handleDropOffForm = (event) => {
        const { name, value } = event.target;
        setDropInputs((values) => ({ ...values, [name]: value }));
        // console.log("dropinputs ++++++++++++++",{dropinputs});
    };

    const handleVehicalForm = (event) => {
        const { name, value } = event.target;
        setVehicalInputs((values) => ({ ...values, [name]: value }));
        // console.log("vehicalinputs ++++++++++++++",{vehicalinputs});
    };

    const nextStep = () => {
        saveToLocalStorage();
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('pickupInputs', JSON.stringify(inputs));
        localStorage.setItem('dropInputs', JSON.stringify(dropinputs));
        console.log('Inputs saved to localStorage:', inputs, dropinputs);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const finalData = {
        uid: '14',
        p_method_id: '2',
        pick_address: inputs.pick_location,
        pick_lat: inputs.pick_Lat,
        pick_lng: inputs.pick_Lng,
        vehicleid: '6',
        cou_id: 0,
        cou_amt: 0,
        transaction_id: '0',
        wall_amt: 0,
        o_total: 10,
        cat_id: '18',
        subtotal: 10,
        ParcelData: [
            {
                drop_address: dropinputs.drop_location,
                drop_lat: dropinputs.drop_Lat,
                drop_lng: dropinputs.drop_Lng,
                drop_name: dropinputs.drop_name,
                drop_mobile: dropinputs.drop_mobile,
            },
        ],
    };

    const handleConfirm = async () => {
        setShowModal(false); // Hide modal after confirmation
        console.log('Submitted Data:', JSON.stringify(finalData, null, 2));
        
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Submitted Data:', JSON.stringify(finalData, null, 2));
        try {
            const response = await fetch('https://admin.beingmotherstore.com/parc_api/order_now.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Order submitted successfully!');
                console.log('Server Response:', result);
            } else {
                alert(`Failed to submit order: ${result.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setShowModal(true); // Show modal on form submission
                }}
            >
                {currentStep === 1 && (
                    <StepOne
                        nextStep={nextStep}
                        handlePickUpForm={handlePickUpForm}
                        handleDropOffForm={handleDropOffForm}
                    />
                )}
                {currentStep === 2 && (
                    <StepTwo
                        prevStep={prevStep}
                        handleSubmit={handleConfirm}
                        handleVehicalForm={handleVehicalForm}
                    />
                )}
            </form>

            {/* Modal for order confirmation */}
            {showModal && (
                <div
                className="modal fade show"
                style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Order Confirmation</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <h6>Order Summary</h6>
                            <div className="mb-3">
                                <h5>Pickup Details</h5>
                                <p><strong>Address:</strong> {finalData.pick_address || 'N/A'}</p>
                                <p><strong>Latitude:</strong> {finalData.pick_lat || 'N/A'}</p>
                                <p><strong>Longitude:</strong> {finalData.pick_lng || 'N/A'}</p>
                            </div>
                            <div className="mb-3">
                                <h5>Drop-off Details</h5>
                                {finalData.ParcelData.map((parcel, index) => (
                                    <div key={index} className="mb-2">
                                        <p><strong>Address:</strong> {parcel.drop_address || 'N/A'}</p>
                                        <p><strong>Latitude:</strong> {parcel.drop_lat || 'N/A'}</p>
                                        <p><strong>Longitude:</strong> {parcel.drop_lng || 'N/A'}</p>
                                        <p><strong>Recipient Name:</strong> {parcel.drop_name || 'N/A'}</p>
                                        <p><strong>Recipient Mobile:</strong> {parcel.drop_mobile || 'N/A'}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mb-3">
                                <h5>Other Details</h5>
                                <p><strong>Vehicle ID:</strong> {finalData.vehicleid || 'N/A'}</p>
                                <p><strong>Payment Method ID:</strong> {finalData.p_method_id || 'N/A'}</p>
                                <p><strong>Total:</strong> ₹{finalData.o_total || 'N/A'}</p>
                                <p><strong>Subtotal:</strong> ₹{finalData.subtotal || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                handlePickUpForm={handlePickUpForm}
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            )}
        </div>
    );
};

export default Form;
