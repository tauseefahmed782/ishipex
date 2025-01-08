import React, { useState, useEffect } from "react";

const DeliveryTime = () => {
  const [selectedOption, setSelectedOption] = useState("same-day"); // Default selected option
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    let newDate;

    if (selectedOption === "same-day") {
      newDate = currentDate;
    } else if (selectedOption === "next-day") {
      newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
    } else if (selectedOption === "60-minutes") {
      newDate = currentDate;

      // Update the delivery time to the current time
      const currentHours = currentDate.getHours().toString().padStart(2, "0");
      const currentMinutes = currentDate.getMinutes().toString().padStart(2, "0");
      setDeliveryTime(`${currentHours}:${currentMinutes}`);
    }

    setDeliveryDate(newDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
  }, [selectedOption]);

  const handleOptionChange = (option) => {
    setSelectedOption(option); // Update selected delivery option
  };

  const handleTimeChange = (e) => {
    if (selectedOption !== "60-minutes") {
      setDeliveryTime(e.target.value); // Update selected time
    }
  };

  return (
    <div>
      <div className="row mt-3">
          {/* 60 Minutes Option */}
          <div className="col-md-3">
          <div className="package-delivery-box">
            <label
              className={`position-relative ${
                selectedOption === "60-minutes" ? "active" : ""
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
        {/* Same Day Option */}
        <div className="col-md-3">
          <div className="package-delivery-box">
            <label
              className={`position-relative ${
                selectedOption === "same-day" ? "active" : ""
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

      

        {/* Next Day Option */}
        <div className="col-md-3">
          <div className="package-delivery-box">
            <label
              className={`position-relative ${
                selectedOption === "next-day" ? "active" : ""
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

      {/* Delivery Date and Time Section */}
      <div className="row step-6 mb-2 pb-3 mt-4">
        <div className="col-md-11 mb-2">
          <label className="label-md">Delivery Date And Time</label>
        </div>

        <div className="col-md-11">
          <div className="d-flex align-items-center">
            <h5 className="font-18 mb-0">
              <input
                type="date"
                value={deliveryDate}
                readOnly
                className="form-control"
              />
            </h5>
            <h5 className="font-18 mb-0 ms-2">
              <input
                type="time"
                value={deliveryTime}
                onChange={handleTimeChange}
                className="form-control"
                readOnly={selectedOption === "60-minutes"} // Make input readonly after updating time
              />
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTime;
