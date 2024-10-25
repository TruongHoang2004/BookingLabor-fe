'use client'
import Header from "@/components/Header";
import CreatTaskSection from "@/components/homepage/CreateTaskSection";
import GetStartedSection from "@/components/homepage/GetStarted";
import TaskOptions from "@/components/homepage/TaskOptions";
import PricingAndPolicies from "@/components/homepage/PricingAndPolicies";
import Reviews from "@/components/homepage/Reviews";
import FAQ from "@/components/homepage/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <CreatTaskSection/> 
      <TaskOptions/>
      <GetStartedSection/>
      <div className='bg-gradient-to-b from-emerald-800 via-emerald-900 to-zinc-950 text-white w-full mt-24 py-12'>
        <PricingAndPolicies/>
        <Reviews/>
        <FAQ 
          question={['What is DreamLabour','What is DreamLabour','What is DreamLabour']}
          answer={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          ]}
          />
      </div>
    </div>
  )
}

