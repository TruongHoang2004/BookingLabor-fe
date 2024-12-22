'use client';
import React, { useState } from "react";
import EditableField from "@/components/profile/editable";
import EditableSelect from "@/components/profile/editableselect";
import EditableTextarea from "@/components/profile/editabletext";
import HeaderProfile from "@/components/profile/headerprofile";
import { useAppSelector } from '@/redux/store';
import { ProtectedRoute } from "@/components/protectedRoute";
import AvatarUpload from "@/components/profile/avatar";
import { userService } from "@/service/user/user";
import { Profile } from "@/interface/user";
import { Gender } from "@/enum/gender";
import {Input} from "@nextui-org/react";


const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(user?.profile.avatar);
  const [error, setError] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setAvatarUrl(undefined);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';
      formData.append('upload_preset', uploadPreset);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) throw new Error('Cloudinary cloud name is not configured');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Upload failed');

      setAvatarUrl(data.secure_url);
      // in ra URL KHI THÀNH CÔNG
      await userService.updateAvatarURL(data.secure_url)
      console.log('Cloudinary URL:', data.secure_url);

      setAvatarUrl(data.secure_url);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

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
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
        <div className="bg-white shadow-sm mt-2 p-10 rounded-md w-full">
          <HeaderProfile formdata={formData}/>
          <div className="flex justify-center shadow-sm p-6 rounded-lg">
            <div className="flex justify-center shadow-sm p-6 rounded-lg">
              <AvatarUpload
                avatarUrl={avatarUrl}
                uploading={uploading}
                error={error}
                onFileChange={handleFileChange}
                setAvatarUrl={setAvatarUrl}
              />
            </div>
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
              <EditableField
                type="mobile"
                label="Phone"
                field="phone_number"
                defaultValue={user?.profile.phone_number || ''}
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
              <Input
                type="date"
                label="Date of Birth"
                isDisabled
                defaultValue={user?.profile.birth_date || ''}
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