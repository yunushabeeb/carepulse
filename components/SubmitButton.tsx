import Image from 'next/image'; // Importing the Image component from Next.js to handle optimized images

import { Button } from './ui/button'; // Importing the Button component from a local file for use in this component

// Defining the interface for the button props
interface ButtonProps {
  isLoading: boolean; // A flag to indicate whether the button is in a loading state
  className?: string; // An optional className to apply custom styling to the button
  children: React.ReactNode; // The content of the button, which can be any React node
}

// Creating a SubmitButton functional component
const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    // The Button component is used here with the passed props
    <Button
      type="submit" // Specifies this button is a submit button for forms
      disabled={isLoading} // Disables the button when it is loading
      className={className ?? 'shad-primary-btn w-full'} // Applies either a passed-in className or a default class
    >
      {/* Conditional rendering based on the loading state */}
      {isLoading ? (
        // If loading, show a spinner and the text "Loading..."
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg" // The loader image source
            alt="loader" // The alt text for the image
            width={24} // The width of the image
            height={24} // The height of the image
            className="animate-spin" // Adds a spinning animation to the loader
          />
          Loading...
        </div>
      ) : (
        // If not loading, render the children (the content passed to the button)
        children
      )}
    </Button>
  );
};

export default SubmitButton; // Exporting the SubmitButton component for use in other parts of the application
