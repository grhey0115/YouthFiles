import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { message } from 'antd';  
import { FaUser, FaGraduationCap, FaInfoCircle, FaAddressBook } from 'react-icons/fa';

// Import individual step components
import PersonalInformationStep from './Profiler/PersonalInformation';
import EducationalBackgroundStep from './Profiler/EducationalBackground';
import AdditionalInformationStep from './Profiler/AdditionalInformation';
import EmergencyContactStep from './Profiler/EmergencyContact';
import StepNavigation from './Profiler/StepIndicator';

const MultiStepForm = ({ 
  personalInfo, 
  educationalBackground, 
  additionalInformation, 
  emergencyContact 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState({
    front_id: null,
    back_id: null
  });

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
    is_registered_voter: additionalInformation?.is_registered_voter || '1', 
    attended_assembly: additionalInformation?.attended_assembly || '1', 
    why_no_assembly: additionalInformation?.why_no_assembly || '',
    residency_status: additionalInformation?.residency_status || 'Permanent',
    name: emergencyContact?.name || '',
    relationship: emergencyContact?.relationship || '',
    contact_number: emergencyContact?.contact_number || '',
    address: emergencyContact?.address || '',
  });

  const handleNextStep = (e) => {  
    e.preventDefault();  
    handleSubmit(e);  
    nextStep();  
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (name === 'date_of_birth') {
      const calculateAge = (dob) => {
        const diff = new Date() - new Date(dob);
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      };
      setData((prevData) => ({
        ...prevData,
        age: calculateAge(value),
      }));
    }
  };

  const handleFileChange = (file, fileType) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: file
    }));
  };

  const handleRemoveFile = (fileType) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: null
    }));
  };

  const handleTagChange = (newTags) => {
    setData(prevData => ({
      ...prevData,
      hobbies: newTags
    }));
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
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        // For arrays like hobbies, join them into a string or JSON stringify them
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    });

    if (currentStep === 4) {
      formData.append('profile_completed', true);
    }

    post(stepRoutes[currentStep - 1], formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onSuccess: () => {
        if (currentStep < 4) {
          nextStep();
        } else {
          message.success('Profile submitted successfully!', 2, () => {
            window.location.href = route('pending-approval');
          });
        }
      },
      onError: (errors) => {
        console.error('Submission Error:', errors);
        message.error('Failed to save profile information. Please try again.');
      },
    });
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const goToStep = (step) => setCurrentStep(step);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInformationStep 
            data={data}
            handleChange={handleChange}
            files={uploadedFiles}
            handleFileChange={handleFileChange}
            handleRemoveFile={handleRemoveFile}
            handleNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <EducationalBackgroundStep 
            data={data}
            handleChange={handleChange}
            handleNextStep={handleNextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <AdditionalInformationStep 
            data={data}
            handleChange={handleChange}
            handleTagChange={handleTagChange}
            handleNextStep={handleNextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <EmergencyContactStep 
            data={data}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            processing={processing}
          />
        );
      default:
        return null;
    }
  };

  return (  
    <div className="flex flex-col md:flex-row h-screen">  
      <StepNavigation  
        currentStep={currentStep}  
        goToStep={goToStep}  
      />  
      <div className="w-full max-w-4xl mx-auto mt-8 px-4 md:px-8">  
        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-2">
            Profile Completion Progress
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>
        {renderStep()}
      </div>  
    </div>  
  );
};

export default MultiStepForm;
