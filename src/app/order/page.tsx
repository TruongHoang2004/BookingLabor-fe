// app/page.tsx
import OrderTitle from "@/components/OrderTitle"
import TaskName from "@/components/taskName"
import TaskInfor from "@/components/taskinfor"
import Tasker from "@/components/tasker"
import TaskerInfor from "@/components/taskerinfor"
import Payment from "@/components/payment"
import PaymentMethod from "@/components/paymentMethod"
import Note from "@/components/note"
import BookingButton from "@/components/bookingButton"

export default function Page() {
    return (
        <div>
            <OrderTitle />
            <TaskName />
            <TaskInfor />
            <Tasker />
            <TaskerInfor />
            <Payment />
            <PaymentMethod />
            <Note />
            <BookingButton />

        </div>


    )
}