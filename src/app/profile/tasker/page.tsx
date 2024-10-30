'use client';
import { Textarea, Input} from "@nextui-org/react";
import AvatarUpload from "@/components/profile/avatar";
import Header from "../../../components/profile/header";
import React, { useState } from "react";

const ProfilePage = () => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const handleFileSelect = (file: File) => {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    };

  return (
    <div className="flex flex-col items-center p-4 bg-white min-h-screen">
      {/* Header */}
      <Header 
        buttonLabel="Change to Customer Profile" 
        buttonLink="../profile"
      />

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Avatar Section with Upload Button */}
          <div className="flex justify-center mb-8">
            <div className="mt-8">
                <AvatarUpload avatarUrl={avatarUrl} onFileSelect={handleFileSelect} />
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              label="First Name"
              defaultValue="Jeremy"
              className="mr-24"
            />
            <Input
              type="text"
              label="Last Name"
              defaultValue="Truong"
            />
          </div>

          {/* Contact Info */}
          <Input
            type="email"
            label="Email"
            defaultValue="jeremytruong0204@gmail.com"
          />
          <Input
            type="password"
            label="Password"
            defaultValue="mypassword"
          />
          <Input
            isRequired
            type="number"
            label="Phone"
          />
          <Input
            isRequired
            type="text"
            label="Work Area"
          />
          <Input
            isRequired
            type="text"
            label="Schedule"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6 mt-8">
          <Input
            isRequired
            type="text"
            label="Gender"
          />

          {/* Date of birth*/}
          <div className="grid grid-cols-1 gap-4">
            <Input
              type="date"
              label="Date"
            />
          </div>
          <Input
            type="text"
            label="Expected fee"
          />
          <Textarea 
            label="Eligible to do"
          />
          <Textarea 
            label="About me"
          />
          <Textarea
            label="Payment Info"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;