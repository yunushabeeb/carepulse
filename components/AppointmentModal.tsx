'use client'; // Indicating that this is a client-side component in Next.js

import { useState } from 'react'; // Importing useState hook for managing component state

// Importing UI components for dialog and button from the custom UI library
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Importing the Appointment type for TypeScript type-checking
import { Appointment } from '@/types/appwrite.types';

// Importing AppointmentForm component which will handle form submission for scheduling/canceling appointment
import { AppointmentForm } from './forms/AppointmentForm';

// Importing date picker styles
import 'react-datepicker/dist/react-datepicker.css';

// AppointmentModal component to handle appointment scheduling and cancellation
const AppointmentModal = ({
  patientId, // ID of the patient
  userId, // ID of the user (likely a doctor or admin)
  appointment, // Optional existing appointment to edit
  type, // The type of action: 'schedule' or 'cancel'
}: {
  patientId: string;
  userId: string;
  appointment?: Appointment;
  type: 'schedule' | 'cancel'; // The action type (schedule or cancel)
  title: string; // Modal title text
  description: string; // Modal description text
}) => {
  const [open, setOpen] = useState(false); // Managing the modal open/close state

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {' '}
      {/* Dialog component to manage modal visibility */}
      <DialogTrigger asChild>
        {/* Button that triggers the dialog. The button changes color based on type */}
        <Button
          variant="ghost" // Ghost button variant (outlined style)
          className={`capitalize ${type === 'schedule' && 'text-green-500'}`} // Conditional styling based on the type
        >
          {type} {/* Text on the button will be 'schedule' or 'cancel' */}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        {' '}
        {/* Dialog content wrapper with custom styling */}
        <DialogHeader className="mb-4 space-y-3">
          {' '}
          {/* Dialog header with margin and spacing */}
          <DialogTitle className="capitalize">
            {type} Appointment
          </DialogTitle>{' '}
          {/* Appointment type in title */}
          <DialogDescription>
            Please fill in the following details to {type} appointment
          </DialogDescription>{' '}
          {/* Description of the action to be taken */}
        </DialogHeader>
        {/* Rendering the AppointmentForm for scheduling/canceling appointment */}
        <AppointmentForm
          userId={userId} // Pass userId to AppointmentForm
          patientId={patientId} // Pass patientId to AppointmentForm
          type={type} // Pass type to AppointmentForm (schedule or cancel)
          appointment={appointment} // Pass the existing appointment details (if any)
          setOpen={setOpen} // Function to close the modal after form submission
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal; // Export the AppointmentModal component to be used in other parts of the app
