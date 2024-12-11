'use client';
import AvatarUpload from "@/components/profile/avatar";
import React, { useState } from "react";
import Reviews from "@/components/profile/review";
import EditableField from "@/components/profile/editable";
import EditableTextarea from "@/components/profile/editabletext";
import EditableChipInput from "@/components/profile/editablechip";
import HeaderProfile from "@/components/profile/headerprofile";


const TaskerProfilePage = () => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const handleFileSelect = (file: File) => {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    };
  
  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      <div className="mt-2 rounded-md p-10 w-full bg-white shadow-sm">
      <HeaderProfile />
      <div className=" flex justify-center rounded-lg shadow-sm p-6">
          <AvatarUpload
            avatarUrl={avatarUrl}
            onFileSelect={handleFileSelect}
          />
        </div>
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-md p-12 bg-white shadow-sm">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Personal Info */}
          <EditableField
            type="text"
            label="Name"
            defaultValue="Jeremy Truong"
          />
          {/* Contact Info */}
        <EditableField
          type="email"
          label="Email"
          defaultValue="jeremytruong0204@gmail.com"
        />
        <EditableField
          type="text"
          label="Phone Number"
        />
        </div>
        {/* Right Column */}
        <div className="space-y-6">
        <EditableField
          type="text"
          label="Work Area"
        />
        <EditableChipInput
          label="Skills"
        />
        <EditableTextarea
          type="text"
          label="Experience"
        />
        </div>
        </div>
      </div>
      <div className="mt-12 w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">CUSTOMER REVIEWS</h2>
        <Reviews />
      </div>
    </div>
  );
};

export default TaskerProfilePage;