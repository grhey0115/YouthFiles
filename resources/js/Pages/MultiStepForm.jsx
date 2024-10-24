import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { FaUser, FaGraduationCap, FaInfoCircle, FaAddressBook } from 'react-icons/fa';
import { TagsInput } from 'react-tag-input-component';
import { useEffect } from 'react';
import Inertia from '@inertiajs/inertia';


const MultiStepForm = ({ personalInfo, educationalBackground, additionalInformation, emergencyContact }) => {
 
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
 
  const { data, setData, post, processing } = useForm({
    barangay: personalInfo?.barangay || '',
    sitio: personalInfo?.sitio || '',
    religion: personalInfo?.religion || '',
    date_of_birth: personalInfo?.date_of_birth || '',
    age: personalInfo?.age || '',
    civil_status: personalInfo?.civil_status || '',
    is_solo_parent: personalInfo?.is_solo_parent || false,
    gender: personalInfo?.gender || '',
    family_members: personalInfo?.family_members || '',
    siblings: personalInfo?.siblings || '',
    valid_id_paths: personalInfo?.valid_id_paths || [],
    current_status: educationalBackground?.current_status || '',
    last_year_attended: educationalBackground?.last_year_attended || '',
    year_graduated: educationalBackground?.year_graduated || '',
    year_level: educationalBackground?.year_level || '',
    course: educationalBackground?.course || '',
    is_currently_working: additionalInformation?.is_currently_working || '0', 
    hobbies: additionalInformation?.hobbies || [],
    is_pwd: additionalInformation?.is_pwd || '0', 
    has_conflict_with_law: additionalInformation?.has_conflict_with_law || '0', 
    is_indigenous: additionalInformation?.is_indigenous || '0', 
    is_registered_voter: additionalInformation?.is_registered_voter || '0', 
    attended_assembly: additionalInformation?.attended_assembly || '1', 
    why_no_assembly: additionalInformation?.why_no_assembly || '',
    residency_status: additionalInformation?.residency_status || 'Permanent',
    name: emergencyContact?.name || '',
    relationship: emergencyContact?.relationship || '',
    contact_number: emergencyContact?.contact_number || '',
    address: emergencyContact?.address || '',
});

   

    const handleNextStep = (e) => {
        handleSubmit(e);
        nextStep();
    };
  const handleTagChange = (tags) => {
    setData({ ...data, hobbies: tags });
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    // For checkbox input, handle true/false values
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value,
    });
  
    // Calculate age when the date of birth changes
    if (name === 'date_of_birth') {
      const calculateAge = (dob) => {
        const diff = new Date() - new Date(dob);
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      };
  
      const age = calculateAge(value);
      setData((prevData) => ({
        ...prevData,
        age: age,
      }));
    }
  };

  console.log('Date of Birth:', data.date_of_birth);
  console.log('age:', data.Age);
  
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const uploadedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stepRoutes = [
        '/profile-step1',
        '/profile-step2',
        '/profile-step3',
        '/profile-step4',
    ];
  
    const formData = new FormData();
    files.forEach((file, index) => {
        formData.append(`valid_id_paths[${index}]`, file); // Append files
    });

   
    
  
    // Append all data to formData
    Object.keys(data).forEach((key) => {
        if (key !== 'valid_id_paths') {
            formData.append(key, data[key]);
        }
    });

    console.log('Files:', files); // Debugging: Check what files are being uploaded
    console.log('FormData:', formData); // Debugging: Check formData content
  
    post(stepRoutes[currentStep - 1], formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
      onSuccess: () => {
          if (currentStep < 4) {
              nextStep();
          } else {
            Inertia.visit(route('profile.view'));
          }
      },
      onError: (errors) => {
          console.error('Submission Error:', errors);
          // Optionally display the errors to the user
      },
  });
};
  const barangays = [
    'Casay'
  ];


  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
       
          <div className="w-full max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                    <p className="text-sm mb-6">Please fill up the necessary Information</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Barangay */}
                        <div className="flex space-x-4">
                        <select
                            name="barangay"
                            value={data.barangay}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Barangay</option>
                            {barangays.map((barangay, index) => (
                            <option key={index} value={barangay}>
                                {barangay}
                            </option>
                            ))}
                        </select>

                        {/* Sitio */}
                        <input
                            type="text"
                            name="sitio"
                            placeholder="Sitio"
                            value={data.sitio}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        </div>
                        <div className="flex space-x-4">
                        {/* Date of Birth */}
                        <div className="relative">
                            <label htmlFor="date_of_birth" className="absolute left-4 top-2 text-gray-500">
                            Birth Date
                            </label>
                            <input
                            type="date"
                            name="date_of_birth"
                            id="date_of_birth"
                            value={data.date_of_birth}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ paddingTop: '1.5rem' }}
                            />
                        </div>

                        {/* Age */}
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={data.age}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        </div>
                        {/* Religion */}
                        <input
                            type="text"
                            name="religion"
                            placeholder="Religion"
                            value={data.religion}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex space-x-4">
                        {/* Civil Status */}
                        <select
                            name="civil_status"
                            value={data.civil_status}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Civil Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="widowed">Widowed</option>
                            <option value="divorced">Divorced</option>
                        </select>

                         {/* Gender */}
                         <select
                            name="gender"
                            value={data.gender}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        </div>
                        {/* Solo Parent */}
                        <div className="flex space-x-4">
                            <label className="mr-2">Are you a solo parent?</label>
                            <label className="mr-4">
                            <input
                                type="radio"
                                name="is_solo_parent"
                                value={true}
                                checked={data.is_solo_parent === true}
                                onChange={handleChange}
                                className="mr-1"
                            />
                            YES
                            </label>
                            <label>
                            <input
                                type="radio"
                                name="is_solo_parent"
                                value={false}
                                checked={data.is_solo_parent === false}
                                onChange={handleChange}
                                className="mr-1"
                            />
                            NO
                            </label>
                        </div>

                       

                        {/* Number of Family Members and Siblings */}
                        <div className="flex space-x-4">
                            <input
                            type="number"
                            name="family_members"
                            placeholder="No. of Family Members"
                            value={data.family_members}
                            onChange={handleChange}
                            disabled={!(data.civil_status === 'married' || data.is_solo_parent || data.civil_status === 'widowed')}
                            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                            type="number"
                            name="siblings"
                            placeholder="No. of Siblings"
                            value={data.siblings}
                            onChange={handleChange}
                            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Valid IDs</label>
                <div
                  className={`border-2 border-dashed ${dragging ? 'border-blue-500' : 'border-gray-300'} rounded-lg p-6 flex flex-col items-center ${dragging ? 'bg-gray-100' : ''}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v6a1 1 0 001 1h16a1 1 0 001-1V7M5 3h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zM10 14l2 2 4-4" />
                    </svg>
                    <input
                      type="file"
                      name="valid_id_paths"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      multiple
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-white border border-gray-300 rounded-md py-2 px-4 inline-flex items-center text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    >
                      Choose files
                    </label>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG & PDF</p>
                    {files.length > 0 && (
                      <div className="text-xs text-gray-700 mt-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                              {file.name}
                              <button
                                type="button"
                                className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
                                onClick={() => handleRemoveFile(index)}
                              >
                                <span className="sr-only">Remove</span>
                                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75">
                                  <path d="M4 4l6 6m0-6l-6 6" />
                                </svg>
                                <span className="absolute -inset-1" />
                              </button>
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex mt-4 col-span-2">
                            
                            <button
                                type="button"
                                onClick={handleNextStep}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex-grow"
                            >
                                Next
                            </button>
                        </div>
            </form>
            
          </div>
          
        );
      case 2:
        return (
          <div>
              <h2 className="text-xl font-bold mb-4">Educational Background</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                          Current Status
                      </label>
                      <div className="flex space-x-4">
                          <label>
                              <input
                                  type="radio"
                                  name="current_status"
                                  value="student"
                                  onChange={handleChange}
                                  checked={data.current_status === 'student'}
                                  className="mr-2"
                              />
                              Student
                          </label>
                          <label>
                              <input
                                  type="radio"
                                  name="current_status"
                                  value="graduate"
                                  onChange={handleChange}
                                  checked={data.current_status === 'graduate'}
                                  className="mr-2"
                              />
                              Graduate
                          </label>
                          <label>
                              <input
                                  type="radio"
                                  name="current_status"
                                  value="out_of_school_youth"
                                  onChange={handleChange}
                                  checked={data.current_status === 'out_of_school_youth'}
                                  className="mr-2"
                              />
                              Out of School Youth
                          </label>
                      </div>
                  </div>

                  {data.current_status === 'student' && (
                      <>
                          <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                  Year Level
                              </label>
                              <input
                                  type="text"
                                  name="year_level"
                                  placeholder="e.g., 3rd Year"
                                  value={data.year_level}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                          <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                  Course
                              </label>
                              <select
                                  name="course"
                                  value={data.course}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                  <option value="">Select Course</option>
                                  <option value="junior_highschool">Junior Highschool</option>
                                  <option value="senior_highschool_gas">Senior Highschool - GAS</option>
                                  <option value="senior_highschool_abm">Senior Highschool - ABM</option>
                                  <option value="senior_highschool_humms">Senior Highschool - HUMMS</option>
                                  <option value="senior_highschool_stem">Senior Highschool - STEM</option>
                                  <option value="bsit">BS Information Technology</option>
                                  <option value="bscs">BS Computer Science</option>
                                  <option value="bsba">BS Business Administration</option>
                              </select>
                          </div>
                      </>
                  )}

                  {data.current_status === 'graduate' && (
                      <>
                          <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                  Course
                              </label>
                              <input
                                  type="text"
                                  name="course"
                                  value={data.course}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                          <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                  Year Graduated
                              </label>
                              <input
                                  type="text"
                                  name="year_graduated"
                                  value={data.year_graduated}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                      </>
                  )}

                  {data.current_status === 'out_of_school_youth' && (
                      <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                              Last Year Attended
                          </label>
                          <input
                              type="number"
                              name="last_year_attended"
                              value={data.last_year_attended}
                              onChange={handleChange}
                              min="1900"
                              max={new Date().getFullYear()}
                              placeholder="e.g., 2020"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                  )}

            <div className="flex mt-4">
                        <button
                            type="button"
                            onClick={prevStep}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg flex-grow mr-2" // Use flex-grow for equal space
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            onClick={handleNextStep}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex-grow" // Use flex-grow for equal space
                        >
                            Next
                        </button>
                    </div>
                    </form>
          </div>
          
        );
        case 3:
            return (
                <div className="w-full max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold mb-4">Additional Information</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Current Employment */}
                        <div className="space-y-2 col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Currently Working</label>
                            <div className="flex space-x-4">
                                <label>
                                    <input
                                        type="radio"
                                        name="is_currently_working"
                                        value="1"
                                        onChange={handleChange}
                                        checked={data.is_currently_working === '1'}
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
                                        checked={data.is_currently_working === '0'}
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
                                tags={data.hobbies}
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
                                          checked={data.is_pwd === '1'}
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
                                          checked={data.is_pwd === '0'}
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
                                          checked={data.has_conflict_with_law === '1'}
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
                                          checked={data.has_conflict_with_law === '0'}
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
                                          checked={data.is_indigenous === '1'}
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
                                          checked={data.is_indigenous === '0'}
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
                                          checked={data.is_registered_voter === '1'}
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
                                          checked={data.is_registered_voter === '0'}
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
                                          checked={data.attended_assembly === '1'}
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
                                          checked={data.attended_assembly === '0'}
                                          className="mr-2"
                                      />
                                      No
                                  </label>
                              </div>
                          </div>
                      </div>

                      {/* Reason for Not Attending Assembly */}
                      {data.attended_assembly === '0' && (
                          <div className="space-y-2 col-span-2">
                              <label className="block text-sm font-medium text-gray-700">Why No Assembly</label>
                              <textarea
                                  name="why_no_assembly"
                                  value={data.why_no_assembly}
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
                                value={data.residency_status}
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
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg flex-grow mr-2"
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={handleNextStep}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex-grow"
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            );
            case 4:
              return (
                  <div className="w-full max-w-sm mx-auto">
                      <h2 className="text-xl font-bold mb-4">Emergency Contact</h2>
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
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Steps (Hidden on small screens) */}
      <div className="hidden md:flex md:w-1/3 bg-gradient-to-r from-gray-700 to-red-500 text-white flex-col justify-center items-start text-white py-10 px-4 space-y-8">
        <div className="flex items-center cursor-pointer" onClick={() => goToStep(1)}>
          <div className={`flex items-center justify-center w-12 h-12 ml-28 border-2 ${currentStep >= 1 ? 'bg-green-500' : 'border-white'} rounded-full`}>
            <FaUser />
          </div>
          <span className="ml-4">Personal Information</span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={() => goToStep(2)}>
          <div className={`flex items-center justify-center w-12 h-12 ml-28 border-2 ${currentStep >= 2 ? 'bg-green-500' : 'border-white'} rounded-full`}>
            <FaGraduationCap />
          </div>
          <span className="ml-4">Educational Background</span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={() => goToStep(3)}>
          <div className={`flex items-center justify-center w-12 h-12 ml-28 border-2 ${currentStep >= 3 ? 'bg-green-500' : 'border-white'} rounded-full`}>
            <FaInfoCircle />
          </div>
          <span className="ml-4">Additional Information</span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={() => goToStep(4)}>
          <div className={`flex items-center justify-center w-12 h-12 ml-28 border-2 ${currentStep >= 4 ? 'bg-green-500' : 'border-white'} rounded-full`}>
            <FaAddressBook />
          </div>
          <span className="ml-4">Emergency Contact</span>
        </div>
      </div>

      {/* Right Side - Form */}
            <div className="w-full max-w-sm mx-auto mt-8 ">
            {renderStep()}

            <div className="flex justify-between mt-6">
                
            </div>
        </div>
    </div>
);
};

export default MultiStepForm;

