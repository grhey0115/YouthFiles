import React from 'react';  
import { 
    FaUserCircle, 
    FaUserFriends, 
    FaPhone, 
    FaMapMarkerAlt,
    FaExclamationTriangle 
  } from 'react-icons/fa';


const EmergencyContact = ({ data, handleChange, handleSubmit, processing,prevStep, handlePrevStep }) => {  
  return (  
    <div className="w-full max-w-4xl mx-auto">
                     <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-2">
                        <FaExclamationTriangle className="text-red-500" />
                        Emergency Contact
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                        Please provide details of someone we can contact in case of emergency
                    </p>
                      <form onSubmit={handleSubmit} className="space-y-4">
                          {/* Name */}
                          <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Name</label>
                       
                              <input
                                  type="text"
                                  name="name"
                                  value={data.name}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Enter full name"
                                  required
                              />
                          </div>
          
                          {/* Relationship */}
                          <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Relationship</label>
                              <input
                                  type="text"
                                  name="relationship"
                                  value={data.relationship}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Enter relationship"
                                  required
                              />
                          </div>
          
                          {/* Contact Number */}
                          <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                              <input
                                  type="text"
                                  name="contact_number"
                                  value={data.contact_number}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Enter contact number"
                                  required
                              />
                          </div>
          
                          {/* Address */}
                          <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Address</label>
                              <input
                                  type="text"
                                  name="address"
                                  value={data.address}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Enter address"
                                  required
                              />
                          </div>
          
                          {/* Navigation Buttons */}
                          <div className="flex mt-4 col-span-2">
                              <button
                                  type="button"
                                  onClick={prevStep}
                                 className="bg-gray-500 text-white px-4 py-2 rounded-lg flex-grow mr-2"
                              >
                                  Previous
                              </button>
                              <button
                            type="submit" // Change to type="submit" to trigger the form submission
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex-grow "
                            disabled={processing}
                        >
                            {processing ? 'Processing...' : 'Submit'}
                        </button>
                          </div>
                      </form>
                  </div>
  );  
};  
  
export default EmergencyContact;
