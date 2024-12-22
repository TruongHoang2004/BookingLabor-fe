import React, { useState, useEffect, useRef } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Clock } from 'lucide-react';
import { RegisterRequest } from '@/interface/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { authService } from '@/service/auth/auth-service';

interface OTPVerificationProps {
    isOpen: boolean;
    onOpenChange: () => void;
    onResendOTP: () => Promise<void>;
    email: string;
    formData: RegisterRequest & { confirmPassword: string }
    be_otp: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
    isOpen,
    onOpenChange,
    onResendOTP,
    email,
    formData,
    be_otp
}) => {
    const [otp, setOtp] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState<number>(300);
    const [isExpired, setIsExpired] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    // Timer effect
    useEffect(() => {
        if (!isOpen) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setIsExpired(true);
                    setOtp('');
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen]);

    // Reset states when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeLeft(300);
            setIsExpired(false);
            setOtp('');
            // Focus input when modal opens
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 100);
        }
    }, [isOpen]);

    // Handle input change
    const handleChange = (value: string): void => {
        if (isExpired) return;

        // Only allow numbers and limit to 6 digits
        const numericValue = value.replace(/[^0-9]/g, '').slice(0, 6);
        setOtp(numericValue);
    };

    const handleResend = async (): Promise<void> => {
        try {
            await onResendOTP();
            setTimeLeft(300);
            setIsExpired(false);
            setOtp('');
            inputRef.current?.focus();
        } catch (error) {
            console.error('Error resending OTP:', error);
        }
    };

    const handleVerify = async (): Promise<void> => {
        try {
            if(parseInt(otp,10) === parseInt(be_otp)) {
                toast.success('VALID OTP')
                await authService.register(formData)
                router.push('/login');
            }
        } catch (error) {
            toast.error('Failed to Register')
            console.error('Error verifying OTP:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="bg-white dark:bg-gray-900"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col items-center gap-1">
                            <h2 className="font-bold text-xl">OTP Verification</h2>
                            <p className="text-gray-500 text-sm">
                                Enter the verification code sent to {email}
                            </p>
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex justify-center items-center mb-4">
                                <Clock className="mr-2 w-5 h-5 text-gray-500" />
                                <span className={`font-mono ${timeLeft <= 60 ? 'text-red-500' : 'text-gray-600'}`}>
                                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                                </span>
                            </div>

                            <div className="flex justify-center mb-4">
                                <div className="w-48">
                                    <Input
                                        ref={inputRef}
                                        size="lg"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => handleChange(e.target.value)}
                                        className="text-center text-xl"
                                        disabled={isExpired}
                                        placeholder="Enter 6-digit OTP"
                                        classNames={{
                                            input: "text-center"
                                        }}
                                    />
                                </div>
                            </div>

                            {isExpired && (
                                <div className="mb-4 text-center text-red-500">
                                    OTP has expired. Please request a new one.
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter className="flex flex-col gap-4">
                            <Button
                                color="primary"
                                variant="solid"
                                fullWidth
                                disabled={otp.length !== 6 || isExpired}
                                onPress={handleVerify}
                            >
                                Verify OTP
                            </Button>

                            <Button
                                color="secondary"
                                variant="light"
                                fullWidth
                                onClick={handleResend}
                                //disabled={!isExpired && timeLeft > 0}
                            >
                                Resend OTP
                            </Button>

                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                                fullWidth
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default OTPVerification;