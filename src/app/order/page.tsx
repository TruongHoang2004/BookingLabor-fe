// app/page.tsx
import OrderTitle from "@/components/order/OrderTitle"
import TaskInformation from "@/components/order/taskInformation"
import PaymentandBooking from "@/components/order/PaymentandBooking"

export default function Page() {
    return (
        <div className="bg-gray-200" >
            <OrderTitle />
            <TaskInformation />
            <PaymentandBooking />
        </div>


    )

}




