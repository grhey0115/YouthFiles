import React from 'react';  
import { TagsInput } from 'react-tag-input-component';  
import { 
    FaBriefcase, 
    FaHeart, 
    FaWheelchair, 
    FaBalanceScale, 
    FaUsers, 
    FaVoteYea, 
    FaHandshake,
    FaHome,
    FaInfoCircle
  } from 'react-icons/fa';
  
const AdditionalInformation = ({ 
    data, 
    handleChange, 
    handleRemoveFile, 
    files, 
    prevStep,
    handleNextStep,
    handleSubmit,
    handleTagChange
  }) => {

  // Ensure radio button values are strings
  const radioValue = (value) => value?.toString() || '0';

  return (  
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-2">
        <FaInfoCircle className="text-blue-500" />
        Additional Information
      </h2>
      <p className="text-gray-600 text-center mb-8">Please provide additional details about yourself</p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Employment */}
        <div className="space-y-2 col-span-2">
            <label className="block text-sm font-medium text-gray-700">Currently Working?</label>
            <div className="flex space-x-4">
                <label>
                    <input
                        type="radio"
                        name="is_currently_working"
                        value="1"
                        onChange={handleChange}
                        checked={radioValue(data.is_currently_working) === '1'}
                        className="mr-2"
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        name="is_currently_working"
                        value="0"
                        onChange={handleChange}
                        checked={radioValue(data.is_currently_working) === '0'}
                        className="mr-2"
                    />
                    No
                </label>
            </div>
        </div>

        {/* Hobbies */}
        <div className="space-y-2 col-span-2">
            <label className="block text-sm font-medium text-gray-700">Hobbies</label>
            <TagsInput
                tags={data.hobbies || []}
                onChange={handleTagChange}
                placeholder="Enter your hobbies"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
          {/* Person with Disability */}
          <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Person with Disability</label>
              <div className="flex space-x-4">
                  <label>
                      <input
                          type="radio"
                          name="is_pwd"
                          value="1"
                          onChange={handleChange}
                          checked={radioValue(data.is_pwd) === '1'}
                          className="mr-2"
                      />
                      Yes
                  </label>
                  <label>
                      <input
                          type="radio"
                          name="is_pwd"
                          value="0"
                          onChange={handleChange}
                          checked={radioValue(data.is_pwd) === '0'}
                          className="mr-2"
                      />
                      No
                  </label>
              </div>
          </div>

          {/* Have Conflict with Law */}
          <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Have Conflict with Law</label>
              <div className="flex space-x-4">
                  <label>
                      <input
                          type="radio"
                          name="has_conflict_with_law"
                          value="1"
                          onChange={handleChange}
                          checked={radioValue(data.has_conflict_with_law) === '1'}
                          className="mr-2"
                      />
                      Yes
                  </label>
                  <label>
                      <input
                          type="radio"
                          name="has_conflict_with_law"
                          value="0"
                          onChange={handleChange}
                          checked={radioValue(data.has_conflict_with_law) === '0'}
                          className="mr-2"
                      />
                      No
                  </label>
              </div>
          </div>

          {/* Indigenous */}
          <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Indigenous</label>
              <div className="flex space-x-4">
                  <label>
                      <input
                          type="radio"
                          name="is_indigenous"
                          value="1"
                          onChange={handleChange}
                          checked={radioValue(data.is_indigenous) === '1'}
                          className="mr-2"
                      />
                      Yes
                  </label>
                  <label>
                      <input
                          type="radio"
                          name="is_indigenous"
                          value="0"
                          onChange={handleChange}
                          checked={radioValue(data.is_indigenous) === '0'}
                          className="mr-2"
                      />
                      No
                  </label>
              </div>
          </div>

          {/* Registered Voter */}
          <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Registered Voter</label>
              <div className="flex space-x-4">
                  <label>
                      <input
                          type="radio"
                          name="is_registered_voter"
                          value="1"
                          onChange={handleChange}
                          checked={radioValue(data.is_registered_voter) === '1'}
                          className="mr-2"
                      />
                      Yes
                  </label>
                  <label>
                      <input
                          type="radio"
                          name="is_registered_voter"
                          value="0"
                          onChange={handleChange}
                          checked={radioValue(data.is_registered_voter) === '0'}
                          className="mr-2"
                      />
                      No
                  </label>
              </div>
          </div>

          {/* Attended Assembly */}
          <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Attended Assembly</label>
              <div className="flex space-x-4">
                  <label>
                      <input
                          type="radio"
                          name="attended_assembly"
                          value="1"
                          onChange={handleChange}
                          checked={radioValue(data.attended_assembly) === '1'}
                          className="mr-2"
                      />
                      Yes
                  </label>
                  <label>
                      <input
                          type="radio"
                          name="attended_assembly"
                          value="0"
                          onChange={handleChange}
                          checked={radioValue(data.attended_assembly) === '0'}
                          className="mr-2"
                      />
                      No
                  </label>
              </div>
          </div>
      </div>

      {/* Reason for Not Attending Assembly */}
      {radioValue(data.attended_assembly) === '0' && (
          <div className="space-y-2 col-span-2">
              <label className="block text-sm font-medium text-gray-700">Why No Assembly</label>
              <textarea
                  name="why_no_assembly"
                  value={data.why_no_assembly || ''}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter reason if no assembly"
              />
          </div>
      )}

        {/* Residency Status */}
        <div className="space-y-2 col-span-2">
            <label className="block text-sm font-medium text-gray-700">Residency Status</label>
            <select
                name="residency_status"
                value={data.residency_status || 'Permanent'}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select Residency Status</option>
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
            </select>
        </div>

        <div className="flex mt-4 col-span-2">
            <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 mb-10 text-white px-4 py-2 rounded-lg flex-grow mr-2"
            >
                Previous
            </button>
            <button
                type="button"
                onClick={handleNextStep}
                className="bg-blue-500 mb-10 text-white px-4 py-2 rounded-lg flex-grow"
            >
                Next
            </button>
        </div>
    </form>
</div> 
  );  
};  
  
export default AdditionalInformation;