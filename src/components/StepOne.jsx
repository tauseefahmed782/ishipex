import React, { useState , useEffect, useRef} from 'react'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
const StepOne = ({nextStep}) => {
     const [primaryPhone, setPrimaryPhone] = useState(''); 
     const [secondaryPhone, setSecondaryPhone] = useState(''); 

    //  testing
    const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: query }, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSuggestions(predictions || []);
      }
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => fetchSuggestions(inputValue), 300); // Debounce
    return () => clearTimeout(timeoutId); // Clear timeout on input change
  }, [inputValue]);
     const inputRef = useRef();
     useEffect(() => {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ["geocode"], // Restrict search to geographical locations
        });
    
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          console.log("Selected place:", place);
        });
      }, []);
    return (
        <div>
            <div
                className="address-group position-relative d-flex align-items-center bg-light-soft mb-3">
                <div className="address-icon">
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                            stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                                stroke="#0073CF" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path
                                d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                                stroke="#0073CF" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                        </g>
                    </svg>
                </div>

                <div className="input-area">
                    <label for="pickup-location">Enter Pickup Location</label>
                    <input type="text" name='pickup-location' className="form-control bg-transparent border-0 ps-0"
                        placeholder="Enter Location"  ref={inputRef} />
                </div>
{/* testing */}
<div className="input-area" style={{ position: "relative" }}>
      <label htmlFor="pickup-location">Enter Pickup Location</label>
      <input
        type="text"
        name="pickup-location"
        className="form-control bg-transparent border-0 ps-0"
        placeholder="Enter Location"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ zIndex: 2, position: "relative" }}
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0.5rem 0 0",
            position: "absolute",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            overflowY: "auto",
            width: "100%",
            zIndex: 3,
          }}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              style={{
                padding: "0.5rem",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onClick={() => {
                setInputValue(suggestion.description);
                setSuggestions([]);
              }}
            >
             tes {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
                <div className="search-icon">
                    <span><svg width="40px" height="40px" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                            stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M10.77 18.3C9.2807 18.3 7.82485 17.8584 6.58655 17.031C5.34825 16.2036 4.38311 15.0275 3.81318 13.6516C3.24325 12.2757 3.09413 10.7616 3.38468 9.30096C3.67523 7.84029 4.39239 6.49857 5.44548 5.44548C6.49857 4.39239 7.84029 3.67523 9.30096 3.38468C10.7616 3.09413 12.2757 3.24325 13.6516 3.81318C15.0275 4.38311 16.2036 5.34825 17.031 6.58655C17.8584 7.82485 18.3 9.2807 18.3 10.77C18.3 11.7588 18.1052 12.738 17.7268 13.6516C17.3484 14.5652 16.7937 15.3953 16.0945 16.0945C15.3953 16.7937 14.5652 17.3484 13.6516 17.7268C12.738 18.1052 11.7588 18.3 10.77 18.3ZM10.77 4.74999C9.58331 4.74999 8.42327 5.10189 7.43657 5.76118C6.44988 6.42046 5.68084 7.35754 5.22672 8.45389C4.77259 9.55025 4.65377 10.7566 4.88528 11.9205C5.11679 13.0844 5.68824 14.1535 6.52735 14.9926C7.36647 15.8317 8.43556 16.4032 9.59945 16.6347C10.7633 16.8662 11.9697 16.7474 13.0661 16.2933C14.1624 15.8391 15.0995 15.0701 15.7588 14.0834C16.4181 13.0967 16.77 11.9367 16.77 10.75C16.77 9.15869 16.1379 7.63257 15.0126 6.50735C13.8874 5.38213 12.3613 4.74999 10.77 4.74999Z"
                                fill="#606D9A"></path>
                            <path
                                d="M20 20.75C19.9015 20.7504 19.8038 20.7312 19.7128 20.6934C19.6218 20.6557 19.5392 20.6001 19.47 20.53L15.34 16.4C15.2075 16.2578 15.1354 16.0697 15.1388 15.8754C15.1422 15.6811 15.221 15.4958 15.3584 15.3583C15.4958 15.2209 15.6812 15.1422 15.8755 15.1388C16.0698 15.1354 16.2578 15.2075 16.4 15.34L20.53 19.47C20.6704 19.6106 20.7493 19.8012 20.7493 20C20.7493 20.1987 20.6704 20.3893 20.53 20.53C20.4608 20.6001 20.3782 20.6557 20.2872 20.6934C20.1962 20.7312 20.0985 20.7504 20 20.75Z"
                                fill="#606D9A"></path>
                        </g>
                    </svg></span>
                </div>
            </div>

            <div className='pickup_box'>
                <div className="row step-6 mb-4 pt-3 pb-2 px-0 mx-0">
                    <div className="col-md-6">
                        <div className="">
                            <label className="">Flat Floor, Building Name*</label>
                            <input className="form-control border-0 border-bottom ps-0 border-radious-0"
                                placeholder="Ex: 567, Oil Park Aprtments " name='flate' />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="">
                            <label className="">Enter Landmark</label>
                            <input className="form-control border-0 border-bottom ps-0 border-radious-0"
                                placeholder="Landmark Details" name='landmark' />
                        </div>
                    </div>
                </div>

                <div className="row step-6 mb-4 pb-3 px-0 mx-0 ">
                    <h6>
                        Please select the Pickup  date and time
                    </h6>
                    <div className="col-md-6">
                        <input type="date" name='date' className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <select className="form-select" name='time' aria-label="Default select example">
                            <option value="12 PM - 5 PM">12 PM - 5 PM</option>
                            <option value="5 PM - 8 PM">5 PM - 8 PM</option>
                        </select>
                    </div>
                </div>

                <div className="row  px-0 mx-0 step-6 mb-3 pb-3">
                    <h6>
                        Whom to contact at the time of pickup?
                    </h6>
                    <div className="col-md-4">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="contact" id="" />
                            <label className="form-check-label" for="" >
                                Contact Me
                            </label>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="contact" id="" />
                            <label className="form-check-label" for="">
                                Add a Contact Person
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row mx-0 px-0 step-6 mb-4 pb-3">
                    <div className="col-md-6">
                        <label className="">Your Name</label>
                        <input className="form-control border-0 border-bottom ps-0 border-radious-0"
                            placeholder="Enter Name" />
                    </div>
                    <div className="col-md-6">
                        <label className="mb-2"> Phone Number</label>
                        <PhoneInput
                            country={'ae'}
                            value={primaryPhone}
                            onChange={(value) => setPrimaryPhone(value)} // Update shared state
                            inputStyle={{
                                width: '100%',
                            }}
                        />

                    </div>
                </div>
            </div>

            {/* <!--drop off location--> */}
            <div className="address-group position-relative d-flex align-items-center bg-light-soft">
                <div className="address-icon">
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                            stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                                stroke="#0073CF" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path
                                d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                                stroke="#0073CF" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                        </g>
                    </svg>
                </div>

                <div className="input-area">
                    <label for="">Enter Drop-off Location</label>
                    <input type="text" className="form-control bg-transparent border-0 ps-0"
                        placeholder="Enter Location" />
                </div>

                <div className="search-icon">
                    <span><svg width="40px" height="40px" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                            stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M10.77 18.3C9.2807 18.3 7.82485 17.8584 6.58655 17.031C5.34825 16.2036 4.38311 15.0275 3.81318 13.6516C3.24325 12.2757 3.09413 10.7616 3.38468 9.30096C3.67523 7.84029 4.39239 6.49857 5.44548 5.44548C6.49857 4.39239 7.84029 3.67523 9.30096 3.38468C10.7616 3.09413 12.2757 3.24325 13.6516 3.81318C15.0275 4.38311 16.2036 5.34825 17.031 6.58655C17.8584 7.82485 18.3 9.2807 18.3 10.77C18.3 11.7588 18.1052 12.738 17.7268 13.6516C17.3484 14.5652 16.7937 15.3953 16.0945 16.0945C15.3953 16.7937 14.5652 17.3484 13.6516 17.7268C12.738 18.1052 11.7588 18.3 10.77 18.3ZM10.77 4.74999C9.58331 4.74999 8.42327 5.10189 7.43657 5.76118C6.44988 6.42046 5.68084 7.35754 5.22672 8.45389C4.77259 9.55025 4.65377 10.7566 4.88528 11.9205C5.11679 13.0844 5.68824 14.1535 6.52735 14.9926C7.36647 15.8317 8.43556 16.4032 9.59945 16.6347C10.7633 16.8662 11.9697 16.7474 13.0661 16.2933C14.1624 15.8391 15.0995 15.0701 15.7588 14.0834C16.4181 13.0967 16.77 11.9367 16.77 10.75C16.77 9.15869 16.1379 7.63257 15.0126 6.50735C13.8874 5.38213 12.3613 4.74999 10.77 4.74999Z"
                                fill="#606D9A"></path>
                            <path
                                d="M20 20.75C19.9015 20.7504 19.8038 20.7312 19.7128 20.6934C19.6218 20.6557 19.5392 20.6001 19.47 20.53L15.34 16.4C15.2075 16.2578 15.1354 16.0697 15.1388 15.8754C15.1422 15.6811 15.221 15.4958 15.3584 15.3583C15.4958 15.2209 15.6812 15.1422 15.8755 15.1388C16.0698 15.1354 16.2578 15.2075 16.4 15.34L20.53 19.47C20.6704 19.6106 20.7493 19.8012 20.7493 20C20.7493 20.1987 20.6704 20.3893 20.53 20.53C20.4608 20.6001 20.3782 20.6557 20.2872 20.6934C20.1962 20.7312 20.0985 20.7504 20 20.75Z"
                                fill="#606D9A"></path>
                        </g>
                    </svg></span>
                </div>
            </div>
            <div className='pickup_box'>

                <div className="row step-6 mb-2 pt-4 pb-3 px-0  mx-0">
                    <div className="col-md-6">
                        <div className="">
                            <label className="">Flat Floor, Building Name*</label>
                            <input className="form-control border-0 border-bottom ps-0 border-radious-0"
                                placeholder="Ex: 567, Oil Park Aprtments " />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="">
                            <label className="">Enter Landmark</label>
                            <input className="form-control border-0 border-bottom ps-0 border-radious-0"
                                placeholder="Landmark Details" />
                        </div>
                    </div>
                </div>

                <div className="row step-6 mb-2 pb-3 px-0 mx-0" id="">
                    <div className="col-md-11 mb-2"><label className="font-14">Available Delivery time slot based on pickup date</label></div>

                    <div className="col-md-11">
                        <div className="d-flex align-items-center">
                            <h5 className="font-18 mb-0">Thu 5th Dec, 9 AM - 6 PM</h5>
                            <div className="ms-1">
                                <button type="button" className="btn" style={{ marginTop: '-4px' }}><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#0073CF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#0073CF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 d-none" id="updated-date">
                        <input type="date" className="form-control" />
                    </div>
                    <div className="col-md-3 d-none" id="updated-time">
                        <select className="form-select" aria-label="Default select example">
                            <option value="12 PM - 5 PM">12 PM - 5 PM</option>
                            <option value="5 PM - 8 PM">5 PM - 8 PM</option>
                        </select>
                    </div>
                </div>

                <div className="row step-6 mb-3 pb-3 px-0 mx-0">
                    <h6>Whom to contact at the time of Drop-off?</h6>
                    <div className="col-md-4">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="contact2" id="" />
                            <label className="form-check-label" for="">
                                Contact Me
                            </label>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="contact2" id="" />
                            <label className="form-check-label" for="">
                                Add a Contact Person
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row step-6 mb-4 pb-3 px-0 mx-0">
                    <div className="col-md-6">
                        <label className="">Your Name</label>
                        <input className="form-control border-0 border-bottom ps-0 border-radious-0"
                            placeholder="Enter Name" />
                    </div>
                    <div className="col-md-6">
                        <label className="mb-2"> Phone Number</label>
                        <PhoneInput
                            country={'ae'}
                            value={secondaryPhone} // Use the same state
                            onChange={(value) => setSecondaryPhone(value)} // Update shared state
                            inputStyle={{
                                width: '100%',
                            }}
                        />
                    </div>
                </div>
            </div>



            <h6 className="mt-4 mb-2 font-14">By continuing you agree to the <a
                href="/terms-and-conditions/" target="_blank">Terms &amp; Conditions</a> and <a
                    href="/privacy-policy/" target="_blank">Privacy</a></h6>


            <button type="button" onClick={nextStep} className="jkit-button-wrapper d-block mt-4">
                Continue
            </button>
        </div>
    )
}

export default StepOne