'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button, Select, SelectItem } from "@nextui-org/react";
import { Eye, EyeOff } from 'lucide-react';
import Background from '../layout-background';
import { authService } from '@/service/auth/auth-service';
import { RegisterRequest } from '@/interface/auth';
import { Gender } from '@/enum/gender';
import toast from 'react-hot-toast';

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const isValidGmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidVietnamesePhone = (phone: string): boolean => {
    const phonePattern = /^(0[2|3|5|7|8|9])+([0-9]{8})\b/;
    return phonePattern.test(phone);
  };

  const isAtLeast16 = (birthDate: string): boolean => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age >= 18;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { email, password, confirmPassword, ...registerData } = formData;

      if (!isValidVietnamesePhone(formData.phone_number)) {
        toast.error('Please enter a valid Vietnamese phone number', { duration: 2000 });
        return;
      }

      if (!isValidGmail(formData.email)) {
        toast.error('Please enter a valid Gmail address', { duration: 2000 });
        return;
      }
      if (password.length < 8) {
        toast.error('Password must be at least 8 characters long', { duration: 2000 });
        return;
      }

      if (!isAtLeast16(formData.date_of_birth)) {
        toast.error('You must be at least 18 years old to register', { duration: 2000 });
        return;
      }

      if (!/[A-Z]/.test(password)) {
        toast.error('Password must contain at least one uppercase letter', { duration: 2000 });
        return;
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        toast.error('Password must contain at least one special character', { duration: 2000 });
        return;
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match', { duration: 2000 });
        return;
      }

      await authService.register({
        ...registerData,
        email,
        password
      });

      router.push('/login');
    } catch (error) {
      console.error('Error registering:', error);
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
              type="submit"
              color="primary"
              variant="solid"
              fullWidth
              size="lg"
            >
              Register
            </Button>

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