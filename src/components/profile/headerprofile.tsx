'use client';

import { Button} from "@nextui-org/react";
import { Kanit } from 'next/font/google'
import { useRouter } from "next/navigation";
import { Profile } from "@/interface/user";
import { userService } from "@/service/user/user";

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

interface HeaderProfileProps {
  formdata: Profile;
}

export default function HeaderProfile({formdata} : HeaderProfileProps )  {
  const router = useRouter();
  const onSaveChanges = async () => {
    // console.log(formdata, taskerData);
    try {
      await userService.updateMe(formdata);
      router.refresh();
    }
    catch (error) {
      console.error(error);
    }
  }
  const onDeleteProfile = async () => {
    try {
      await userService.deleteMe();
      router.push('/');
    }
    catch (error) {
      console.error(error);
    }
  }
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
            onClick={() => router.push('/profile/tasker')}
          >
            Change to Tasker Profile
          </Button>
          <Button
            radius="md"
            color="success"
            variant="solid"
            className={`${kanit.className} text-lg text-white`}
            onClick={onSaveChanges}
          >
            Save Changes
          </Button>
          <Button
            radius="md"
            color="danger"
            variant="bordered"
            className={`${kanit.className} text-lg text-red-600`}
            onClick={onDeleteProfile}
          >
            Delete Profile
          </Button>
          
        </div>
      </div>
  
    </div>
  );
};
