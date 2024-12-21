'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, Divider, Input, Button } from "@nextui-org/react";
import { Eye, EyeOff } from 'lucide-react';
import Background from '../layout-background';

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
        <div className="flex min-h-screen items-center justify-center">
            <Background imageUrl='./img/resetpassword.jpg' />
            <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl p-8 z-10">
                <CardHeader className="flex flex-col gap-3 pb-2 pt-2">
                    <h1 className="text-4xl font-extrabold">Reset Password</h1>
                    <p className="text-sm text-gray-600">Enter your new password</p>
                    <Divider orientation='horizontal' className="rounded-t-lg" />
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                endContent={
                                    <button type="button" onClick={togglePasswordVisibility}>
                                        {showPassword ? (
                                            <Eye className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <EyeOff className="w-5 h-5 text-gray-400" />
                                        )}
                                    </button>
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirm New Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                endContent={
                                    <button type="button" onClick={togglePasswordVisibility}>
                                        {showPassword ? (
                                            <Eye className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <EyeOff className="w-5 h-5 text-gray-400" />
                                        )}
                                    </button>
                                }
                            />
                        </div>
                        <Button
                            type="submit"
                            color="primary"
                            variant="solid"
                            fullWidth
                            size="lg"
                        >
                            Reset Password
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default ResetPasswordForm;