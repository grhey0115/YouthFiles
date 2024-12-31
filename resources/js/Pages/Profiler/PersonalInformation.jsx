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
  const barangays = ['Casay'];
  const [files, setFiles] = useState({
    front_id: null,
    back_id: null
  });

  const handleFileChange = (file, fileType) => {
    setFiles(prev => ({
      ...prev,
      [fileType]: file
    }));
    if (typeof handleFileUpload === 'function') {
      handleFileUpload(file, fileType);
    }
  };

  const handleRemoveFile = (fileType) => {
    setFiles(prev => ({
      ...prev,
      [fileType]: null
    }));
  };

  

  return (
 
    <div >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <FaUser className="text-blue-500" />
          Personal Information
        </h2>
            <p className="text-gray-600 flex items-center justify-center gap-1 mt-2 mb-10" >
              <IoMdInformationCircleOutline className="text-blue-400" />
              Please fill up the necessary information
            </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Barangay */}
                         {/* Barangay and Sitio */}
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
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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

        {/* Family Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Family Members</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUsers className="text-gray-400" />
            </div>
            <input
              type="number"
              name="family_members"
              value={data.family_members}
              onChange={handleChange}
              disabled={!(data.civil_status === 'married' || data.is_solo_parent || data.civil_status === 'widowed')}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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
                     {/*  <FileUploader 
                          name="front_id"
                          label="Upload Front ID"
                          files={files}
                          dragging={dragging}
                          setDragging={setDragging}
                          handleFileChange={handleFileChange}
                          handleRemoveFile={handleRemoveFile}
                        />

                        <FileUploader 
                          name="back_id"
                          label="Upload Back ID"
                          files={files}
                          dragging={dragging}
                          setDragging={setDragging}
                          handleFileChange={handleFileChange}
                          handleRemoveFile={handleRemoveFile}
                        />*/} 

      
        <div className="flex mt-4 col-span-2">
        <button
          type="button"
          onClick={handleNextStep}
          disabled={!data.barangay || !data.date_of_birth || !data.age || !data.gender || !data.civil_status}
          className={`px-4 py-2 rounded-lg flex-grow mb-6 ${!data.barangay || !data.date_of_birth || !data.age || !data.gender || !data.civil_status ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
        >
          Next
        </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformationStep;