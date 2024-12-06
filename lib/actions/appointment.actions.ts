'use server';

import { revalidatePath } from 'next/cache'; // Used to revalidate specific paths in Next.js cache
import { ID, Query } from 'node-appwrite'; // Importing Appwrite utilities for ID generation and querying

import { Appointment } from '@/types/appwrite.types'; // Appointment type definition

// Importing configurations and utility functions
import {
  APPOINTMENT_COLLECTION_ID, // Collection ID for appointments
  DATABASE_ID, // Database ID for Appwrite
  databases, // Instance of Appwrite Databases service
  messaging, // Instance of Appwrite Messaging service
} from '../appwrite.config';
import { formatDateTime, parseStringify } from '../utils'; // Utility functions for formatting dates and handling JSON safely

// CREATE APPOINTMENT
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    // Create a new appointment document in the database
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(), // Generate a unique ID for the appointment
      appointment // Appointment data
    );

    revalidatePath('/admin'); // Trigger a cache revalidation for the admin page
    return parseStringify(newAppointment); // Safely parse and return the new appointment
  } catch (error) {
    console.error('An error occurred while creating a new appointment:', error);
  }
};

// GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    // Query the database for appointments, ordered by creation date (most recent first)
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc('$createdAt'), Query.offset(0)] // Pagination and sorting
    );

    // Initialize counts for appointment statuses
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    // Count the number of appointments by status
    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case 'scheduled':
            acc.scheduledCount++;
            break;
          case 'pending':
            acc.pendingCount++;
            break;
          case 'cancelled':
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts // Start with initial counts
    );

    // Aggregate the appointment data
    const data = {
      totalCount: appointments.total, // Total number of appointments
      ...counts, // Status counts
      documents: appointments.documents, // Appointment details
    };

    return parseStringify(data); // Safely parse and return the data
  } catch (error) {
    console.error(
      'An error occurred while retrieving the recent appointments:',
      error
    );
  }
};

// SEND SMS NOTIFICATION
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    // Send an SMS notification to the specified user
    const message = await messaging.createSms(
      ID.unique(), // Generate a unique ID for the message
      content, // SMS content
      [], // Empty groups (not using groups here)
      [userId] // Recipient user ID
    );
    return parseStringify(message); // Safely parse and return the message
  } catch (error) {
    console.error('An error occurred while sending SMS:', error);
  }
};

// UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    // Update the appointment document in the database
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId, // ID of the appointment to update
      appointment // Updated appointment data
    );

    if (!updatedAppointment) throw Error; // Throw error if the update fails

    // Generate an SMS message based on the update type (schedule or cancel)
    const smsMessage = `Greetings from CarePulse. ${
      type === 'schedule'
        ? `Your appointment is confirmed for ${
            formatDateTime(appointment.schedule).dateTime // Format the schedule date and time
          } with Dr. ${appointment.primaryPhysician}`
        : `We regret to inform that your appointment for ${
            formatDateTime(appointment.schedule).dateTime
          } is cancelled. Reason:  ${appointment.cancellationReason}`
    }.`;

    // Send the SMS notification
    await sendSMSNotification(userId, smsMessage);

    revalidatePath('/admin'); // Revalidate the admin page cache
    return parseStringify(updatedAppointment); // Safely parse and return the updated appointment
  } catch (error) {
    console.error('An error occurred while scheduling an appointment:', error);
  }
};

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    // Retrieve a specific appointment by its ID
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment); // Safely parse and return the appointment
  } catch (error) {
    console.error(
      'An error occurred while retrieving the existing patient:',
      error
    );
  }
};
