'use client';

import { zodResolver } from '@hookform/resolvers/zod'; // Zod integration for validation with React Hook Form
import { useRouter } from 'next/navigation'; // Hook for navigation in Next.js
import { useState } from 'react'; // State management hook
import { useForm } from 'react-hook-form'; // Hook for managing form state
import { z } from 'zod'; // Zod library for schema-based validation

// UI components and utilities
import { Form } from '@/components/ui/form'; // Custom form wrapper component
import { createUser } from '@/lib/actions/patient.actions'; // Action for creating a new user
import { UserFormValidation } from '@/lib/validation'; // Zod validation schema for form inputs

import 'react-phone-number-input/style.css'; // Phone number input styling
import CustomFormField, { FormFieldType } from '../CustomFormField'; // Custom form field component and types
import SubmitButton from '../SubmitButton'; // Submit button component

export const PatientForm = () => {
  const router = useRouter(); // Initialize router for page navigation
  const [isLoading, setIsLoading] = useState(false); // State to track loading status during form submission

  // Form initialization with validation schema
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation), // Set up Zod validation with React Hook Form
    defaultValues: {
      name: '', // Default value for name field
      email: '', // Default value for email field
      phone: '', // Default value for phone field
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true); // Set loading state to true when submission starts

    try {
      // Prepare user data
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      // Call API action to create user
      const newUser = await createUser(user);

      if (newUser) {
        // On success, navigate to user registration page
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error); // Log any errors during user creation
    }

    setIsLoading(false); // Reset loading state after completion
  };

  return (
    <Form {...form}>
      {' '}
      {/* Wrapper for the form component */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {/* Section for form title and description */}
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Get started with appointments.</p>
        </section>

        {/* Form field for name */}
        <CustomFormField
          fieldType={FormFieldType.INPUT} // Type of field (input)
          control={form.control} // React Hook Form control
          name="name" // Name of the field
          label="Full name" // Label for the input field
          placeholder="John Doe" // Placeholder text
          iconSrc="/assets/icons/user.svg" // Icon source
          iconAlt="user" // Icon alt text
        />

        {/* Form field for email */}
        <CustomFormField
          fieldType={FormFieldType.INPUT} // Type of field (input)
          control={form.control} // React Hook Form control
          name="email" // Name of the field
          label="Email" // Label for the input field
          placeholder="johndoe@gmail.com" // Placeholder text
          iconSrc="/assets/icons/email.svg" // Icon source
          iconAlt="email" // Icon alt text
        />

        {/* Form field for phone number */}
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT} // Type of field (phone input)
          control={form.control} // React Hook Form control
          name="phone" // Name of the field
          label="Phone number" // Label for the input field
          placeholder="(555) 123-4567" // Placeholder text
        />

        {/* Submit button */}
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
