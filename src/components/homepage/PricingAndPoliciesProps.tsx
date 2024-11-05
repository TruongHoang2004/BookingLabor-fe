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
      <div className='bg-slate-50 p-10 rounded-xl w-80 text-slate-900'>
        <p className='mb-4 font-bold text-gray-500 text-xl'>{title}</p>
        <p className='mb-10 font-bold text-6xl'>{price} <span className='text-gray-500 text-lg'>{unit}</span></p>
        {features.map((feature, index) => (
          <div key={index} className='flex items-center mb-3'>
            <BiSolidCheckCircle size={22} className='inline mr-2' />
            <p className='font-semibold text-base'>{feature}</p>
          </div>
        ))}
        <button className='bg-black hover:bg-zinc-600 mt-10 px-3 py-1.5 rounded-lg font-medium text-lg text-white'>Get started</button>
      </div>
    </div>
  )
}

export default PricingAndPoliciesProps;