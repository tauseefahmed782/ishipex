import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
const Form = () => {
    const [currentStep, setCurrentStep] = useState(1);

   
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });


    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Data:', formData);

    };

    return (
        <div className="container mt-5">

            <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                   <StepOne  nextStep={nextStep}/>
                )}

                {currentStep === 2 && (
                  <StepTwo prevStep ={prevStep} />
                )}
            </form>
        </div>
    );
};

export default Form;
