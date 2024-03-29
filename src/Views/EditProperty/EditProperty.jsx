import React, { useEffect, useState } from "react";
import "../EditProperty/EditProperty.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
function validateIfNotNegativeGuest() {
  var value = document.getElementById("guest").value;
  if (value < 1) {
    return true;
  }
}

function validateIfNotNegativeBed() {
  var value = document.getElementById("bed").value;
  if (value < 1) {
    return true;
  }
}

function validateIfNotNegativeBath() {
  var value = document.getElementById("bath").value;
  if (value < 1) {
    return true;
  }
}

function validateDescFieldIsNotEmpty() {
  var object = document.getElementById("description");
  if (object.value === "") {
    object.style.border = "2px solid red";
    document.getElementById("DescerrorMsg").style.display = "block";
  } else {
    object.style.border = "";
    document.getElementById("DescerrorMsg").style.display = "none";
  }
}

function validateTitleFieldIsNotEmpty() {
  var object = document.getElementById("title");
  if (object.value === "") {
    object.style.border = "2px solid red";
    document.getElementById("TitleerrorMsg").style.display = "block";
  } else {
    object.style.border = "";
    document.getElementById("TitleerrorMsg").style.display = "none";
  }
}

function validatePriceFieldIsNotEmpty() {
  var object = document.getElementById("price");
  if (object.value === "0") {
    object.style.border = "2px solid red";
    document.getElementById("PriceerrorMsg").style.display = "block";
  } else {
    object.style.border = "";
    document.getElementById("PriceerrorMsg").style.display = "none";
  }
}

function validateAptFieldIsNotEmpty() {
  var object = document.getElementById("aptType");
  var str = object.options[object.selectedIndex].value;
  if (str === "-1") {
    object.style.border = "2px solid red";
    document.getElementById("ApterrorMsg").style.display = "block";
  } else {
    object.style.border = "";
    document.getElementById("ApterrorMsg").style.display = "none";
  }
}

function validateSpaceFieldIsNotEmpty() {
  var object = document.getElementById("space");
  var str = object.options[object.selectedIndex].value;
  if (str === "-1") {
    object.style.border = "2px solid red";
    document.getElementById("SpaceerrorMsg").style.display = "block";
  } else {
    object.style.border = "";
    document.getElementById("SpaceerrorMsg").style.display = "none";
  }
}

function validateStreetFieldIsNotEmpty() {
  var object = document.getElementById("street");
  if (object.value === "") {
    object.style.border = "2px solid red";
    document.getElementById("StreeterrorMsg").style.display = "block";
  } else {
    object.style.border = "";
    document.getElementById("StreeterrorMsg").style.display = "none";
  }
}

function validateCityFieldIsNotEmpty() {
  var object = document.getElementById("city");
  if (object.value === "") {
    object.style.border = "2px solid red";
    document.getElementById("CityerrorMsg").style.display = "block";
  } else {
    object.style.border = "";
    document.getElementById("CityerrorMsg").style.display = "none";
  }
}

function validateStateFieldIsNotEmpty() {
  var object = document.getElementById("state");
  var str = object.options[object.selectedIndex].value;
  if (str === "-1") {
    object.style.border = "2px solid red";
    document.getElementById("StateerrorMsg").style.display = "block";
  } else {
    object.style.border = "";
    document.getElementById("StateerrorMsg").style.display = "none";
  }
}

function validateZipFieldIsNotEmpty() {
  var object = document.getElementById("zip");
  var regexZip = /^[0-9]{5}(?:-[0-9]{4})?$/;
  if (!object.value.match(regexZip)) {
    object.style.border = "2px solid red";
    document.getElementById("ZiperrorMsg").style.display = "block";
  } else {
    object.style.border = "";
    document.getElementById("ZiperrorMsg").style.display = "none";
  }
}

function validateGuestFieldIsNotEmpty() {
  var object = document.getElementById("guest");
  if (object.value === "0") {
    object.style.border = "2px solid red";
    document.getElementById("GuesterrorMsg").style.display = "block";
  } else {
    object.style.border = "";
    document.getElementById("GuesterrorMsg").style.display = "none";
  }
}

