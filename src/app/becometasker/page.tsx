import React from 'react';
import BecomeTaskerForm from '../../components/becometasker/BecomeTaskerForm';
import { ProtectedRoute } from '@/components/protectedRoute';

const BecomeTaskerPage = () => {
    return (
        <div>
            <ProtectedRoute>
            <BecomeTaskerForm />
            </ProtectedRoute>
        </div>
    );
};

export default BecomeTaskerPage;