// app/page.tsx
'use client'
import OrderTitle from "@/components/order/OrderTitle"
import TaskInformation from "@/components/order/taskInformation"
import { ProtectedRoute } from "@/components/protectedRoute"

export default function Page() {
    return (
        <ProtectedRoute>
        <div className="bg-gray-200" >
            <OrderTitle />
            <TaskInformation />
        </div>
        </ProtectedRoute>


    )

}




