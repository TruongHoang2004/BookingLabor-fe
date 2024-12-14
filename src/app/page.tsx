'use client'
import CreatTaskSection from "@/components/homepage/CreateTaskSection";
import GetStartedSection from "@/components/homepage/GetStarted";
import TaskOptions from "@/components/homepage/TaskOptions";
import PricingAndPolicies from "@/components/homepage/PricingAndPolicies";
import Reviews from "@/components/homepage/Reviews";
import FAQ from "@/components/homepage/FAQ";

export default function Home() {
  return (
    <div>
      <CreatTaskSection />
      <TaskOptions />
      <GetStartedSection />
      <div className='bg-gradient-to-b from-emerald-800 via-emerald-900 to-zinc-950 mt-24 py-12 w-full text-white'>
        <PricingAndPolicies />
        <Reviews />
        <FAQ />
      </div>
    </div>
  )
}

