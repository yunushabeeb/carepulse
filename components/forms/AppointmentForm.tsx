'use client'; // Indicating that this is a client-side component in Next.js

import { zodResolver } from '@hookform/resolvers/zod'; // Importing zodResolver to handle form validation with Zod schema
import Image from 'next/image'; // Importing Image component from Next.js for handling image optimization
import { useRouter } from 'next/navigation'; // Importing useRouter hook for navigation after form submission
import { Dispatch, SetStateAction, useState } from 'react'; // Importing necessary hooks for state management
import { useForm } from 'react-hook-form'; // Importing useForm hook for handling form state and validation
import { z } from 'zod'; // Importing Zod for schema validation

import { SelectItem } from '@/components/ui/select'; // Importing SelectItem component to create a dropdown for doctor selection
import { Doctors } from '@/constants'; // Importing doctors list (likely an array of doctor objects)
import {
  createAppointment,
  updateAppointment,
} from '@/lib/actions/appointment.actions'; // Importing functions to handle appointment creation and updates
import { getAppointmentSchema } from '@/lib/validation'; // Importing the function to fetch validation schema based on appointment type
import { Appointment } from '@/types/appwrite.types'; // Importing Appointment type for TypeScript type-checking

import 'react-datepicker/dist/react-datepicker.css'; // Importing styles for react-datepicker component

import CustomFormField, { FormFieldType } from '../CustomFormField'; // Importing custom form field component
import SubmitButton from '../SubmitButton'; // Importing SubmitButton component to handle form submission button
import { Form } from '../ui/form'; // Importing Form component for wrapping the form

// AppointmentForm component to handle scheduling, canceling, and creating appointments
export const AppointmentForm = ({
  userId, // The ID of the user (likely a doctor or admin)
  patientId, // The ID of the patient for whom the appointment is being made
  type = 'create', // Type of action: 'create', 'schedule', or 'cancel'
  appointment, // Optional existing appointment to edit
  setOpen, // Optional state setter to close modal after form submission
}: {
  userId: string;
  patientId: string;
  type: 'create' | 'schedule' | 'cancel'; // Action type (create, schedule, or cancel)
  appointment?: Appointment; // Optional appointment details if editing an existing one
  setOpen?: Dispatch<SetStateAction<boolean>>; // Optional setter function for modal open state
}) => {
  const router = useRouter(); // Use the router to navigate after successful form submission
  const [isLoading, setIsLoading] = useState(false); // Managing loading state for the form submission

  const AppointmentFormValidation = getAppointmentSchema(type); // Fetch the validation schema based on the action type (create, schedule, or cancel)

  // Setting up the form with default values, including pre-filled data if editing an existing appointment
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation), // Hook form validation with Zod resolver
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : '', // Default to the existing physician if editing
      schedule: appointment
        ? new Date(appointment?.schedule) // Set the scheduled date for editing, or current date for new appointments
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : '', // Default reason
      note: appointment?.note || '', // Default note
      cancellationReason: appointment?.cancellationReason || '', // Default cancellation reason for cancel type
    },
  });

  // Submit handler for the form
  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation> // Form values typed using Zod validation schema
  ) => {
    setIsLoading(true); // Set loading state while submitting the form

    let status;
    // Determine the status based on action type (scheduled, cancelled, or pending)
    switch (type) {
      case 'schedule':
        status = 'scheduled';
        break;
      case 'cancel':
        status = 'cancelled';
        break;
      default:
        status = 'pending';
    }

    try {
      if (type === 'create' && patientId) {
        // If creating a new appointment
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status, // Set the status based on action type
          note: values.note,
        };

        const newAppointment = await createAppointment(appointment); // Create appointment via the API

        if (newAppointment) {
          form.reset(); // Reset the form after successful creation
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}` // Redirect to success page
          );
        }
      } else {
        // If updating or canceling an existing appointment
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id as string,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate); // Update the appointment via the API

        if (updatedAppointment) {
          if (setOpen) {
            setOpen(false); // Close the modal after successful update
          }
          form.reset(); // Reset the form
        }
      }
    } catch (error) {
      console.log(error); // Log any errors encountered during submission
    }
    setIsLoading(false); // Set loading state back to false after form submission
  };

  // Button label based on action type
  let buttonLabel;
  switch (type) {
    case 'cancel':
      buttonLabel = 'Cancel Appointment';
      break;
    case 'schedule':
      buttonLabel = 'Schedule Appointment';
      break;
    default:
      buttonLabel = 'Submit Appointment';
  }

  return (
    <Form {...form}>
      {' '}
      {/* Form component wrapper */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === 'create' && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}

        {type !== 'cancel' && (
          <>
            {/* Doctor selection field */}
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            {/* Appointment schedule picker */}
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />

            <div
              className={`flex flex-col gap-6  ${
                type === 'create' && 'xl:flex-row'
              }`}
            >
              {/* Reason and notes fields for scheduling */}
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Appointment reason"
                placeholder="Annual monthly check-up"
                disabled={type === 'schedule'} // Disable if scheduling
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Comments/notes"
                placeholder="Prefer afternoon appointments, if possible"
                disabled={type === 'schedule'} // Disable if scheduling
              />
            </div>
          </>
        )}

        {type === 'cancel' && (
          //  Cancellation reason field
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        {/* Submit button */}
        <SubmitButton
          isLoading={isLoading} // Show loading state while submitting
          className={`${
            type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'
          } w-full`}
        >
          {buttonLabel} {/* Label based on action type */}
        </SubmitButton>
      </form>
    </Form>
  );
};
