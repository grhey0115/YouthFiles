import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Inertia from '@inertiajs/inertia';
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
  const [files, setFiles] = useState([]);
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
    e.preventDefault();  
    const requiredFields = [  
     'barangay',  
     'sitio',  
     'date_of_birth',  
     'civil_status',  
     'gender',   
     'siblings', 
     'current_status', 
     
    ];  
    
    const emptyFields = requiredFields.filter((field) => !data[field]);  
    
    if (emptyFields.length > 0) {  
     message.error(`Please fill in the following required fields: ${emptyFields.join(', ')}`);  
     return;  
    }  
    
    // Check if date of birth is valid  
    const dateOfBirth = new Date(data.date_of_birth);  
    if (isNaN(dateOfBirth.getTime())) {  
     message.error('Please enter a valid date of birth');  
     return;  
    }  
    
    // Check if age is valid  
    if (data.age <= 0) {  
     message.error('Please enter a valid age');  
     return;  
    }  
    
    // Check if family members and siblings are valid numbers  
    if (data.family_members < 0 || data.siblings < 0) {  
     message.error('Please enter a valid number of family members and siblings');  
     return;  
    }  
    
    
    // If all validations pass, proceed to the next step  
    handleSubmit(e);  
    nextStep();  
  };
  

  // Shared methods
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Age calculation logic
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const stepRoutes = [
      '/profile-step1',
      '/profile-step2',
      '/profile-step3',
      '/profile-step4',
    ];

    const requiredFields = [  
      'name',  
      'relationship',  
      'contact_number',  
      'address',  
     ];  

     const emptyFields = requiredFields.filter((field) => !data[field]);  
  
  if (emptyFields.length > 0) {  
   message.error(`Please fill in the following required fields: ${emptyFields.join(', ')}`);  
   return;  
  }  
  
  // Validate name  
  const nameRegex = /^[a-zA-Z\s]+$/;  
  if (!nameRegex.test(data.name)) {  
   message.error('Please enter a valid name (letters and spaces only)');  
   return;  
  }  
  
  // Validate relationship  
  const relationshipRegex = /^[a-zA-Z\s]+$/;  
  if (!relationshipRegex.test(data.relationship)) {  
   message.error('Please enter a valid relationship (letters and spaces only)');  
   return;  
  }  
  
  // Validate contact number  
  const contactNumberRegex = /^\d{11}$/;  
  if (!contactNumberRegex.test(data.contact_number)) {  
   message.error('Please enter a valid contact number (11 digits)');  
   return;  
  }  
  
  // Validate address  
  const addressRegex = /^[a-zA-Z0-9\s,.-]+$/;  
  if (!addressRegex.test(data.address)) {  
   message.error('Please enter a valid address (letters, numbers, spaces, commas, periods, and hyphens only)');  
   return;  
  }  

    

    const formData = new FormData();
     // Append all form data
     Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      // Append files if they exist
    if (uploadedFiles.front_id) {
        formData.append('front_id', uploadedFiles.front_id);
      }
      if (uploadedFiles.back_id) {
        formData.append('back_id', uploadedFiles.back_id);
      }

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
       {renderStep()}  
     </div>  
    </div>  
  );
};

export default MultiStepForm;