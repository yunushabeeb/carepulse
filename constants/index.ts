// Defining the available gender options for patients
export const GenderOptions = ['male', 'female', 'other'];

// Default values for the patient form, including personal and medical details
export const PatientFormDefaultValues = {
  firstName: '', // First name of the patient
  lastName: '', // Last name of the patient
  email: '', // Email address of the patient
  phone: '', // Phone number of the patient
  birthDate: new Date(Date.now()), // Birthdate of the patient (defaults to the current date)
  gender: 'male' as Gender, // Gender of the patient (default to male)
  address: '', // Address of the patient
  occupation: '', // Occupation of the patient
  emergencyContactName: '', // Name of the emergency contact person
  emergencyContactNumber: '', // Phone number of the emergency contact person
  primaryPhysician: '', // Name of the primary physician
  insuranceProvider: '', // Insurance provider for the patient
  insurancePolicyNumber: '', // Insurance policy number
  allergies: '', // Any known allergies of the patient
  currentMedication: '', // List of current medications the patient is taking
  familyMedicalHistory: '', // Family medical history of the patient
  pastMedicalHistory: '', // Past medical history of the patient
  identificationType: 'Birth Certificate', // Type of identification (default is birth certificate)
  identificationNumber: '', // Identification number (e.g., from birth certificate)
  identificationDocument: [], // Document for identification (can store multiple files)
  treatmentConsent: false, // Consent for treatment (default is false)
  disclosureConsent: false, // Consent for medical disclosure (default is false)
  privacyConsent: false, // Consent for privacy policy (default is false)
};

// List of possible identification types that can be used by patients
export const IdentificationTypes = [
  'Birth Certificate',
  "Driver's License",
  'Medical Insurance Card/Policy',
  'Military ID Card',
  'National Identity Card',
  'Passport',
  'Resident Alien Card (Green Card)',
  'Social Security Card',
  'State ID Card',
  'Student ID Card',
  'Voter ID Card',
];

// List of doctors available in the system, with images and names
export const Doctors = [
  {
    image: '/assets/images/dr-green.png', // Image of Dr. John Green
    name: 'John Green', // Name of Dr. John Green
  },
  {
    image: '/assets/images/dr-cameron.png', // Image of Dr. Leila Cameron
    name: 'Leila Cameron', // Name of Dr. Leila Cameron
  },
  {
    image: '/assets/images/dr-livingston.png', // Image of Dr. David Livingston
    name: 'David Livingston', // Name of Dr. David Livingston
  },
  {
    image: '/assets/images/dr-peter.png', // Image of Dr. Evan Peter
    name: 'Evan Peter', // Name of Dr. Evan Peter
  },
  {
    image: '/assets/images/dr-powell.png', // Image of Dr. Jane Powell
    name: 'Jane Powell', // Name of Dr. Jane Powell
  },
  {
    image: '/assets/images/dr-remirez.png', // Image of Dr. Alex Ramirez
    name: 'Alex Ramirez', // Name of Dr. Alex Ramirez
  },
  {
    image: '/assets/images/dr-lee.png', // Image of Dr. Jasmine Lee
    name: 'Jasmine Lee', // Name of Dr. Jasmine Lee
  },
  {
    image: '/assets/images/dr-cruz.png', // Image of Dr. Alyana Cruz
    name: 'Alyana Cruz', // Name of Dr. Alyana Cruz
  },
  {
    image: '/assets/images/dr-sharma.png', // Image of Dr. Hardik Sharma
    name: 'Hardik Sharma', // Name of Dr. Hardik Sharma
  },
];

// Status icons for appointments: scheduled, pending, and cancelled
export const StatusIcon = {
  scheduled: '/assets/icons/check.svg', // Icon for scheduled appointments
  pending: '/assets/icons/pending.svg', // Icon for pending appointments
  cancelled: '/assets/icons/cancelled.svg', // Icon for cancelled appointments
};
