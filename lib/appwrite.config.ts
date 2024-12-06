// Import the Appwrite SDK
import * as sdk from 'node-appwrite';

// Destructure environment variables for configuration.
// These variables should be defined in your environment (.env file or equivalent).
export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT, // Appwrite endpoint URL
  PROJECT_ID, // Project ID for Appwrite
  API_KEY, // API key for authentication
  DATABASE_ID, // Database ID for your Appwrite project
  PATIENT_COLLECTION_ID, // Collection ID for storing patient data
  DOCTOR_COLLECTION_ID, // Collection ID for storing doctor data
  APPOINTMENT_COLLECTION_ID, // Collection ID for storing appointment data
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID, // Storage bucket ID for file handling
} = process.env;

// Initialize the Appwrite client
const client = new sdk.Client();

// Set the Appwrite client configuration using the environment variables.
// Ensures the endpoint, project ID, and API key are properly set.
client
  .setEndpoint(ENDPOINT!) // The Appwrite server endpoint (e.g., 'http://localhost/v1')
  .setProject(PROJECT_ID!) // The Appwrite project ID
  .setKey(API_KEY!); // The Appwrite API key for secure access

// Initialize various Appwrite SDK services using the configured client
export const databases = new sdk.Databases(client); // For interacting with databases
export const users = new sdk.Users(client); // For managing users
export const messaging = new sdk.Messaging(client); // For sending notifications/messages
export const storage = new sdk.Storage(client); // For file storage and management
