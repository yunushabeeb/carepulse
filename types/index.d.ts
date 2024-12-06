/* eslint-disable no-unused-vars */ // Disables the ESLint rule for unused variables, as some declarations may be used dynamically or in other files.

/**
 * Represents the parameters required for handling search functionality.
 */
declare type SearchParamProps = {
  params: { [key: string]: string }; // Object mapping parameter keys to their values.
  searchParams: { [key: string]: string | string[] | undefined }; // Object for managing search parameters, allowing arrays or undefined values.
};

/**
 * Enum-like declaration for possible gender values.
 */
declare type Gender = 'male' | 'female' | 'other';

/**
 * Enum-like declaration for possible appointment statuses.
 */
declare type Status = 'pending' | 'scheduled' | 'cancelled';

/**
 * Parameters required for creating a user.
 */
declare interface CreateUserParams {
  name: string; // Full name of the user.
  email: string; // Email address of the user.
  phone: string; // Contact phone number of the user.
}

/**
 * Extends `CreateUserParams` to include additional fields for a user object.
 */
declare interface User extends CreateUserParams {
  $id: string; // Unique identifier for the user.
}

/**
 * Parameters required to register a new user.
 * Extends `CreateUserParams` with additional fields for detailed user information.
 */
declare interface RegisterUserParams extends CreateUserParams {
  userId: string; // Unique identifier for the user (external or internal system ID).
  birthDate: Date; // Date of birth of the user.
  gender: Gender; // Gender of the user (male, female, or other).
  address: string; // Residential address of the user.
  occupation: string; // User's occupation or job role.
  emergencyContactName: string; // Name of the emergency contact person.
  emergencyContactNumber: string; // Phone number of the emergency contact.
  primaryPhysician: string; // Name or ID of the user's primary physician.
  insuranceProvider: string; // Name of the user's insurance provider.
  insurancePolicyNumber: string; // Insurance policy number of the user.
  allergies: string | undefined; // List of known allergies, if any.
  currentMedication: string | undefined; // Details of current medications, if any.
  familyMedicalHistory: string | undefined; // Family's medical history, if provided.
  pastMedicalHistory: string | undefined; // User's past medical history, if provided.
  identificationType: string | undefined; // Type of identification (e.g., passport, ID card).
  identificationNumber: string | undefined; // Number of the identification document, if provided.
  identificationDocument: FormData | undefined; // Document data for the user's ID (e.g., uploaded file).
  privacyConsent: boolean; // Indicates if the user has provided consent for privacy policies.
}

/**
 * Parameters required for creating a new appointment.
 */
declare type CreateAppointmentParams = {
  userId: string; // ID of the user creating the appointment.
  patient: string; // ID of the patient for whom the appointment is being created.
  primaryPhysician: string; // ID or name of the primary physician handling the appointment.
  reason: string; // Reason for the appointment (e.g., consultation, follow-up).
  schedule: Date; // Date and time of the appointment.
  status: Status; // Status of the appointment (e.g., pending, scheduled, cancelled).
  note: string | undefined; // Optional note or additional details about the appointment.
};

/**
 * Parameters required to update an existing appointment.
 */
declare type UpdateAppointmentParams = {
  appointmentId: string; // Unique identifier of the appointment to update.
  userId: string; // ID of the user requesting the update.
  appointment: Appointment; // Updated appointment object.
  type: string; // Type of update (e.g., reschedule, cancel, etc.).
};