function validateBedsFieldIsNotEmpty() {
  var object = document.getElementById("bed");
  if (object.value === "0") {
    object.style.border = "2px solid red";
    document.getElementById("BederrorMsg").style.display = "block";
  } else {
    object.style.border = "";
    document.getElementById("BederrorMsg").style.display = "none";
  }
}

function validateBathFieldIsNotEmpty() {
  var object = document.getElementById("bath");
  if (object.value === "0") {
    object.style.border = "2px solid red";
    document.getElementById("BatherrorMsg").style.display = "block";
  } else {
    object.style.border = "";
    document.getElementById("BatherrorMsg").style.display = "none";
  }
}

const EditProperty = () => {
  const { propertyid } = useParams();
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3002/property/${propertyid}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          const property = response.data[0];
          console.log(property);
          setDetails({
            "_id" :property?._id,
            "Title" : property?.Title,
            "Description" : property?.Description,
            "Price": property?.Price,
            "ApartmentType": property?.ApartmentType,
            "Space": property?.Space,
            "Street": property?.Street,
            "City": property?.City,
            "State": property?.State,
            "Zip": property?.Zip,
            "Country": property?.Country,
            "Guests": property?.Guests,
            "Beds": property?.Beds,
            "Bathrooms": property?.Bathrooms,
            "isWifi": property?.features.isWifi,
            "ac": property?.features.ac,
            "bar": property?.features.bar,
            "microwave": property?.features.microwave,
            "fridge": property?.features.fridge,
            "fireplace": property?.features.fireplace,
            "toaster": property?.features.toaster,
            "tv": property?.features.tv,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        //setError(err.response.data.msg);
      });
  }, []);


  const submitHandler = (e) => {
    console.log(details);
    e.preventDefault();
    axios
      .post("http://localhost:3002/editProperty", details, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("Property updated successfully!");
          // alert("Property Updated Successfully!");
          navigate("/hosting");
          window.location.reload(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container px-5">
      <Navbar />
      <div className="row px-5">
        <br />
        <br />
        <h2>Edit Property</h2>
        <div>
          <form
            action="addProperty"
            className="form-group px-5"
            onSubmit={submitHandler}
          >
            <div className="row g-2 my-2">
              <div className="form-floating mb-3 col-4">
                <input
                  className="form-control"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Create a title"
                  onBlur={validateTitleFieldIsNotEmpty}
                  onChange={(e) =>
                    setDetails({ ...details, Title: e.target.value })
                  }
                  value={details.Title}
                />

                <label for="title">Edit your title</label>
                <div id="TitleerrorMsg">Enter Title!</div>
              </div>

              <div className="form-floating mb-3 col-4">
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Describe your property"
                  onBlur={validateDescFieldIsNotEmpty}
                  onChange={(e) =>
                    setDetails({ ...details, Description: e.target.value })
                  }
                  value={details.Description}
                />

                <label for="description">Edit description</label>
                <div id="DescerrorMsg">Enter description!</div>
              </div>

              <div className="form-floating mb-3 col-4">
                <input
                  className="form-control"
                  id="price"
                  name="price"
                  type="number"
                  placeholder="$00 per night"
                  onBlur={validatePriceFieldIsNotEmpty}
                  onChange={(e) =>
                    setDetails({ ...details, Price: e.target.value })
                  }
                  value={details.Price}
                />

                <label for="floatingInput">Edit property price /night</label>
                <div id="PriceerrorMsg">Price cannot be 0!</div>
              </div>

              <div className="col-3">
                <label for="aptType">What kind of place will you host?</label>
              </div>
              <div className="col-3">
                <select
                  className="form-control"
                  name="aptType"
                  id="aptType"
                  onBlur={validateAptFieldIsNotEmpty}
                  onChange={(e) =>
                    setDetails({ ...details, ApartmentType: e.target.value })
                  }
                  value={details.ApartmentType}
                >
                  <option value="-1">Choose Apartment Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="SecondaryUnit">Secondary Unit</option>
                  <option value="UniqueSpace">Unique space</option>
                  <option value="BedAndBreakfast">Bed and breakfast</option>
                  <option value="Boutiquehotel">Boutique hotel</option>
                </select>

                <div id="ApterrorMsg">Choose Apartment type!</div>
              </div>
            </div>
            <br></br>

            <div className="row g-2 my-2">
              <div className="col-3">
                <label for="spaceType">
                  What kind of space will guests have?
                </label>
              </div>
              <div className="col-3">
                <select
                  name="SpaceType"
                  className="form-control"
                  id="space"
                  onBlur={validateSpaceFieldIsNotEmpty}
                  onChange={(e) =>
                    setDetails({ ...details, Space: e.target.value })
                  }
                  value={details.Space}
                >
                  <option value="-1">Choose Space</option>
                  <option value="entireplace">Entire place</option>
                  <option value="privateroom">Private room</option>
                  <option value="sharedroom">Shared room</option>
                </select>

                <div id="SpaceerrorMsg">Choose Space type!</div>
              </div>
            </div>

            <br></br>
            <div class="row g-2 my-2">
              <div className="col-3">
                <label for="noOfGuests">Where is the property located?</label>
              </div>
              <div class="col-9">
                <div className="form-group">
                  <div className="row g-2 my-2">
                    <div className="col-4">
                      <input
                        type="street"
                        class="form-control"
                        id="street"
                        placeholder="Street"
                        name="Street"
                        onBlur={validateStreetFieldIsNotEmpty}
                        readonly="readonly"
                        // onChange={(e) =>
                        //   setDetails({ ...details, Street: e.target.value })
                        // }
                        value={details.Street}
                      />
                      <div id="StreeterrorMsg">Enter Street!</div>
                    </div>

                    <div className="col-4">
                      <input
                        type="city"
                        class="form-control"
                        id="city"
                        placeholder="City"
                        name="city"
                        onBlur={validateCityFieldIsNotEmpty}
                        readonly="readonly"
                        // onChange={(e) =>
                        //   setDetails({ ...details, City: e.target.value })
                        // }
                        value={details.City}
                      />
                      <div id="CityerrorMsg">Enter City!</div>
                    </div>

                    <div className="col-4">
                      <select
                        className="form-control"
                        name="state"
                        id="state"
                        onBlur={validateStateFieldIsNotEmpty}
                        readonly="readonly"
                        // onChange={(e) =>
                        //   setDetails({ ...details, State: e.target.value })
                        // }
                        value={details.State}
                      >
                        <option value="-1">Select State</option>
                        <option value="AL">AL</option>
                        <option value="AK">AK</option>
                        <option value="AZ">AZ</option>
                        <option value="AR">AR</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DE">DE</option>
                        <option value="DC">DC</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="IA">IA</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="ME">ME</option>
                        <option value="MD">MD</option>
                        <option value="MA">MA</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MS">MS</option>
                        <option value="MO">MO</option>
                        <option value="MT">MT</option>
                        <option value="NE">NE</option>
                        <option value="NV">NV</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>
                        <option value="NY">NY</option>
                        <option value="NC">NC</option>
                        <option value="ND">ND</option>
                        <option value="OH">OH</option>
                        <option value="OK">OK</option>
                        <option value="OR">OR</option>
                        <option value="PA">PA</option>
                        <option value="RI">RI</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="TN">TN</option>
                        <option value="TX">TX</option>
                        <option value="UT">UT</option>
                        <option value="VT">VT</option>
                        <option value="VA">VA</option>
                        <option value="WA">WA</option>
                        <option value="WV">WV</option>
                        <option value="WI">WI</option>
                        <option value="WY">WY</option>
                      </select>

                      <div id="StateerrorMsg">Choose State!</div>
                    </div>
                  </div>

                  <div className="row g-2 my-2">
                    <div class="col-12 my-2">
                      <input
                        type="zip"
                        class="form-control"
                        id="zip"
                        placeholder="Postal Code"
                        name="zip"
                        readonly="readonly"
                        onBlur={validateZipFieldIsNotEmpty}
                        // onChange={(e) =>
                        //   setDetails({ ...details, Zip: e.target.value })
                        // }
                        value={details.Zip}
                      />
                      <div id="ZiperrorMsg">Enter a valid postal code!</div>
                    </div>

                    <div class="col-12 my-2">
                      <input
                        type="country"
                        class="form-control"
                        id="inputCountry"
                        placeholder="Country"
                        name="country"
                        value={details.Country}
                        readonly="readonly"
                        onChange={(e) =>
                          setDetails({ ...details, Country: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br></br>

            <div className="row g-2 my-2">
              <div className="col-md">
                <label for="noOfGuests">
                  How many guests would you like to welcome?
                </label>
              </div>
              <div className="col-md">
                <button
                  type="button"
                  className="value-button"
                  id="guestd"
                  onBlur={validateGuestFieldIsNotEmpty}
                  onClick={() => {
                    if (!validateIfNotNegativeGuest()) {
                      setDetails({ ...details, Guests: details.Guests - 1 });
                    }
                  }}
                  value="Decrease Value"
                >
                  -
                </button>
                <input
                  type="number"
                  id="guest"
                  name="guests"
                  value={details.Guests}
                  min={0}
                  max={10}
                  onBlur={validateGuestFieldIsNotEmpty}
                  onChange={(e) => {
                    if (!validateIfNotNegativeGuest()) {
                      setDetails({ ...details, Guests: e.target.value });
                    }
                  }}
                />
                <button
                  type="button"
                  className="value-button"
                  id="guesti"
                  onBlur={validateGuestFieldIsNotEmpty}
                  onClick={() => {
                    setDetails({ ...details, Guests: details.Guests + 1 });
                  }}
                  value="Increase Value"
                >
                  +
                </button>
                <div id="GuesterrorMsg">Choose number of guests!</div>
              </div>
            </div>
            <br></br>

            <div className="row g-2 my-2">
              <div className="col-md">
                <label for="noOfGuests">
                  How many beds would you like in your space?
                </label>
              </div>
              <div className="col-md">
                <button
                  type="button"
                  className="value-button"
                  id="bedd"
                  onBlur={validateBedsFieldIsNotEmpty}
                  onClick={() => {
                    if (!validateIfNotNegativeBed()) {
                      setDetails({ ...details, Beds: details.Beds - 1 });
                    }
                  }}
                  value="Decrease Value"
                >
                  -
                </button>
                <input
                  type="number"
                  id="bed"
                  value={details.Beds}
                  name="beds"
                  min={0}
                  max={10}
                  onBlur={validateBedsFieldIsNotEmpty}
                  onChange={(e) => {
                    if (!validateIfNotNegativeBed()) {
                      setDetails({ ...details, Beds: e.target.value });
                    }
                  }}
                />
                <button
                  type="button"
                  className="value-button"
                  id="bedi"
                  onBlur={validateBedsFieldIsNotEmpty}
                  onClick={() => {
                    setDetails({ ...details, Beds: details.Beds + 1 });
                  }}
                  value="Increase Value"
                >
                  +
                </button>
                <div id="BederrorMsg">Choose number of beds!</div>
              </div>
            </div>
            <br></br>

            <div className="row g-2 my-2">
              <div className="col-md">
                <label for="noOfGuests">
                  How many bathrooms would you like in your space?
                </label>
              </div>
              <div className="col-md">
                <span></span>
                <button
                  type="button"
                  className="value-button"
                  id="bathd"
                  onBlur={validateBathFieldIsNotEmpty}
                  onClick={() => {
                    if (!validateIfNotNegativeBath()) {
                      setDetails({
                        ...details,
                        Bathrooms: details.Bathrooms - 1,
                      });
                    }
                  }}
                  value="Decrease Value"
                >
                  -
                </button>
                <input
                  type="number"
                  id="bath"
                  value={details.Bathrooms}
                  min={0}
                  max={10}
                  name="bath"
                  onBlur={validateBathFieldIsNotEmpty}
                  onChange={(e) => {
                    validateIfNotNegativeBath();
                    setDetails({ ...details, Bathrooms: e.target.value });
                  }}
                />
                <button
                  type="button"
                  className="value-button"
                  id="bathi"
                  onBlur={validateBathFieldIsNotEmpty}
                  onClick={() => {
                    setDetails({
                      ...details,
                      Bathrooms: details.Bathrooms + 1,
                    });
                  }}
                  value="Increase Value"
                >
                  +
                </button>
                <div id="BatherrorMsg">Choose number of bathrooms!</div>
              </div>
            </div>
            <br></br>

            <label>What features do you have?</label>
            <br />
            <br />
            <div className="row">
              <div className="col-6">
                <input
                  type="checkbox"
                  id="feature1"
                  name="Wifi"
                  className="featureInput"
                  checked = {details.isWifi}
                  onChange={(e) =>
                    setDetails({ ...details, isWifi: e.target.checked })
                  }
                />
                <label for="feature1"> WiFi </label>
                <br /> <br />
                <input
                  type="checkbox"
                  id="feature2"
                  name="feature2"
                  className="featureInput"
                  checked = {details.ac}
                  onChange={(e) =>
                    setDetails({ ...details, ac: e.target.checked })
                  }
                />
                <label for="feature2"> AC </label>
                <br /> <br />
                <input
                  type="checkbox"
                  id="feature3"
                  name="feature3"
                  className="featureInput"
                  checked = {details.bar}
                  onChange={(e) =>
                    setDetails({ ...details, bar: e.target.checked })
                  }
                />
                <label for="feature3"> Bar </label>
                <br /> <br />
                <input
                  type="checkbox"
                  id="feature4"
                  name="feature4"
                  className="featureInput"
                  checked = {details.microwave}
                  onChange={(e) =>
                    setDetails({ ...details, microwave: e.target.checked })
                  }
                />
                <label for="feature4"> Microwave </label>
              </div>

              <div className="col-6">
                <input
                  type="checkbox"
                  id="feature5"
                  name="feature5"
                  className="featureInput"
                  checked = {details.fridge}
                  onChange={(e) =>
                    setDetails({ ...details, fridge: e.target.checked })
                  }
                />
                <label for="feature5"> Fridge </label>
                <br /> <br />
                <input
                  type="checkbox"
                  id="feature6"
                  name="feature6"
                  className="featureInput"
                  checked = {details.fireplace}
                  onChange={(e) =>
                    setDetails({ ...details, fireplace: e.target.checked })
                  }
                />
                <label for="feature6"> Fireplace </label>
                <br /> <br />
                <input
                  type="checkbox"
                  id="feature7"
                  name="feature7"
                  className="featureInput"
                  checked = {details.toaster}
                  onChange={(e) =>
                    setDetails({ ...details, toaster: e.target.checked })
                  }
                />
                <label for="feature7"> Toaster </label>
                <br /> <br />
                <input
                  type="checkbox"
                  id="feature8"
                  name="feature8"
                  className="featureInput"
                  checked = {details.tv}
                  onChange={(e) =>
                    setDetails({ ...details, tv: e.target.checked })
                  }
                />
                <label for="feature8"> TV </label>
              </div>
            </div>

            <br></br>

            <div className="row g-2 text-center justify-content-center my-4">
              <div className="col-2 subButton">
                <button type="button" className="btn btn-danger" id="signup" data-toggle="modal" data-target="#exampleModal" >
                  EDIT PROPERTY
                </button>
                <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Edit Property
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div id="modal-body" class="modal-body">Proceed to Edit Property?</div>
                        <div class="modal-footer">
                          <button id="cancelButton"
                            type="button"
                            class="btn btn-light"
                            data-dismiss="modal"
                          >
                            CLOSE
                          </button>
                          <button id="saveChanges" type="submit" class="btn btn-danger">
                            EDIT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProperty;
