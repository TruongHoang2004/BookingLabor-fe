'use client';

import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button, Input, Spacer } from "@nextui-org/react";


const ChangePassword: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [oldpassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleChangePassword = async () => {
        if (password !== confirmPassword) {
            alert("Password and confirm password do not match");    
            return;
        }
    };

    return (
        <div className="flex items-center">
            <Popover
                isOpen={visible}
                onOpenChange={(open) => setVisible(open)}
                placement="right"
            >
                <PopoverTrigger>
                    <Button 
                        color="success"
                        variant="flat"
                    >
                        Change Password
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="px-4 py-3">
                        <Input
                            label="Old Password"
                            type="password"
                            value={oldpassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <Spacer y={1} />
                        <Input
                            label="New Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Spacer y={1} />
                        <Input
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Spacer y={1} />
                        <Button 
                            color="primary"
                            onClick={handleChangePassword}
                            className="w-full"
                        >
                            Submit
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default ChangePassword;