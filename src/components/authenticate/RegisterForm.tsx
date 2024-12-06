'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Input, Button } from "@nextui-org/react";
import { Eye, EyeOff } from 'lucide-react';
import Background from '../layout-background';
import axiosInstance from '@/api/axiosInstance';
import ENDPOINTS from '@/api/endpoint';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      alert('Registration successful!');
      router.push('/login');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Background imageUrl='/img/register.jpg'/>
      <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl p-8 z-10">
        <CardHeader className="flex flex-col gap-3 pb-2 pt-2">
          <h1 className="text-4xl font-extrabold">Register</h1>
          <p className="text-sm text-gray-600">Create an account to get started.</p>
          <Divider orientation='horizontal' className="rounded-t-lg" />
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardBody className="gap-6">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            
            <Input
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
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />

            <Input
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
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </CardBody>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              color="primary"
              variant="solid"
              fullWidth
              size="lg"
            >
              Register
            </Button>

            <Link href="/" className="flex items-center gap-2 text-sm text-gray-600">
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
            </Link>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" color="primary" size="sm">
                Login here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterForm;