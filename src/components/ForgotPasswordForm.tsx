'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Input, Button } from "@nextui-org/react";

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
        <div className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
            style={{ backgroundImage: 'url(/background.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="max-w-md w-full mx-auto">
                <Card className="bg-opacity-70 bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] double-width">
                    <CardHeader className="flex flex-col gap-3 pb-2 pt-2">
                        <h1 className="text-4xl font-extrabold">Forgot Password</h1>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder-gray-800"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
                            >
                                Send Reset Link
                            </Button>
                        </form>
                    </CardBody>
                    <CardFooter className="flex justify-center mt-6">
                        <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                            Back to Login
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;