'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button } from "@nextui-org/react";
import { Eye, EyeOff } from 'lucide-react';
import Background from '../layout-background';
import { authService } from '@/service/auth/auth-service';


const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Dispatch login action with email and password
      const email = formData.email;
      const password = formData.password;
      await authService.login({ email, password });
      const response = await authService.login({ email, password });
      if (response.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <Background />
      <Card className="top-1/2 left-1/2 z-10 absolute p-0 w-full max-w-2xl max-h-[90vh] transform -translate-x-1/2 -translate-y-1/2 flex flex-col">
        <CardHeader className="flex flex-col gap-3 pt-4 px-8">
          <h1 className="font-extrabold text-4xl">Login</h1>
          <p className="text-gray-600 text-sm">Welcome back! Please enter your details.</p>
          <Divider orientation='horizontal' className="rounded-t-lg" />
        </CardHeader>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <CardBody className="gap-4 overflow-y-auto px-8 py-4">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              endContent={
                <button type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <Eye className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              }
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="border-gray-300 rounded"
                />
                <span className="text-sm">Remember me</span>
              </label>
              <p onClick={() => router.push('/forgotpassword')} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                Forgot password?
              </p>
            </div>
          </CardBody>

          <CardFooter className="flex flex-col gap-4 px-8 py-4 border-t">
            <Button
              type="submit"
              color="primary"
              variant="solid"
              fullWidth
              size="lg"
            >
              Login
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
              Don't have an account?{" "}
              <span onClick={() => router.push('/register')} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                Register here
              </span>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default LoginForm;