import React, { useCallback, useState } from "react";
import { useDropzone, Accept, FileRejection } from "react-dropzone";

interface DropZoneProps {
  onDrop: (files: File[]) => void;
  accept?: Accept;
  maxFiles?: number;
  maxSize?: number;
  dropText?: string;
  defaultText?: string;
  className?: string;
  disabled?: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({
  onDrop,
  accept,
  disabled,
  maxFiles = 1,
  maxSize = 5242880, // 5 MB
  dropText = "Drop the files here ...",
  defaultText = "Drag 'n' drop some files here, or click to select files",
  className,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      setUploadedFiles(acceptedFiles.map((file) => file.name));
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const handleDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const errorMessages = new Set<string>();

    fileRejections.forEach((rejection) => {
      const { errors } = rejection;
      errors.forEach((e) => errorMessages.add(e.message));
    });

    setError(Array.from(errorMessages).join("; "));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: handleDrop,
    onDropRejected: handleDropRejected,
    accept,
    maxFiles,
    maxSize,
    disabled,
  });

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-4 rounded cursor-pointer transition-all ${
          isDragActive ? "bg-blue-100" : "bg-gray-100"
        } ${className} w-full sm:w-3/4 lg:w-1/3 h-18 sm:h-24 lg:h-22 flex items-center justify-center`}
      >
        <input {...getInputProps()} />
        <p className="text-center text-sm sm:text-base">
          {isDragActive ? dropText : defaultText}
        </p>
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 w-full sm:w-3/4 lg:w-1/2">
          <p className="text-sm font-medium">Uploaded Files:</p>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {uploadedFiles.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropZone;
