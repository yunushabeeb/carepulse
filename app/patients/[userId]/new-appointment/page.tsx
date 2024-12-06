import Image from 'next/image';

import { AppointmentForm } from '@/components/forms/AppointmentForm';
import { getPatient } from '@/lib/actions/patient.actions';

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  // Fetch the patient data based on the userId
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          {/* Logo Image */}
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          {/* Appointment Form */}
          <AppointmentForm
            patientId={patient?.$id as string} // Pass the patient's ID to the form
            userId={userId} // Pass the userId to the form
            type="create" // Indicate this is for creating a new appointment
          />

          {/* Copyright */}
          <p className="copyright mt-10 py-12">
            © {new Date().getFullYear()} CarePluse
          </p>
        </div>
      </section>

      {/* Side Image */}
      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
