import React from 'react';
import ReactDOM from 'react-dom';

const PaymentModal = ({ show, finalData, onClose, handleSubmit }) => {
    if (!show) return null;

    return ReactDOM.createPortal(
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
                            onClick={onClose}
                        >+</button>
                    </div>
                    <div className="modal-body">
                       
                        <div className="mb-3">
                            <h4 >Pickup Details</h4>
                            <p>
                                <strong>Address:</strong> {finalData.pick_address || 'N/A'}
                            </p>
                            <p>
                                        <strong>Pickup Mobile Number:</strong>
                                    </p>
                           
                        </div>
                        <div className="mb-3">
                            <h4>Drop-off Details</h4>
                            {finalData.ParcelData.map((parcel, index) => (
                                <div key={index} className="mb-2">
                                    <p>
                                        <strong>Address:</strong> {parcel.drop_address || 'N/A'}
                                    </p>
                                   
                                    <p>
                                        <strong>Recipient Name:</strong> {parcel.drop_name || 'N/A'}
                                    </p>
                                    <p>
                                        <strong>Recipient Mobile:</strong> {parcel.drop_mobile || 'N/A'}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mb-3">
                            <h5>Other Details</h5>
                            <p>
                                <strong>Vehicle ID:</strong> {finalData.vehicleid || 'N/A'}
                            </p>
                            <p>
                                <strong>Payment Method ID:</strong> {finalData.p_method_id || 'N/A'}
                            </p>
                            <p>
                                <strong>Total:</strong> ₹{finalData.o_total || 'N/A'}
                            </p>
                            <p>
                                <strong>Subtotal:</strong> ₹{finalData.subtotal || 'N/A'}
                            </p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-confirm"
                            onClick={handleSubmit}
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body // Render at the root level
    );
};

export default PaymentModal;
