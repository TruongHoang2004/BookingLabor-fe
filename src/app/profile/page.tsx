'use client';
import React, { useState } from "react";
import Reviews from "@/components/profile/review";
import EditableField from "@/components/profile/editable";
import EditableSelect from "@/components/profile/editableselect";
import EditableTextarea from "@/components/profile/editabletext";
import ChangePassword from "@/components/profile/changepassword";
import HeaderProfile from "@/components/profile/headerprofile";
import { useAppSelector } from '@/redux/store';
import { ProtectedRoute } from "@/components/protectedRoute";

import AvatarUpload from "@/components/profile/avatar";

const ProfilePage = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.auth);

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
    <ProtectedRoute>
      <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
        <div className="bg-white shadow-sm mt-2 p-10 rounded-md w-full">
          <HeaderProfile />
          <div className="flex justify-center shadow-sm p-6 rounded-lg">
            <AvatarUpload
              avatarUrl={avatarUrl}
              onFileSelect={handleFileSelect}
            />
          </div>
          {/* Main Content */}
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 bg-white shadow-sm p-12 rounded-md">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Personal Info */}
              <EditableField
                type="text"
                label="Name"
                defaultValue={`${user?.profile?.first_name ?? ''} ${user?.profile?.last_name ?? ''}`.trim()}
              />
              {/* Contact Info */}
              <EditableField
                type="email"
                label="Email"
                defaultValue={user?.email || ''}
              />
              <ChangePassword />
              <EditableField
                type="mobile"
                label="Phone"
                defaultValue={user?.profile.phone_number || ''}
              />
              <EditableField
                type="text"
                label="Date of Birth"
                defaultValue={user?.profile.birth_date || ''}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Button Container */}
              <EditableField
                type="text"
                label="Gender"
                defaultValue={user?.profile.gender || ''}
              />

              {/* Date of birth*/}
              {/* <div className="gap-4 grid grid-cols-1">
                <EditableField
                  type="date"
                  label="Date of Birth"
                  defaultValue={user?. || ''}
                />
              </div> */}
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
                defaultValue={user?.profile.description || ''}
              />
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md mx-auto mt-12 p-6 rounded-lg w-full">
          <h2 className="mb-4 font-semibold text-2xl text-black text-center">TASKER REVIEWS</h2>
          <Reviews />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;