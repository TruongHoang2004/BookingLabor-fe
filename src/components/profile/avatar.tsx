'use client';

import { Avatar as NextAvatar } from "@nextui-org/react";
import { Camera } from "lucide-react";
import React, { useRef } from "react";

interface AvatarProps {
  avatarUrl: string | null;
  onFileSelect: (file: File) => void;
}

const AvatarUpload: React.FC<AvatarProps> = ({ avatarUrl, onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file); // Call the provided callback with the selected file
    }
  };

  return (
    <div className="relative group ">
      <NextAvatar 
        className="w-32 h-32"
        showFallback
        src={avatarUrl || undefined}
      />
      <button
        onClick={triggerFileInput}
        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
        type="button"
      >
        <Camera className="w-8 h-8 text-white" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default AvatarUpload;
