import React, { useEffect } from 'react';  
  
const FileUploader = ({  
  name,  
  label,  
  files,  
  dragging,  
  setDragging,  
  handleDrop,  
  handleFileChange,
  handleRemoveFile  
}) => {  
  
  const preventDefaults = (e) => {  
    e.preventDefault();  
    e.stopPropagation();  
  };  
  
  const handleDragOver = (e) => {  
    preventDefaults(e);  
    if (!dragging) {  
      setDragging(true);  
    }  
  };  
  
  const handleDragLeave = (e) => {  
    preventDefaults(e);  
    setDragging(false);  
  };  
  
  const onDrop = (e) => {  
    preventDefaults(e);  
    setDragging(false);  
    
    const droppedFile = e.dataTransfer.files[0];  
    if (droppedFile) {  
      handleFileChange(droppedFile, name);  
      handlePreview(droppedFile);
    }  
  };  
  
  const handlePreview = (file) => {  
    if (file) {  
      const reader = new FileReader();  
      reader.onload = () => {  
        const previewImage = document.getElementById(`preview-${name}`);  
        if (previewImage) {
          previewImage.src = reader.result;  
        }
      };  
      reader.readAsDataURL(file);  
    }  
  };

  // Clear preview when file is removed
  useEffect(() => {
    if (!files[name]) {
      const previewImage = document.getElementById(`preview-${name}`);
      if (previewImage) {
        previewImage.src = '';
      }
    }
  }, [files, name]);
  
  return (  
    <div className="mb-4">  
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>  
      <div  
        className={`border-2 border-dashed ${  
          dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'  
        } rounded-lg p-6 flex flex-col items-center transition-colors duration-200`}  
        onDrop={onDrop}  
        onDragOver={handleDragOver}  
        onDragEnter={handleDragOver}  
        onDragLeave={handleDragLeave}  
      >  
        <div className="text-center">  
          <input  
            type="file"  
            name={name}  
            accept="image/*,application/pdf"  
            onChange={(e) => {  
              const file = e.target.files[0];
              handleFileChange(file, name);  
              handlePreview(file);  
            }}  
            className="hidden"  
            id={`${name}-upload`}  
          />  
          <label  
            htmlFor={`${name}-upload`}  
            className="cursor-pointer bg-white border border-gray-300 rounded-md py-2 px-4 inline-flex items-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors duration-200"  
          >  
            Choose file  
          </label>  
          <p className="text-xs text-gray-500 mt-1">  
            Drag & drop or click to upload (JPG, PNG & PDF)  
          </p>  
          
          {files[name] && (  
            <div className="mt-4">  
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md">  
                <span className="text-sm text-gray-600 truncate max-w-[200px]">  
                  {files[name].name}  
                </span>  
                <button  
                  type="button"  
                  className="text-gray-400 hover:text-gray-600"  
                  onClick={() => handleRemoveFile(name)}  
                >  
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />  
                  </svg>  
                </button>  
              </div>  
              {files[name].type.startsWith('image/') && (
                <img  
                  id={`preview-${name}`}  
                  src=""  
                  alt={`Preview of ${name}`}  
                  className="w-full h-auto mt-4 max-h-48 object-contain"  
                />  
              )}
            </div>  
          )}  
        </div>  
      </div>  
    </div>  
  );  
};  
  
export default FileUploader;