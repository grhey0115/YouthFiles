import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import FileUploader from './FileUploader';
import { message } from 'antd';  
import { Head, Link } from '@inertiajs/react';
import { 
    FaUser, 
    FaMapMarkerAlt, 
    FaBirthdayCake, 
    FaPray, 
    FaRing, 
    FaVenusMars,
    FaUsers,
    FaUserFriends,
    FaIdCard
} from 'react-icons/fa';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const PersonalInformationStep = ({ 
  data, 
  handleChange, 
  handleSubmit,
  handleDrop,
  handleNextStep,
  handleDragOver,
  handleDragLeave,
}) => {
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const barangays = ['Casay'];
  const [files, setFiles] = useState({
    front_id: null,
    back_id: null
  });

  const validateFamilyMembers = (value) => {
    if (value < (data.is_solo_parent ? 2 : 1)) {
      setErrors({
        ...errors,
        family_members: data.is_solo_parent
          ? 'A solo parent must have at least 2 family members.'
          : 'Must be at least 1 family member.',
      });
    } else {
      setErrors({ ...errors, family_members: '' });
    }
  };


  const validateAge = (age) => {
    if (age < 15 || age > 30) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: 'Age must be between 15 and 30.',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: '',
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'age') {
      validateAge(value);
    }

    handleChange(e); // Call the parent's change handler
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
        <FaUser className="text-blue-500" />
        Personal Information
      </h2>
      <p className="text-gray-600 flex items-center justify-center gap-1 mt-2 mb-10">
        <IoMdInformationCircleOutline className="text-blue-400" />
        Please fill up the necessary information
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Barangay */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Barangay</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="text-gray-400" />
            </div>
            <select
              name="barangay"
              value={data.barangay}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select Barangay</option>
              {barangays.map((barangay, index) => (
                <option key={index} value={barangay}>{barangay}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sitio</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="text-gray-400" />
            </div>
            <input
              type="text"
              name="sitio"
              value={data.sitio}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Birth Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaBirthdayCake className="text-gray-400" />
            </div>
            <input
              type="date"
              name="date_of_birth"
              value={data.date_of_birth}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              type="number"
              name="age"
              value={data.age}
              onChange={handleInputChange}
              required
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.age ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>
        </div>

        {/* Religion */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaPray className="text-gray-400" />
          </div>
          <input
            type="text"
            name="religion"
            value={data.religion}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Civil Status</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaRing className="text-gray-400" />
            </div>
            <select
              name="civil_status"
              value={data.civil_status}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Civil Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widowed">Widowed</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaVenusMars className="text-gray-400" />
            </div>
            <select
              name="gender"
              value={data.gender}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Parent Checkbox */}
        <div className="relative flex items-center mt-4">
          <input
            type="checkbox"
            id="is_parent"
            name="is_parent"
            checked={data.is_parent}
            onChange={handleChange}
            className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="is_parent" className="ml-2 text-sm font-medium text-gray-700">
            Are you a Parent?
          </label>
        </div>

        {/* Solo Parent and Live In checkboxes, visible only if "Are you a Parent?" is checked */}
        {data.is_parent && (
          <div className="ml-6">
            {/* Solo Parent Checkbox */}
            <div className="relative flex items-center mt-4">
              <input
                type="checkbox"
                id="is_solo_parent"
                name="is_solo_parent"
                checked={data.is_solo_parent}
                onChange={handleChange}
                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="is_solo_parent" className="ml-2 text-sm font-medium text-gray-700">
                Are you a Solo Parent?
              </label>
            </div>

            {/* Live In Checkbox */}
           
          </div>
        )}

        {/* Family Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Family Members</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUsers className="text-gray-400" />
            </div>
            <input
              type="number"
              name="family_members"
              value={data.family_members}
              onChange={(e) => {
                handleChange(e);
                validateFamilyMembers(e.target.value);
              }}
              disabled={!data.is_parent}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                !data.is_parent 
                  ? 'disabled:bg-gray-100' 
                  : 'focus:ring-blue-500'
              }`}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Siblings</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUserFriends className="text-gray-400" />
            </div>
            <input
              type="number"
              name="siblings"
              value={data.siblings}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        
        <div className="flex mt-4 col-span-2">
        <button
            type="button"
            onClick={handleNextStep}
            disabled={!!errors.age || !data.barangay || !data.date_of_birth || !data.age || !data.gender || !data.civil_status}
            className={`px-4 py-2 rounded-lg flex-grow mb-6 ${
              !!errors.age || !data.barangay || !data.date_of_birth || !data.age || !data.gender || !data.civil_status
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white'
            }`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformationStep;
