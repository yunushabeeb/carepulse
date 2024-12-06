'use client';

import { ColumnDef } from '@tanstack/react-table'; // Importing type for table columns
import Image from 'next/image'; // Importing Image component for doctor images

import { Doctors } from '@/constants'; // Importing the list of doctors from constants
import { formatDateTime } from '@/lib/utils'; // Importing utility function to format date and time
import { Appointment } from '@/types/appwrite.types'; // Importing the Appointment type

import AppointmentModal from '../AppointmentModal'; // Importing AppointmentModal component
import StatusBadge from '../StatusBadge'; // Importing StatusBadge component to display appointment status

// Defining the columns for the appointments table
export const columns: ColumnDef<Appointment>[] = [
  // Column for appointment index (serial number)
  {
    header: '#', // Header name
    cell: ({ row }) => {
      // Render cell content for each row
      return <p className="text-14-medium ">{row.index + 1}</p>; // Display the row index as the appointment number
    },
  },

  // Column for patient name
  {
    accessorKey: 'patient', // The key to access patient data
    header: 'Patient', // Header name
    cell: ({ row }) => {
      // Render cell content for each row
      const appointment = row.original; // Get the appointment data for the row
      return <p className="text-14-medium ">{appointment.patient.name}</p>; // Display patient's name
    },
  },

  // Column for appointment status
  {
    accessorKey: 'status', // The key to access the status
    header: 'Status', // Header name
    cell: ({ row }) => {
      // Render cell content for each row
      const appointment = row.original; // Get the appointment data for the row
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />{' '}
          {/* Display status badge */}
        </div>
      );
    },
  },

  // Column for appointment schedule (date and time)
  {
    accessorKey: 'schedule', // The key to access schedule data
    header: 'Appointment', // Header name
    cell: ({ row }) => {
      // Render cell content for each row
      const appointment = row.original; // Get the appointment data for the row
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}{' '}
          {/* Format and display date and time */}
        </p>
      );
    },
  },

  // Column for the doctor's name and image
  {
    accessorKey: 'primaryPhysician', // The key to access the doctor's name
    header: 'Doctor', // Header name
    cell: ({ row }) => {
      // Render cell content for each row
      const appointment = row.original; // Get the appointment data for the row

      // Find the doctor from the Doctors list by matching name
      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image as string} // Display doctor's image
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>{' '}
          {/* Display doctor's name */}
        </div>
      );
    },
  },

  // Column for action buttons (e.g., schedule, cancel appointment)
  {
    id: 'actions', // Unique identifier for the actions column
    header: () => <div className="pl-4">Actions</div>, // Header name
    cell: ({ row }) => {
      // Render cell content for each row
      const appointment = row.original; // Get the appointment data for the row

      return (
        <div className="flex gap-1">
          {/* Button for scheduling appointment */}
          <AppointmentModal
            patientId={appointment.patient.$id} // Pass patient ID
            userId={appointment.userId} // Pass user ID
            appointment={appointment} // Pass the appointment data
            type="schedule" // Define type of action (schedule)
            title="Schedule Appointment" // Modal title
            description="Please confirm the following details to schedule." // Modal description
          />

          {/* Button for canceling appointment */}
          <AppointmentModal
            patientId={appointment.patient.$id} // Pass patient ID
            userId={appointment.userId} // Pass user ID
            appointment={appointment} // Pass the appointment data
            type="cancel" // Define type of action (cancel)
            title="Cancel Appointment" // Modal title
            description="Are you sure you want to cancel your appointment?" // Modal description
          />
        </div>
      );
    },
  },
];
