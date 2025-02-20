import React from 'react'
import {  FaClipboardCheck } from "react-icons/fa";

const InquiryForm = () => {
  return (
    <div>
        <section className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-101">
                                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <FaClipboardCheck className="text-green-600" /> Admission Form
                                    </h2>
                                    <form>
                                        <fieldset className="border border-gray-300 p-4 rounded-lg">
                                            <legend className="text-lg font-semibold text-gray-700 px-2">
                                                Student Details
                                            </legend>
                                            <div className="mb-4">
                                                <label className="block font-medium text-gray-700">Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    placeholder="Enter your name"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block font-medium text-gray-700">Course</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    placeholder="Enter your course"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block font-medium text-gray-700">Email</label>
                                                <input
                                                    type="email"
                                                    className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block font-medium text-gray-700">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    placeholder="Enter your phone number"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                Submit
                                            </button>
                                        </fieldset>
                                    </form>
                                </section>
      
    </div>
  )
}

export default InquiryForm
