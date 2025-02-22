import React, { useEffect, useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import PaymentModal from './PaymentModal';

const Form = ({isLoggedIn,setIsLoggedIn,showLoginModal,setShowLoginModal}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [inputs, setInputs] = useState({});
    const [dropInputs, setDropInputs] = useState({});
    const [vehicleInputs, setVehicleInputs] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        if(isLoggedIn){
            setCurrentStep(currentStep)
        }else{
            setCurrentStep(1)
        }
      
    },[isLoggedIn]);
    // Handles input changes for Pickup Details
    const handlePickUpForm = (event) => {
        const { name, value } = event.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    // Handles input changes for Drop-off Details
    const handleDropOffForm = (event) => {
        const { name, value } = event.target;
        setDropInputs((prev) => ({ ...prev, [name]: value }));
    };

    // Handles input changes for Vehicle Details
    const handleVehicleForm = (event) => {
        const { name, value } = event.target;
        setVehicleInputs((prev) => ({ ...prev, [name]: value }));
    };

    // Move to the next step and save current inputs in localStorage
    const nextStep = () => {
        saveToLocalStorage();
        setCurrentStep((prevStep) => prevStep + 1);
    };

    // Save pickup and drop-off inputs to localStorage
    const saveToLocalStorage = () => {
        localStorage.setItem('pickupInputs', JSON.stringify(inputs));
        localStorage.setItem('dropInputs', JSON.stringify(dropInputs));
        console.log('Inputs saved to localStorage:', inputs, dropInputs);
    };

    // Move to the previous step
    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    // Final data object to be submitted
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
                drop_address: dropInputs.drop_location,
                drop_lat: dropInputs.drop_Lat,
                drop_lng: dropInputs.drop_Lng,
                drop_name: dropInputs.drop_name,
                drop_mobile: dropInputs.drop_mobile,
            },
        ],
    };

    // Handles the final confirmation action in the modal
    const handleConfirm = () => {
        setShowModal(false);
        console.log('Final data for confirmation:', finalData);
    };

    // Handles the form submission to the API
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting data:', finalData);

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
                console.log('Server response:', result);
            } else {
                alert(`Failed to submit order: ${result.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setShowModal(true); // Show modal before final submission
                }}
            >
                {currentStep == 1 ? (
                    <StepOne
                        nextStep={nextStep}
                        handlePickUpForm={handlePickUpForm}
                        handleDropOffForm={handleDropOffForm}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        showLoginModal={showLoginModal}
                        setShowLoginModal={setShowLoginModal}
                        
                    />
                ):<StepTwo
                prevStep={prevStep}
                handleVehicleForm={handleVehicleForm}
                handleConfirm={handleConfirm}
                
            />}
            </form>

            {/* Payment Modal */}
            <PaymentModal
                show={showModal}
                onClose={() => setShowModal(false)}
                handleSubmit={handleSubmit}
                finalData={finalData}
            />
        </div>
    );
};

export default Form;
