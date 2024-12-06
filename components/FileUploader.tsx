'use client'; // Ensures this component is client-side only, as it uses `useDropzone` for drag-and-drop functionality, which is a client-side feature.

import Image from 'next/image'; // Importing Next.js Image component for optimized image rendering
import React, { useCallback } from 'react'; // Importing React and useCallback for efficient rendering and memoization
import { useDropzone } from 'react-dropzone'; // Importing react-dropzone to handle file drop and drag functionality

import { convertFileToUrl } from '@/lib/utils'; // Utility function to convert the file to a URL (for image display)

type FileUploaderProps = {
  files: File[] | undefined; // `files` is an array of File objects or undefined if no files are selected
  onChange: (files: File[]) => void; // Callback function that updates the files
};

// FileUploader component allows file upload with drag-and-drop or a click-to-upload button
export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  // onDrop is a memoized function that gets triggered when files are dropped
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles); // Update parent state with new files
    },
    [onChange]
  );

  // Using react-dropzone's hooks to get props for the root div and input element
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      {' '}
      {/* Root element for dropzone */}
      <input {...getInputProps()} />{' '}
      {/* Hidden input element for file selection */}
      {/* Conditionally render the uploaded image or upload instructions */}
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])} // Convert the file to URL to display it
          width={1000} // Set image width to 1000px
          height={1000} // Set image height to 1000px
          alt="uploaded image" // Alt text for accessibility
          className="max-h-[400px] overflow-hidden object-cover" // Apply styling for image sizing and cropping
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg" // Icon displayed before file upload
            width={40}
            height={40}
            alt="upload"
          />
          <div className="file-upload_label">
            {/* Instructions for the user */}
            <p className="text-14-regular ">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">
              SVG, PNG, JPG or GIF (max. 800x400px){' '}
              {/* File format and size instructions */}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
