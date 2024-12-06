import clsx from 'clsx'; // Importing the clsx library for conditional className management
import Image from 'next/image'; // Importing the Image component from Next.js for optimized images

import { StatusIcon } from '@/constants'; // Importing the StatusIcon constant which maps status to icon URLs

// Defining a StatusBadge component that receives a `status` prop of type `Status`
const StatusBadge = ({ status }: { status: Status }) => {
  return (
    // The outer div applies dynamic styles based on the `status` value
    <div
      className={clsx('status-badge', {
        'bg-green-600': status === 'scheduled', // Green background for scheduled status
        'bg-blue-600': status === 'pending', // Blue background for pending status
        'bg-red-600': status === 'cancelled', // Red background for cancelled status
      })}
    >
      {/* The Image component displays the status icon based on the `status` */}
      <Image
        src={StatusIcon[status]} // Uses the StatusIcon constant to get the appropriate icon based on status
        alt="doctor" // Alt text for the image
        width={24} // Width of the image
        height={24} // Height of the image
        className="h-fit w-3" // Styling the image to fit height and width constraints
      />
      {/* The paragraph tag displays the status text, with dynamic styling */}
      <p
        className={clsx('text-12-semibold capitalize', {
          'text-green-500': status === 'scheduled', // Green text for scheduled status
          'text-blue-500': status === 'pending', // Blue text for pending status
          'text-red-500': status === 'cancelled', // Red text for cancelled status
        })}
      >
        {status} {/* The status text, dynamically capitalized */}
      </p>
    </div>
  );
};

export default StatusBadge; // Exporting the StatusBadge component for use in other parts of the application
