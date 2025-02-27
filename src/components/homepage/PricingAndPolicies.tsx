'use client';
import React from 'react';
import PricingAndPoliciesProps from './PricingAndPoliciesProps';

const PricingAndPolicies: React.FC = () => {
    return (
        <div>
            <div className='w-8/12 m-auto flex justify-center mb-16'>
                <p className='text-4xl font-bold border-b-2 border-zinc-600 pb-2 px-10'>PRICING and POLICIES</p>
            </div>
            <div className='w-10/12 m-auto flex flex-wrap gap-x-10 justify-center gap-y-10'>
                <PricingAndPoliciesProps
                    title="Basic"
                    price="$5"
                    unit="p/month"
                    features={[
                    "Basic support",
                    "Access to standard features",
                    "Email consultation"
                ]}/>
                <PricingAndPoliciesProps
                    title="Professional"
                    price="$15"
                    unit="p/month"
                    features={[
                    "Guarantee completion",
                    "24/7 support",
                    "Free consultation",
                    "Premium features"
                ]}/>
                <PricingAndPoliciesProps
                    title="Enterprise"
                    price="$30"
                    unit="p/month"
                    features={[
                    "Dedicated manager",
                    "Priority support",
                    "Custom solutions",
                    "All premium features"
                ]}/>
            </div>
        </div>
    )
}

export default PricingAndPolicies;