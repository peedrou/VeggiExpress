import React from "react";
import { useState, useEffect, Fragment } from "react";
import { useAuth } from "../../contexts/AuthContext.js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firebase.js";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const methods = [
  {
    id: 1,
    name: "Paypal",
    avatar: process.env.PUBLIC_URL + "/paypal.svg",
  },
  {
    id: 2,
    name: "Card",
    avatar: process.env.PUBLIC_URL + "/credit-card.png",
  },
  {
    id: 3,
    name: "Apple Pay",
    avatar: process.env.PUBLIC_URL + "/apple-pay.svg",
  },
  {
    id: 4,
    name: "Google Pay",
    avatar: process.env.PUBLIC_URL + "/google-pay.svg",
  },
  {
    id: 5,
    name: "Bitcoin",
    avatar: process.env.PUBLIC_URL + "/bitcoin.svg",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function PaymentMethod() {
  const [selected, setSelected] = useState(methods[3]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="mt-8 text-start block text-sm font-medium leading-6 text-gray-900">
            Payment Method
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <img
                  src={selected.avatar}
                  alt=""
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {methods.map((method) => (
                  <Listbox.Option
                    key={method.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={method}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={method.avatar}
                            alt=""
                            className="h-5 w-5 flex-shrink-0 rounded-full"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {method.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

function Order() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [finalAddress, setFinalAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [product, setProduct] = useState("");
  const [loadError, setLoadError] = useState(false);
  const db = firestore;
  const location = useLocation();
  const finalPrice = new URLSearchParams(location.search).get("value");
  const finalProduct = new URLSearchParams(location.search).get("product");

  useEffect(() => {
    if (finalPrice == 2.99 || finalPrice == 4.99) {
      setPrice(finalPrice);
    } else {
      setPrice("Do not alter the URL");
    }
  }, []);

  useEffect(() => {
    setProduct(finalProduct);
  }, []);

  useEffect(() => {
    async function fullAddress() {
      let street;
      let city;
      let country;
      let postalCode;
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

      setFinalAddress(`${street}, ${postalCode} ${city}, ${country}`);
      console.log(finalAddress);
      if (`${street}, ${postalCode} ${city}, ${country}` == `,  , `) {
        setFinalAddress("Please go to your dashboard and update your address");
      } else {
        setFinalAddress(`${street}, ${postalCode} ${city}, ${country}`);
      }
    }
    fullAddress();
  }, []);

  useEffect(() => {
    setProduct(finalProduct);
  }, []);

  async function completeOrder() {
    try {
      const docRef = db.collection("users").doc(currentUser.uid);
      const updatedData = { Order: product };
      await docRef.update(updatedData);
      navigate({
        pathname: "/dashboard",
        search: `?status=success`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <form className="mt-12" onSubmit={() => completeOrder()}>
          <section aria-labelledby="summary-heading" className="mt-10">
            <div className="mb-4">
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Email</dt>
                </div>
              </dl>
              <p className="text-start mt-1 text-sm text-gray-500">
                {currentUser.email}
              </p>
            </div>

            <div className="mb-4">
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">
                    Address
                  </dt>
                </div>
              </dl>
              <p className="text-start mt-1 text-sm text-gray-500">
                {finalAddress}
              </p>
            </div>

            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">
                    Subtotal
                  </dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">
                    ${finalPrice}
                  </dd>
                </div>
              </dl>
              <p className="text-start mt-1 text-sm text-gray-500">{product}</p>
            </div>
            <PaymentMethod />
            <div className="mt-10">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-green-700 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>

            <div className="mt-6 text-center text-sm">
              <p>
                or
                <a
                  href="/"
                  className="pl-2 font-medium text-green-700 hover:text-yellow-600"
                >
                  return home
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

export default Order;
