import { Models } from 'node-appwrite';

/**
 * Represents a patient record in the system.
 * This extends the `Models.Document` interface from Appwrite to include
 * additional fields specific to a patient.
 */
export interface Patient extends Models.Document {
  userId: string; // ID of the user associated with the patient record.
  name: string; // Full name of the patient.
  email: string; // Email address of the patient.
  phone: string; // Contact phone number of the patient.
  birthDate: Date; // Patient's date of birth.
  gender: Gender; // Gender of the patient (e.g., Male, Female, Non-binary).
  address: string; // Patient's residential address.
  occupation: string; // Patient's job or profession.
  emergencyContactName: string; // Name of the patient's emergency contact.
  emergencyContactNumber: string; // Phone number of the emergency contact.
  primaryPhysician: string; // Name or ID of the patient's primary physician.
  insuranceProvider: string; // Name of the patient's insurance provider.
  insurancePolicyNumber: string; // Patient's insurance policy number.
  allergies: string | undefined; // List of allergies the patient has, if any.
  currentMedication: string | undefined; // Details of the patient's current medications, if any.
  familyMedicalHistory: string | undefined; // Family medical history, if available.
  pastMedicalHistory: string | undefined; // Patient's past medical history, if available.
  identificationType: string | undefined; // Type of identification document (e.g., passport, ID card).
  identificationNumber: string | undefined; // Identification document number, if provided.
  identificationDocument: FormData | undefined; // Scanned or uploaded identification document.
  privacyConsent: boolean; // Indicates if the patient has consented to privacy policies.
}

/**
 * Represents an appointment record in the system.
 * This extends the `Models.Document` interface from Appwrite to include
 * additional fields specific to appointments.
 */
export interface Appointment extends Models.Document {
  patient: Patient; // Reference to the patient associated with the appointment.
  schedule: Date; // Date and time of the scheduled appointment.
  status: Status; // Current status of the appointment (e.g., Scheduled, Completed, Cancelled).
  primaryPhysician: string; // Name or ID of the physician handling the appointment.
  reason: string; // Reason for the appointment (e.g., consultation, follow-up).
  note: string; // Additional notes about the appointment.
  userId: string; // ID of the user who created the appointment record.
  cancellationReason: string | null; // Reason for cancellation, if applicable.
}
