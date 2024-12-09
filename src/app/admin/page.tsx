'use client'
import React from 'react';
import PricingAndPolicies from '@/components/homepage/PricingAndPolicies';
import Reviews from '@/components/homepage/Reviews';
import Dashboard from '@/components/admin/dashboard';
const Admin = () => {
    return (
        <div>
            <h1 className="text-5xl font-extrabold text-emerald-800 text-center py-8">
                Welcome Back,
                <br/>
                System Administrator of Dream Labour
            </h1>
            <Dashboard/>
            <div className='bg-gradient-to-b from-emerald-800 via-emerald-900 to-zinc-950 text-white w-full mt-24 py-12'>
                <PricingAndPolicies/>
                <Reviews/>
            </div>
        </div>
    )
}

export default Admin;
