// services/page.tsx
'use client'
import ServiceIntro from "@/components/services/ServiceIntro"
import CleaningProps from "@/components/services/CleaningProps"
import MovingProps from "@/components/services/MovingProps"
import AssemblyProps from "@/components/services/AssemblyProps"
import YardWorkProps from "@/components/services/YardWorkProps"
import OfficeProps from "@/components/services/OfficeProps"
import PaintingProps from "@/components/services/PaintingProps"
import Masonry from "react-masonry-css"

export default function Home() {
    const breakpointColumnsObj = {
        default: 3, // 1550
        1400: 2, // 1100 la 2 cot 
        920: 1 // 600px thi la 1 cot
    }
    return(
        <div className="mb-10">
            <ServiceIntro/>
            <div className="flex justify-center">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex w-11/12 3xl:w-10/12"
                    columnClassName="bg-clip-padding space-y-6"
                >
                    <div className="flex justify-center">
                        <CleaningProps />
                    </div>
                    <div className="flex justify-center">
                        <MovingProps />
                    </div>
                    <div className="flex justify-center">
                        <AssemblyProps />
                    </div>
                    <div className="flex justify-center">
                        <YardWorkProps />
                    </div>
                    <div className="flex justify-center">
                        <OfficeProps />
                    </div>
                    <div className="flex justify-center">
                        <PaintingProps />
                    </div>
                </Masonry>
            </div>
        </div>
    )
}
/*
  <div className="flex flex-wrap gap-x-10 gap-y-5 w-10/12 m-auto mb-10 justify-center">
                <CleaningProps/>
                <MovingProps/>
                <AssemblyProps/>
                <YardWorkProps/>
                <OfficeProps/>
                <PaintingProps/>
    </div>
*/