import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useState, useEffect } from "react";
import axios from "axios";

var url = 'http://localhost:5000'

const ShippingModal = ({ isOpen, closeModal, productDetails, setProductDetails, handleSubmit }) => {
  const options = ['Food', 'Clothes', 'Shoes', 'Mobile', 'Laptops', 'Toys', 'Appliances', 'Books'];
  const [done, setDone] = useState(false)

  useEffect(() => {
    console.log(done)
    //console.log(productDetails)
    if (done){
      console.log("sending request")
      const fetchData = async () => {
        const response = await axios.post(url+'/addItem', productDetails)
        console.log(response)
      }
      fetchData();
  }

  return () => setDone(false);
  }, [done]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Product Info
                </Dialog.Title>
                <div className="mt-2">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="dropdown">
                    <select value={productDetails.Product_Type} 
                    onChange={(event) => setProductDetails({...productDetails, Product_Type: event.target.value})}>
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  {Object.keys(productDetails).slice(1).map((key) => ( // Loop through keys
                    <div key={key}>
                      <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                        {key}: 
                      </label>
                      <input
                        id= {key}
                        name= {key}
                        type="text"
                        defaultValue=""
                        onChange={(e) => setProductDetails({...productDetails, [key]: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  ))}
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {setDone(true)}}
                      >
                        Enter
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShippingModal;
