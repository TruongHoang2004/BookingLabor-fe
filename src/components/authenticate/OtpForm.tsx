import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Clock } from 'lucide-react';

const OTPVerification = ({ isOpen, onOpenChange, onResendOTP, email }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
    const [isExpired, setIsExpired] = useState(false);

    // Timer effect
    useEffect(() => {
        if (!isOpen) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setIsExpired(true);
                    setOtp(['', '', '', '', '', '']); // Clear OTP when expired
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
            setOtp(['', '', '', '', '', '']);
        }
    }, [isOpen]);

    // Handle OTP input
    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isExpired) return;

        if (isNaN(Number(element.value))) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.value && index < 5) {
            const nextInput = element.parentElement?.nextElementSibling?.querySelector('input');
            if (nextInput) nextInput.focus();
        }
    };

    // Handle backspace
    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = e.currentTarget.parentElement?.previousElementSibling?.querySelector('input');
            if (prevInput) {
                prevInput.focus();
                setOtp([...otp.map((d, idx) => (idx === index - 1 ? '' : d))]);
            }
        }
    };

    const handleResend = async () => {
        try {
            await onResendOTP();
            setTimeLeft(300);
            setIsExpired(false);
            setOtp(['', '', '', '', '', '']);
        } catch (error) {
            console.error('Error resending OTP:', error);
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

                            <div className="flex justify-center gap-2 mb-4">
                                {otp.map((digit, index) => (
                                    <div key={index} className="w-12">
                                        <Input
                                            size="lg"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleChange(e.target, index)}
                                            onKeyDown={(e) => handleBackspace(e, index)}
                                            className="text-center text-xl"
                                            disabled={isExpired}
                                            classNames={{
                                                input: "text-center"
                                            }}
                                        />
                                    </div>
                                ))}
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
                                disabled={otp.some(digit => !digit) || isExpired}
                            >
                                Verify OTP
                            </Button>

                            <Button
                                color="secondary"
                                variant="light"
                                fullWidth
                                onClick={handleResend}
                                disabled={!isExpired && timeLeft > 0}
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