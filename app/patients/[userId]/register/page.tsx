import Image from 'next/image';
import { redirect } from 'next/navigation';

import RegisterForm from '@/components/forms/RegisterForm';
import { getPatient, getUser } from '@/lib/actions/patient.actions';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  // Fetch user and patient details based on the userId
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  // If a patient already exists, redirect to the new appointment page
  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          {/* Logo Image */}
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          {/* Registration Form */}
          <RegisterForm user={user} />

          {/* Copyright */}
          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      {/* Side image */}
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
