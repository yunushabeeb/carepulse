/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { ID, Query } from 'node-appwrite'; // Import necessary classes from Appwrite SDK
import { InputFile } from 'node-appwrite/file'; // Import file handling utilities

// Import configuration and utilities
import {
  BUCKET_ID, // Storage bucket ID for Appwrite
  DATABASE_ID, // Database ID for Appwrite
  ENDPOINT, // Appwrite endpoint URL
  PATIENT_COLLECTION_ID, // Collection ID for patients
  PROJECT_ID, // Appwrite project ID
  databases, // Database instance from Appwrite
  storage, // Storage instance from Appwrite
  users, // Users instance from Appwrite
} from '../appwrite.config';
import { parseStringify } from '../utils'; // Utility for safely parsing and stringifying objects

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Create a new user with unique ID, email, phone, and name
    const newuser = await users.create(
      ID.unique(), // Generate a unique user ID
      user.email, // User's email
      user.phone, // User's phone number
      undefined, // Password (can be added if required)
      user.name // User's name
    );

    return parseStringify(newuser); // Return the created user as a safe JSON object
  } catch (error: any) {
    // Check if the error is due to a conflict (user already exists)
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal('email', [user.email]), // Query for user with the same email
      ]);

      return existingUser.users[0]; // Return the first matching user
    }
    console.error('An error occurred while creating a new user:', error);
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    // Retrieve user details by user ID
    const user = await users.get(userId);

    return parseStringify(user); // Return user details as a JSON object
  } catch (error) {
    console.error(
      'An error occurred while retrieving the user details:',
      error
    );
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      // Create an InputFile instance from the uploaded file's buffer and filename
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument?.get('blobFile') as Blob, // File buffer
          identificationDocument?.get('fileName') as string // File name
        );

      // Upload the file to Appwrite storage
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // Create a new document in the patients collection
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null, // Store file ID
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}` // Construct file URL
          : null,
        ...patient, // Spread remaining patient data into the document
      }
    );

    return parseStringify(newPatient); // Return the created patient record as JSON
  } catch (error) {
    console.error('An error occurred while creating a new patient:', error);
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    // Query the patients collection for a document with the given userId
    const patients = await databases.listDocuments(
      DATABASE_ID as string,
      PATIENT_COLLECTION_ID as string,
      [Query.equal('userId', userId), Query.offset(0)] // Filters and pagination
    );

    return parseStringify(patients.documents[0]); // Return the first matching patient document
  } catch (error) {
    console.error(
      'An error occurred while retrieving the patient details:',
      error
    );
  }
};
