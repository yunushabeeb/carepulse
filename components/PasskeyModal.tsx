'use client'; // Ensures that this component is client-side only, to prevent issues with server-side rendering in Next.js.

import Image from 'next/image'; // Importing Image component from Next.js for optimized image handling
import { usePathname, useRouter } from 'next/navigation'; // Importing hooks from Next.js for managing routing and path handling
import { useEffect, useState } from 'react'; // Importing React hooks for state management and side effects

// Importing components and utilities
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'; // Importing custom OTP input components
import { decryptKey, encryptKey } from '@/lib/utils'; // Utility functions for encryption/decryption

// Main modal component for passkey verification
const PasskeyModal = () => {
  const router = useRouter(); // Hook to control the router
  const path = usePathname(); // Hook to access the current path in the app
  const [open, setOpen] = useState(false); // State to manage modal open/close
  const [passkey, setPasskey] = useState(''); // State to store the passkey input
  const [error, setError] = useState(''); // State to store any error messages

  // Retrieve the encrypted access key from local storage (client-side only)
  const encryptedKey =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('accessKey')
      : null;

  useEffect(() => {
    // Decrypt the access key if it exists
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (path) {
      // If the decrypted key matches the admin passkey, navigate to the admin page
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()) {
        setOpen(false); // Close the modal if the key is correct
        router.push('/admin'); // Redirect to the admin page
      } else {
        setOpen(true); // Open the modal if the key is incorrect or not set
      }
    }
  }, [encryptedKey, path]); // Effect runs when the encryptedKey or path changes

  // Function to close the modal and redirect to the home page
  const closeModal = () => {
    setOpen(false); // Close the modal
    router.push('/'); // Redirect to the home page
  };

  // Function to validate the passkey when the user submits
  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if the passkey matches the expected value
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      // If correct, encrypt the passkey and store it in local storage
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem('accessKey', encryptedKey);

      setOpen(false); // Close the modal upon successful validation
    } else {
      // If incorrect, display an error message
      setError('Invalid passkey. Please try again.');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {' '}
      {/* The dialog component for the passkey input */}
      <AlertDialogContent className="shad-alert-dialog">
        {' '}
        {/* Content of the alert dialog */}
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            {/* Close icon */}
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => closeModal()} // Close the modal when clicked
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          {/* OTP input for the passkey */}
          <InputOTP
            maxLength={6} // OTP length is 6
            value={passkey} // Bind the passkey state to the input
            onChange={(value) => setPasskey(value)} // Update the passkey state on change
          >
            <InputOTPGroup className="shad-otp">
              {' '}
              {/* Group for OTP slots */}
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {/* Display error message if the passkey is incorrect */}
          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          {/* Button to validate the passkey */}
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)} // Trigger passkey validation on click
            className="shad-primary-btn w-full"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal; // Export the PasskeyModal component for use in other parts of the app
