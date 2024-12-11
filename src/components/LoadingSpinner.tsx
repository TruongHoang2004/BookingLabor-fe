
'use client'

import { Spinner } from '@nextui-org/react';

    export default function LoadingSpinner() {
        return (
            <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
                <Spinner size="lg" color="success" label="Loading..." />
            </div>
        );
    }
