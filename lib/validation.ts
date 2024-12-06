import { z } from 'zod'; // Importing Zod, a library for schema validation and type inference.

/**
 * Validation schema for user forms.
 * Ensures valid user input for creating or updating user data.
 */
export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters') // Minimum length of 2 characters.
    .max(50, 'Name must be at most 50 characters'), // Maximum length of 50 characters.
  email: z.string().email('Invalid email address'), // Validates email format.
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'), // Validates international phone number format.
});

/**
 * Validation schema for patient forms.
 * Contains additional fields specific to patient data.
 */
export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  birthDate: z.coerce.date(), // Converts input to a Date object.
  gender: z.enum(['male', 'female', 'other']), // Gender must be one of the specified options.
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must be at most 500 characters'),
  occupation: z
    .string()
    .min(2, 'Occupation must be at least 2 characters')
    .max(500, 'Occupation must be at most 500 characters'),
  emergencyContactName: z
    .string()
    .min(2, 'Contact name must be at least 2 characters')
    .max(50, 'Contact name must be at most 50 characters'),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      'Invalid phone number'
    ),
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  insuranceProvider: z
    .string()
    .min(2, 'Insurance name must be at least 2 characters')
    .max(50, 'Insurance name must be at most 50 characters'),
  insurancePolicyNumber: z
    .string()
    .min(2, 'Policy number must be at least 2 characters')
    .max(50, 'Policy number must be at most 50 characters'),
  allergies: z.string().optional(), // Optional field for allergies.
  currentMedication: z.string().optional(), // Optional field for current medications.
  familyMedicalHistory: z.string().optional(), // Optional field for family medical history.
  pastMedicalHistory: z.string().optional(), // Optional field for past medical history.
  identificationType: z.string().optional(), // Optional field for ID type.
  identificationNumber: z.string().optional(), // Optional field for ID number.
  identificationDocument: z.custom<File[]>().optional(), // Optional field for uploaded ID documents.
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to treatment in order to proceed',
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to disclosure in order to proceed',
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to privacy in order to proceed',
    }),
});

/**
 * Validation schema for creating an appointment.
 */
export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
  note: z.string().optional(), // Optional field for additional notes.
  cancellationReason: z.string().optional(), // Optional field for cancellation reason.
});

/**
 * Validation schema for scheduling an appointment.
 * Similar to creating an appointment but allows optional reason.
 */
export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

/**
 * Validation schema for canceling an appointment.
 * Requires a valid cancellation reason.
 */
export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
});

/**
 * Helper function to retrieve the appropriate appointment schema based on the action type.
 * @param {string} type - The type of appointment action (create, cancel, or schedule).
 * @returns {z.ZodObject} - Corresponding Zod validation schema.
 */
export function getAppointmentSchema(type: string) {
  switch (type) {
    case 'create':
      return CreateAppointmentSchema;
    case 'cancel':
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
