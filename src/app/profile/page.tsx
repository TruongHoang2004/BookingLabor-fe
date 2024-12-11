'use client';
import React, { useState } from "react";
import Reviews from "@/components/profile/review";
import EditableField from "@/components/profile/editable";
import EditableSelect from "@/components/profile/editableselect";
import EditableTextarea from "@/components/profile/editabletext";
import ChangePassword from "@/components/profile/changepassword";
import HeaderProfile from "@/components/profile/headerprofile";

import AvatarUpload from "@/components/profile/avatar";

const ProfilePage = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };
    const paymentOptions = [ 
      { value: 'credit_card', label: 'Credit Card' },
      { value: 'pay_pal', label: 'PayPal' },
      { value: 'bank_transfer', label: 'Bank Transfer' },
      { value: 'cash', label: 'Cash' },
    ];
    
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
        <ChangePassword/>
        <EditableField
          type="mobile"
          label="Phone"
        />
        <EditableField
          type="text"
          label="Address"
        />
        <EditableField
          type="text"
          label="Country"
        />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Button Container */}
          
        <EditableField
          type="text"
          label="Gender"
        />

          {/* Date of birth*/}
          <div className="grid grid-cols-1 gap-4">
          <EditableField
            type="date"
            label="Date"
          />
          </div>
          <EditableField
            type="link"
            label="Social Media"
          />
           <EditableSelect
            label="Payment method"
            options={paymentOptions}
            defaultValue=""
          />
          <EditableTextarea
            type='text'
            label="Description"
          />
        </div>
      </div>
      </div>
      <div className="mt-12 w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">TASKER REVIEWS</h2>
        <Reviews />
      </div>
    </div>
  );
};

export default ProfilePage;