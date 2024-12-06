import Image from 'next/image'; // Importing Next.js Image component for optimized image handling
import Link from 'next/link'; // Importing Link component for navigation within the app

import { PatientForm } from '@/components/forms/PatientForm'; // Importing the PatientForm component
import PasskeyModal from '@/components/PasskeyModal'; // Importing the PasskeyModal component

// Home component accepts searchParams as props for handling query parameters
const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === 'true'; // Check if the URL query parameter 'admin' is set to 'true'

  return (
    <div className="flex h-screen max-h-screen">
      {' '}
      {/* Flex container for full-screen layout */}
      {/* Show the PasskeyModal only if the user is an admin */}
      {isAdmin && <PasskeyModal />}
      {/* Main content section */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          {' '}
          {/* Sub-container for centralizing content */}
          {/* Logo Image */}
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit" // Styling for the logo image
          />
          {/* Patient Form Component */}
          <PatientForm />
          {/* Footer section with copyright and admin link */}
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePluse
            </p>
            {/* Link to access the admin page */}
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      {/* Side image (e.g., illustration or branding image) */}
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]" // Side image with 50% width on large screens
      />
    </div>
  );
};

export default Home; // Exporting the Home component as the default export
