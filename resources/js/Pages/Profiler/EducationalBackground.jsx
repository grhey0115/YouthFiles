import React from 'react';
import { FaUserGraduate, FaSchool, FaCalendarAlt, FaBookReader, FaUserClock } from 'react-icons/fa';

const EducationalBackground = ({ 
  data, 
  handleChange, 
  prevStep,
  handleNextStep,
  handleSubmit 
}) => {
  const inputClasses = "w-full pl-12 pr-4 py-3 md:py-4 text-base md:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClasses = "block text-base md:text-lg font-medium text-gray-700 mb-2";
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-2">
        <FaUserGraduate className="text-blue-500" />
        Educational Background
      </h2>
      <p className="text-gray-600 text-center mb-8">Please provide your educational information</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className={labelClasses}>Current Status</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="current_status"
                value="student"
                onChange={handleChange}
                checked={data.current_status === 'student'}
                className="mr-3 h-5 w-5 text-blue-500"
              />
              <FaUserGraduate className="mr-2 text-blue-500" />
              Student
            </label>
            <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="current_status"
                value="graduate"
                onChange={handleChange}
                checked={data.current_status === 'graduate'}
                className="mr-3 h-5 w-5 text-blue-500"
              />
              <FaSchool className="mr-2 text-blue-500" />
              Graduate
            </label>
            <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="current_status"
                value="out_of_school_youth"
                onChange={handleChange}
                checked={data.current_status === 'out_of_school_youth'}
                className="mr-3 h-5 w-5 text-blue-500"
              />
              <FaUserClock className="mr-2 text-blue-500" />
              Out of School Youth
            </label>
          </div>
        </div>

        {data.current_status === 'student' && (
          <>
            <div className="relative">
              <label className={labelClasses}>Year Level</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-[35px] md:top-[40px]">
                <FaCalendarAlt className="text-gray-400 text-lg md:text-xl" />
              </div>
              <input
                type="text"
                name="year_level"
                value={data.year_level}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div className="relative">
              <label className={labelClasses}>Course</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-[35px] md:top-[40px]">
                <FaBookReader className="text-gray-400 text-lg md:text-xl" />
              </div>
              <select
                name="course"
                value={data.course}
                onChange={handleChange}
                className={inputClasses}
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
            <div className="relative">
              <label className={labelClasses}>Course</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-[35px] md:top-[40px]">
                <FaBookReader className="text-gray-400 text-lg md:text-xl" />
              </div>
              <input
                type="text"
                name="course"
                value={data.course}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div className="relative">
              <label className={labelClasses}>Year Graduated</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-[35px] md:top-[40px]">
                <FaCalendarAlt className="text-gray-400 text-lg md:text-xl" />
              </div>
              <input
                type="text"
                name="year_graduated"
                value={data.year_graduated}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </>
        )}

        {data.current_status === 'out_of_school_youth' && (
          <div className="relative">
            <label className={labelClasses}>Last Year Attended</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-[35px] md:top-[40px]">
              <FaCalendarAlt className="text-gray-400 text-lg md:text-xl" />
            </div>
            <input
              type="number"
              name="last_year_attended"
              value={data.last_year_attended}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
              className={inputClasses}
            />
          </div>
        )}

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
};

export default EducationalBackground;