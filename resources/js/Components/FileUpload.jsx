import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onUpload }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setUploading(true);
        // Simulate a delay for file processing
        setTimeout(() => {
            setUploading(false);
            setUploadedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
            onUpload(acceptedFiles);
        }, 1500); // Simulating a network delay of 1.5 seconds
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="file-upload-component">
            <div {...getRootProps()} className={`border-2 border-dashed p-6 rounded-md text-center ${isDragActive ? 'border-blue-400' : 'border-gray-400'}`}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p className="text-gray-500">Drop the files here ...</p> :
                        <p className="text-gray-500">Drag 'n' drop files here, or click to select files</p>
                }
            </div>

            {uploading && (
                <div className="loading-indicator mt-4">
                    <p className="text-blue-500 animate-pulse">Uploading files...</p>
                </div>
            )}

            <ul className="uploaded-files-list mt-4">
                {uploadedFiles.map(file => (
                    <li key={file.path} className="text-green-600">
                        {file.path} - {file.size} bytes
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileUpload;