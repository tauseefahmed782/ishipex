import React, { useState } from 'react'
import box from '../assets/images/box.png'
import headerImg from '../assets/images/rb_6333.png'
import bike from '../assets/images/delivery-bike.png'
import van from '../assets/images/delivery-van.png'
import Form from '../components/Form'
import PaymentModal from '../components/PaymentModal'
import Header from '../components/Header'

export const Book = () => {
    const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({}); 
  return (
    <div>
            <Header/>

          {/* <!--Start Book Intro--> */}
    <div className="book-intro bg-ligh-blue">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-7">
                    <div>
                        <h1 className="book-title">Super Fast Pick Up & Drop-off Service</h1>
                        <p className="mt-3 mb-0">Convenience at your finger tips.</p>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="text-end">
                        <img src={headerImg} width="303" height="180" alt="image" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!--book form area--> */}
    <div className="book-sec">
        <div className="container">
            <div className="book-form-container bg-white border shadow-sm">
                <div className="row">
                    <div className="col-md-8">
                        <div>
                            <h2>Send Packages in Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain & Ras Al-Khaimah</h2>
<Form  setModalOpen={setModalOpen} setFormData={setFormData}  />
                        
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="border-start ms-md-4 ms-sm-3 ps-5 pe-3 pb-3">

                            <div className="d-none" id="booking-summary">
                                <h5 className="font-18">Your Booking Summary</h5>
                            </div>

                            <div className="d-block" id="right-booking-info">
                                <h5 className="font-18">A few things we want you to know</h5>

                                <ul className="list-unstyled mb-0 ps-0 mt-4 book-imp-note">
                                    <li className="mb-3">
                                        <p className="text-dark mb-1 font-15 fw-500">Package Weight</p>
                                        <p className="text-default font-14 mb-0">The weight limit is 10kg, with an additional charge of AED 2 for each extra kilogram. The maximum weight allowed is 20kg.</p>
                                    </li>
                                    <li className="mb-3">
                                        <p className="text-dark mb-1 font-15 fw-500">Dimension</p>
                                        <p className="text-default font-14 mb-0">The maximum box size is 40 x 40 x 40 cm. If this limit is exceeded, additional charges will apply. Shipments larger than 80 x 80 x 80 cm will be cancelled for pick-up.</p>
                                    </li>
                                    <li className="mb-3">
                                        <p className="text-dark mb-1 font-15 fw-500">Illegal Goods</p>
                                        <p className="text-default font-14 mb-0">The shipment must not contain any prohibited items.</p>
                                    </li>
                                    <li className="mb-3">
                                        <p className="text-dark mb-1 font-15 fw-500">Packaging</p>
                                        <p className="text-default font-14 mb-0">The contents must be securely packed or sealed for transportation. Please refer to the complete guidelines here.</p>
                                    </li>
                                    <li className="mb-0">
                                        <p className="text-dark mb-1 font-15 fw-500">Waiting Time</p>
                                        <p className="text-default font-14 mb-0">Shyft agents will wait up to 10 minutes for item pickup.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {isModalOpen && (
        <PaymentModal
       
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
