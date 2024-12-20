'use client';
import React, { useState } from "react";
import EditableField from "@/components/profile/editable";
import EditableSelect from "@/components/profile/editableselect";
import EditableTextarea from "@/components/profile/editabletext";
import ChangePassword from "@/components/profile/changepassword";
import HeaderProfile from "@/components/profile/headerprofile";
import { useAppSelector } from '@/redux/store';
import { ProtectedRoute } from "@/components/protectedRoute";
import AvatarUpload from "@/components/profile/avatar";
import { Profile } from "@/interface/user";
import { Gender } from "@/enum/gender";
import {Input} from "@nextui-org/react";

const ProfilePage = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState<Profile>({
    id: user?.profile.id || 0,
    first_name: user?.profile?.first_name || '',
    last_name: user?.profile?.last_name || '',
    phone_number: user?.profile.phone_number || '',
    birth_date: user?.profile.birth_date || '',
    gender: user?.profile.gender || Gender.UNKNOWN,
    description: user?.profile.description || '',
    create_at: user?.profile.create_at || '',
    updated_at: user?.profile.updated_at || '',
  });
  const genderOptions = Object.values(Gender).map((value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  }));
  const handleFileSelect = (file: File) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
        <div className="bg-white shadow-sm mt-2 p-10 rounded-md w-full">
          <HeaderProfile formdata={formData}/>
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
              <div className="flex space-x-24">
                <EditableField
                  type="text"
                  label="First Name"
                  field="first_name"
                  defaultValue={user?.profile?.first_name || ''}
                  onChange={handleChange}
                />
                <EditableField
                  type="text"
                  label="Last Name"
                  field="last_name"
                  defaultValue={user?.profile?.last_name || ''}
                  onChange={handleChange}
                />
              </div>
              {/* Contact Info */}
              <Input
                type="email"
                label="Email"
                isDisabled
                defaultValue={user?.email || ''}
              />
              <ChangePassword />
              <EditableField
                type="mobile"
                label="Phone"
                field="phone_number"
                defaultValue={user?.profile.phone_number || ''}
                onChange={handleChange}
              />
              <EditableField
                type="text"
                label="Date of Birth"
                field="birth_date"
                defaultValue={user?.profile.birth_date || ''}
                onChange={handleChange}
              />
            </div>
            {/* Right Column */}
            <div className="space-y-6">
              <EditableSelect
                label="Gender"
                field="gender"
                options={genderOptions}
                defaultValue={user?.profile.gender.toString() || Gender.UNKNOWN} 
                onChange={handleChange}
              />
              <EditableField
                type="link"
                label="Social Media"
                field="social_media"
                onChange={handleChange}
              />
              <EditableTextarea
                type='text'
                label="Description"
                field="description"
                defaultValue={user?.profile.description || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>  
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;