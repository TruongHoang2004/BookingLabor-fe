'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Input, Button } from "@nextui-org/react";
import { FiEye, FiEyeOff } from 'react-icons/fi';

const ResetPasswordForm: React.FC = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            alert('Password reset successful!');
            router.push('/login');
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
            style={{ backgroundImage: 'url(/background.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="max-w-md w-full mx-auto">
                <Card className="bg-opacity-70 bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] double-width">
                    <CardHeader className="flex flex-col gap-3 pb-2 pt-2">
                        <h1 className="text-4xl font-extrabold">Reset Password</h1>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 relative flex items-center">
                                <Input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="New Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder-gray-800"
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
                            <div className="mb-4 relative flex items-center">
                                <Input
                                    name="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Confirm New Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder-gray-800"
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
                            <Button
                                type="submit"
                                className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
                            >
                                Reset Password
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ResetPasswordForm;