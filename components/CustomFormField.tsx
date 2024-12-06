/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { E164Number } from 'libphonenumber-js/core'; // Importing E164Number for phone number formatting
import Image from 'next/image'; // Importing Image component from Next.js
import ReactDatePicker from 'react-datepicker'; // Importing ReactDatePicker component for date picking
import { Control } from 'react-hook-form'; // Importing Control type from react-hook-form to manage form control
import PhoneInput from 'react-phone-number-input'; // Importing PhoneInput for phone number input field

// Importing UI components for form field, checkbox, input, select, and textarea from custom UI library
import { Checkbox } from './ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

// Enum to define different types of form fields (input, textarea, phone input, etc.)
export enum FormFieldType {
  INPUT = 'input', // Input field type
  TEXTAREA = 'textarea', // Textarea field type
  PHONE_INPUT = 'phoneInput', // Phone input field type
  CHECKBOX = 'checkbox', // Checkbox field type
  DATE_PICKER = 'datePicker', // Date picker field type
  SELECT = 'select', // Select dropdown field type
  SKELETON = 'skeleton', // Skeleton loader (for loading state)
}

// Interface for custom properties to configure the form fields
interface CustomProps {
  control: Control<any>; // react-hook-form control for form management
  name: string; // Name of the form field (used in the form hook)
  label?: string; // Label for the form field
  placeholder?: string; // Placeholder text for input fields
  iconSrc?: string; // Optional icon to display in the input field
  iconAlt?: string; // Alt text for the icon
  disabled?: boolean; // Boolean to disable the field
  dateFormat?: string; // Date format for the date picker field
  showTimeSelect?: boolean; // Boolean to enable time selection in the date picker
  children?: React.ReactNode; // Children passed into the select field for options
  renderSkeleton?: (field: any) => React.ReactNode; // Function to render skeleton loading for form fields
  fieldType: FormFieldType; // The type of form field (input, textarea, phone input, etc.)
}

// A helper function that renders the correct form field based on the `fieldType` passed in props
const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT: // Render an input field
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {props.iconSrc && ( // If an icon source is provided, render the icon
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || 'icon'}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder} // Set the placeholder for the input
              {...field} // Spread the field props (value, onChange, etc.)
              className="shad-input border-0" // Custom styling for the input
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA: // Render a textarea field
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder} // Set the placeholder for the textarea
            {...field} // Spread the field props (value, onChange, etc.)
            className="shad-textArea" // Custom styling for the textarea
            disabled={props.disabled} // Apply the disabled state if needed
          />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT: // Render a phone input field
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US" // Set the default country
            placeholder={props.placeholder} // Set the placeholder for the phone input
            international // Enable international phone number input
            withCountryCallingCode // Display country calling code with the number
            value={field.value as E164Number | undefined} // Set the value for the phone input
            onChange={field.onChange} // Handle changes to the phone input
            className="input-phone" // Custom styling for the phone input
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX: // Render a checkbox field
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name} // Set the ID for the checkbox
              checked={field.value} // Set the checkbox checked state based on field value
              onCheckedChange={field.onChange} // Handle checkbox changes
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label} {/* Display the label for the checkbox */}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER: // Render a date picker field
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="user"
            className="ml-2"
          />
          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false} // Enable time selection if set
              selected={field.value} // Set the selected date
              onChange={(date) => field.onChange(date)} // Handle date changes
              timeInputLabel="Time:" // Label for the time input
              dateFormat={props.dateFormat ?? 'MM/dd/yyyy'} // Set the date format
              wrapperClassName="date-picker" // Custom styling for the date picker wrapper
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT: // Render a select dropdown field
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}{' '}
              {/* Render the dropdown options (children passed into the select) */}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON: // Render a skeleton loader (if the field is loading)
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null; // If no valid field type, render nothing
  }
};

// Main CustomFormField component which uses React Hook Form to manage form state
const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control} // Pass the control from react-hook-form to manage form state
      name={name} // Pass the name of the form field
      render={(
        { field } // Render the field using the react-hook-form render method
      ) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX &&
            label && ( // Only show label if not a checkbox
              <FormLabel className="shad-input-label">{label}</FormLabel>
            )}
          <RenderInput field={field} props={props} />{' '}
          {/* Render the appropriate input component */}
          <FormMessage className="shad-error" />{' '}
          {/* Render error message if any */}
        </FormItem>
      )}
    />
  );
};

export default CustomFormField; // Export the CustomFormField component for use elsewhere
