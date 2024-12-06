import clsx from 'clsx'; // Importing clsx for conditional className management
import Image from 'next/image'; // Importing Image from Next.js for optimized image loading

// Defining the type for the StatCard component's props
type StatCardProps = {
  type: 'appointments' | 'pending' | 'cancelled'; // Type of the stat card (appointments, pending, cancelled)
  count: number; // The count to be displayed on the card
  label: string; // The label text displayed under the count
  icon: string; // The icon to display on the card
};

// StatCard component that accepts `count`, `label`, `icon`, and `type` as props
const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx('stat-card', {
        'bg-appointments': type === 'appointments', // Background style for 'appointments'
        'bg-pending': type === 'pending', // Background style for 'pending'
        'bg-cancelled': type === 'cancelled', // Background style for 'cancelled'
      })}
    >
      {/* The flex container for the icon and count */}
      <div className="flex items-center gap-4">
        <Image
          src={icon} // The icon image source passed from props
          height={32} // Fixed height for the icon
          width={32} // Fixed width for the icon
          alt="appointments" // Alt text for the image
          className="size-8 w-fit" // Class to control image size and width
        />
        {/* Displaying the count */}
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>

      {/* The label text below the count */}
      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default StatCard; // Exporting the StatCard component to be used in other parts of the app
