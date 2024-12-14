// app/page.tsx
'use client'
import OrderTitle from "@/components/order/OrderTitle"
import TaskInformation from "@/components/order/taskInformation"

export default function Page() {
    return (
        <div className="bg-gray-200" >
            <OrderTitle />
            <TaskInformation />

        </div>


    )

}




