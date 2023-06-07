import React, { useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext.js";
import { firestore } from "../../firebase.js";
import { useState } from "react";
import veggiexpress from "../../images/veggiexpresss.png";

function Address() {
  const { currentUser } = useAuth();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const db = firestore;

  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const countryRef = useRef(null);
  const postalRef = useRef(null);

  useEffect(() => {
    let street;
    let city;
    let country;
    let postalCode;
    async function GetAddressData() {
      const userRef = db.collection("users").doc(currentUser.uid);

      await userRef.get("Street").then((doc) => {
        street = doc.data()["Street"];
      });
      await userRef.get("City").then((doc) => {
        city = doc.data()["City"];
      });
      await userRef.get("Country").then((doc) => {
        country = doc.data()["Country"];
      });
      await userRef.get("PostalCode").then((doc) => {
        postalCode = doc.data()["PostalCode"];
      });

      setStreet(street);
      setCity(city);
      setCountry(country);
      setPostalCode(postalCode);
    }
    GetAddressData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const docRef = db.collection("users").doc(currentUser.uid);
      const newStreet = streetRef.current.value;
      const newCity = cityRef.current.value;
      const newPostal = postalRef.current.value;
      const newCountry = countryRef.current.value;
      const updatedData = {
        City: newCity,
        Country: newCountry,
        PostalCode: newPostal,
        Street: newStreet,
      };
      console.log(updatedData);
      await docRef.update(updatedData);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-screen h-screen">
      <a href="/">
        <img
          src={veggiexpress}
          alt="image not found"
          className="veggiexpress-login-image"
        />
      </a>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Address Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive your orders.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    ref={streetRef}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    ref={cityRef}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="country"
                    id="country"
                    autoComplete="address-level1"
                    ref={countryRef}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    ref={postalRef}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <a href="/dashboard">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
          </a>
          <button
            type="submit"
            className="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Address;
