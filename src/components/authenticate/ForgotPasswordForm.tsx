'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Input, Button } from "@nextui-org/react";
import Background from '../layout-background';

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Password reset link sent to:', email);
            alert('Password reset link sent!');
            router.push('/resetpassword');
        } catch (error) {
            console.error('Error sending password reset link:', error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Background imageUrl='./img/forgotpassword.jpg' />
            <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl p-8 z-10">
                <CardHeader className="flex flex-col gap-3 pb-2 pt-2">
                    <h1 className="text-4xl font-extrabold">Forgot Password</h1>
                    <p className="text-sm text-gray-600">Enter your email to verify account</p>
                    <Divider orientation='horizontal' className="rounded-t-lg" />
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            color="primary"
                            variant="solid"
                            fullWidth
                            size="lg"
                        >
                            Send Reset Link
                        </Button>
                    </form>
                </CardBody>
                <CardFooter className="flex flex-col gap-4">

                    <Link href="/login" className="flex items-center gap-2 text-sm text-gray-600">
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
                        Back to Login
                    </Link>
                </CardFooter>
            </Card>
        </div >
    );
};

export default ForgotPasswordForm;