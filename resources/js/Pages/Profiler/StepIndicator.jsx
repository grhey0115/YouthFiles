import React from 'react';  
import { 
  FaUser, 
  FaGraduationCap, 
  FaInfoCircle, 
  FaAddressBook,
  FaCheck 
} from 'react-icons/fa';  
  
const StepIndicator = ({ currentStep, setCurrentStep, completedSteps = [] }) => {  
  const steps = [  
    { 
      icon: FaUser, 
      label: 'Personal Information',
      description: 'Basic details and contact info'
    },  
    { 
      icon: FaGraduationCap, 
      label: 'Educational Background',
      description: 'Academic history and achievements'
    },  
    { 
      icon: FaInfoCircle, 
      label: 'Additional Information',
      description: 'Other important details'
    },  
    { 
      icon: FaAddressBook, 
      label: 'Emergency Contact',
      description: 'Contact person details'
    },  
  ];  
  
  const getStepStatus = (index) => {
    if (completedSteps.includes(index + 1)) return 'completed';
    if (currentStep === index + 1) return 'current';
    if (currentStep > index + 1) return 'completed';
    return 'pending';
  };

  const calculateProgress = () => {
    const totalSteps = steps.length;
    const completedCount = completedSteps.length;
    return Math.round((completedCount / totalSteps) * 100);
  };

  return (  
    <div className="h-full bg-gradient-to-br from-red-400 via-blue-500 to-yellow-400 text-white flex-col justify-between relative overflow-hidden">  
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/images/sk-logo.png')] opacity-5 bg-center bg-no-repeat bg-contain" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="w-full p-8 flex-1 flex flex-col relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">SK Profile Setup</h2>
          <p className="text-gray-200">Complete all steps to finish your profile</p>
        </div>

        <div className="flex-1 space-y-8">
          {steps.map((step, index) => (  
            <div 
              key={index} 
              className={`
                relative flex items-center cursor-pointer group
                transition-all duration-300 ease-in-out
                ${getStepStatus(index) === 'pending' ? 'opacity-60 hover:opacity-80' : 'opacity-100'}
                hover:translate-x-2
              `}
              onClick={() => completedSteps.includes(index + 1) && setCurrentStep(index + 1)}
            >  
              {/* Connector Line */}
              {index !== 0 && (
                <div 
                  className={`
                    absolute top-0 -translate-y-full left-6 w-0.5 h-8
                    transition-colors duration-300
                    ${getStepStatus(index - 1) === 'completed' ? 'bg-yellow-400' : 'bg-gray-600'}
                  `}
                />
              )}

              {/* Step Icon */}
              <div 
                className={`
                  flex items-center justify-center w-12 h-12 rounded-full
                  transition-all duration-300 ease-in-out
                  ${getStepStatus(index) === 'completed' 
                    ? 'bg-yellow-500 text-blue-900' 
                    : getStepStatus(index) === 'current'
                      ? 'bg-red-500 text-white ring-4 ring-red-300/50'
                      : 'bg-gray-700 text-gray-400'}
                  ${completedSteps.includes(index + 1) ? 'hover:scale-110' : ''}
                  shadow-lg
                `}
              >
                {getStepStatus(index) === 'completed' ? (
                  <FaCheck className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>  

              {/* Step Content */}
              <div className="ml-4">
                <h3 className={`
                  font-medium text-lg transition-colors duration-300
                  ${getStepStatus(index) === 'current' ? 'text-yellow-300' : 'text-white'}
                `}>
                  {step.label}
                </h3>
                <p className="text-sm text-gray-200 mt-0.5">
                  {step.description}
                </p>
              </div>

              {/* Current Step Indicator */}
              {getStepStatus(index) === 'current' && (
                <div className="absolute left-6 -translate-x-1/2 top-full mt-2">
                  <div className="w-0.5 h-16 bg-red-500/20">
                    <div className="w-full h-1/2 bg-red-500 animate-pulse" />
                  </div>
                </div>
              )}
            </div>  
          ))}
        </div>

        {/* Progress Bar at the bottom */}
        <div className="mt-auto pt-8">
          <div className="bg-black/20 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-yellow-400 h-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
          <p className="text-center text-sm mt-2 text-gray-200">
            {calculateProgress()}% Complete
          </p>
        </div>
      </div>
    </div>  
  );  
};  
  
export default StepIndicator;