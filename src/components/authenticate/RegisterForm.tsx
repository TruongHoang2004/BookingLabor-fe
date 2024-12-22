'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button, Select, SelectItem, useDisclosure, } from "@nextui-org/react";
import { Eye, EyeOff } from 'lucide-react';
import Background from '../layout-background';
import { RegisterRequest } from '@/interface/auth';
import { Gender } from '@/enum/gender';
import toast from 'react-hot-toast';
import { EmailVerify } from '@/service/auth/emailVerify';
import { OTPRequest } from '@/interface/auth';
import OTPVerification from './OtpForm';


const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterRequest & { confirmPassword: string }>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '', // Thêm trường phone_number
    password: '',
    confirmPassword: '', // Thêm trường xác nhận mật khẩu
    gender: Gender.UNKNOWN,
    date_of_birth: ''
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [OTP, setOTP] = useState('');

  const router = useRouter();
  const isValidGmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidVietnamesePhone = (phone: string): boolean => {
    const phonePattern = /^(0[2|3|5|7|8|9])+([0-9]{8})\b/;
    return phonePattern.test(phone);
  };

  const isAtLeast18 = (birthDate: string): boolean => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age >= 18;
  };

  const handleResendOTP = async () => {
    try {
      const otp: OTPRequest = { email: formData.email };
      const response = await EmailVerify.getOTP(otp);
      setOTP(response);
      toast.success("New OTP sent successfully");
    } catch (error) {
      console.error('Error getting new OTP:', error);
      toast.error("Failed to get new OTP");
    }
  };

  const handleVerifyOTP = async (otpValue: string) => {
    try {
      // Call your API to verify OTP
      // await verifyOTP(otpValue);
      toast.success("OTP verified successfully");
      // onClose();
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error("Failed to verify OTP");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { email, password, confirmPassword, ...registerData } = formData;

      if (!isValidVietnamesePhone(formData.phone_number)) {
        toast.error('Số điện thoại không phải của Việt Nam', { duration: 2000 });
        return;
      }

      if (!isValidGmail(formData.email)) {
        toast.error('Hãy nhập 1 email hợp lệ', { duration: 2000 });
        return;
      }
      if (password.length < 8) {
        toast.error('Mật khẩu phải dài hơn 8 ký tự', { duration: 2000 });
        return;
      }

      if (!isAtLeast18(formData.date_of_birth)) {
        toast.error('Bạn phải trên 18 tuổi', { duration: 2000 });
        return;
      }

      if (!/[A-Z]/.test(password)) {
        toast.error('Mật khẩu phải có 1 ký tự viết hoa', { duration: 2000 });
        return;
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        toast.error('Mật khẩu phải có 1 ký tự đặc biết', { duration: 2000 });
        return;
      }

      if (password !== confirmPassword) {
        toast.error('Mật khẩu không trùng khớp', { duration: 2000 });
        return;
      }
      
      const otp: OTPRequest = { email: formData.email };
      const response = await EmailVerify.getOTP(otp);
      console.log(response)
      setOTP(response);
      toast.success("OTP Retrieved")
    } catch (error) {
      console.error('Error registering:', error);
      toast.error("Can not get OTP")
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <Background imageUrl='/img/register.jpg' />
      <Card className="top-1/2 left-1/2 z-10 absolute flex flex-col p-0 w-full max-w-2xl max-h-[90vh] transform -translate-x-1/2 -translate-y-1/2">
        <CardHeader className="flex flex-col gap-3 px-8 pt-4">
          <h1 className="font-extrabold text-4xl">Register</h1>
          <p className="text-gray-600 text-sm">Create your account to get started.</p>
          <Divider orientation='horizontal' className="rounded-t-lg" />
        </CardHeader>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <CardBody className="gap-4 px-8 py-4 overflow-y-auto">
            <div className="flex gap-4">
              <Input
                size="sm"
                label="First Name"
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
              />
              <Input
                size="sm"
                label="Last Name"
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                required
              />
            </div>

            <Input
              size="sm"
              label="Email"
              type="text"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              size="sm"
              label="Phone Number"
              type="tel"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              required
            />

            <Select
              size="sm"
              label="Gender"
              selectedKeys={[formData.gender]}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
              required
            >
              {Object.values(Gender).map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </Select>

            <Input
              size="sm"
              label="Date of Birth"
              type="date"
              value={formData.date_of_birth}
              onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
              required
            />

            <Input
              size="sm"
              label="Password"
              type={showPassword ? "text" : "password"}
              endContent={
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Eye className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              }
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Input
              size="sm"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              endContent={
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <Eye className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              }
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />

            {/* Optional: Role selection if needed */}
            {/* <Select
              size="sm"
              label="Role"
              selectedKeys={[formData.role]}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
            >
              {Object.values(Role).map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </Select> */}
          </CardBody>

          <CardFooter className="flex flex-col gap-4 px-8 py-4 border-t">
            <Button
              onPress={onOpen}
              type="submit"
              color="primary"
              variant="solid"
              fullWidth
              size="lg"
            >
              Register
            </Button>
            <OTPVerification
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              onResendOTP={handleResendOTP}
              onVerifyOTP={handleVerifyOTP}
              email={formData.email}
              formData={formData}
              be_otp={OTP}
            />
            <p onClick={() => router.push('/')} className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Back to Home
            </p>

            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <span onClick={() => router.push('/login')} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                Login here
              </span>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterForm;