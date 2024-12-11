'use client';

import { Button } from "@nextui-org/react";
import { Kanit } from 'next/font/google'
import { useRouter, usePathname } from "next/navigation";


const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const HeaderProfile: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isTaskerProfile = pathname === '/profile/tasker';
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      {/* Title and Buttons Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <h1 className={`${kanit.className} text-4xl text-green-500 font-semibold`}>
          MY PROFILE
        </h1>
        <div className="flex flex-wrap gap-8">
        <Button
            radius="md"
            color="success"
            variant="solid"
            className={`${kanit.className} text-lg text-white`}
            onClick={() => router.push(isTaskerProfile ? '/profile' : '/profile/tasker')}
          >
            {isTaskerProfile ? 'Change to Customer Profile' : 'Change to Tasker Profile'}
          </Button>
          <Button
            radius="md"
            color="success"
            variant="solid"
            className={`${kanit.className} text-lg text-white`}
            onClick={() => router.push('./')}
          >
            Save Changes
          </Button>
          <Button
            radius="md"
            color="danger"
            variant="bordered"
            className={`${kanit.className} text-lg text-red-600`}
          >
            Delete Profile
          </Button>
          
        </div>
      </div>
  
    </div>
  );
};

export default HeaderProfile;