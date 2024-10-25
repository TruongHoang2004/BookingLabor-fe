import React from 'react'
import { BiSolidCheckCircle } from "react-icons/bi";

interface props {
    title?: string;  // cho phép tùy chỉnh tiêu đề "Personal"
    price?: string;  // cho phép tùy chỉnh giá "$5"
    unit?: string;   // cho phép tùy chỉnh "p/transaction"
    features: string[];  // mảng chứa các feature muốn hiển thị
}

const PricingAndPoliciesProps: React.FC<props> = ({ 
    title = "Personal", 
    price = "$5", 
    unit = "p/transaction",
    features = []
  }) => {
    return (
          <div>
            <div className='rounded-xl bg-slate-50 text-slate-900 p-10 w-80'>
              <p className='text-xl font-bold text-gray-500 mb-4'>{title}</p>
              <p className='text-6xl font-bold mb-10'>{price} <span className='text-lg text-gray-500'>{unit}</span></p>
              {features.map((feature, index) => (
                <div key={index} className='flex items-center mb-3'>
                  <BiSolidCheckCircle size={22} className='inline mr-2'/>
                  <p className='text-base font-semibold'>{feature}</p>
                </div>
              ))}
              <button className='mt-10 bg-zinc-800 font-medium text-lg bg-black text-white px-3 py-1.5 rounded-lg hover:bg-zinc-600'>Get started</button>
            </div>  
          </div>
    )
}

export default PricingAndPoliciesProps;