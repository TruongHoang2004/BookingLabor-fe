'use client';
import { Avatar as NextAvatar } from "@nextui-org/react";
import { Camera } from "lucide-react";
import React, { useRef } from "react";
import { userService } from "@/service/user/user";
import toast from "react-hot-toast";

interface AvatarUploadProps {
  avatarUrl: string | undefined;
  uploading: boolean;
  error: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setAvatarUrl: (url: string | undefined) => void;
}

const AvatarUpload = ({ avatarUrl, uploading, error, onFileChange, setAvatarUrl }: AvatarUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const deleteAvatar = async () => {
    try {
      await userService.updateAvatarURL('');
      setAvatarUrl(undefined);
    } catch (error) {
      toast.error('Xóa ảnh không thành công');
      throw error;
    }

  }

  return (
    <div className="space-y-4">
      <div className="relative group">
        <NextAvatar
          className="w-32 h-32"
          showFallback
          src={avatarUrl || undefined}
        />
        <button
          onClick={triggerFileInput}
          disabled={uploading}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
          type="button"
        >
          <Camera className="w-8 h-8 text-white" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          disabled={uploading}
          className="hidden"
        />
      </div>
      {uploading && <p className="text-gray-500 text-sm">Uploading...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {avatarUrl !== undefined && (
        <button
          onClick={deleteAvatar}
          className="flex justify-center w-[125px] mt-2 bg-red-500 hover:bg-red-700 text-white text-sm font-medium py-1 px-3 rounded-full"
          type="button"
        >
          Xóa avatar
        </button>
      )}
    </div>
  );
};

export default AvatarUpload;