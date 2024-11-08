// app/page.tsx
import OrderTitle from "@/components/OrderTitle"
import TaskInformation from "@/components/taskInformation"
import PaymentandBooking from "@/components/PaymentandBooking"

export default function Page() {
    return (
        <div className="bg-gray-200" >
            <OrderTitle />
            <TaskInformation />
            <PaymentandBooking />


        </div>


    )

}




