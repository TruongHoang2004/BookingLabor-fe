'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link, Input, Button } from "@nextui-org/react";
import { FiEye, FiEyeOff } from 'react-icons/fi';
const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      alert('Login successful!');
      router.push('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
      style={{ backgroundImage: 'url(/background.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <div className="max-w-md w-full mx-auto">
        <form className="bg-opacity-70 bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] double-width" onSubmit={handleSubmit}>
          <div className="mb-12">
            <h3 className="text-gray-800 text-3xl font-extrabold">Login</h3>
          </div>

          <div>
            <div className="relative flex items-center mb-4">
              <Input
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder-gray-800"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="relative flex items-center">
              <Input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder-gray-800"
                placeholder="Enter password"
                endContent={
                  <button type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <FiEye className="w-5 h-5 text-gray-400" />
                    ) : (
                      <FiEyeOff className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                }
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                Remember me
              </label>
            </div>
            <div>
              <Link href="/forgotpassword" className="text-blue-600 text-sm font-semibold hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          <Link href="/" className="flex items-center" style={{ transform: 'translate(-5px, 20px)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className="ml-2">Quay lại trang chủ</span>
          </Link>

          <div className="mt-12">
            <Button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
            >
              Login
            </Button>
            <p className="text-gray-800 text-sm text-center mt-6">
              Don't have an account?
              <Link href="/register" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                Register here
              </Link>
            </p>
          </div>
          <hr className="my-6 border-gray-400" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;