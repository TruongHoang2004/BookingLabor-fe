import { Task } from "@/interface/task";
import { useRouter } from "next/navigation";

export default function TaskCard({ task }: { task: Task }) {
    const formatTaskId = (id: number) => {
        const letterCode = Math.floor((id - 1) / 9999);
        const letter = String.fromCharCode(65 + letterCode);
        const number = ((id - 1) % 9999) + 1;
        return `${letter}${String(number).padStart(4, '0')}`;
    }
    const taskId = formatTaskId(task.id);
    const status = task.task_status;
    const router = useRouter();

    return (
        <div className="flex flex-col gap-4 bg-zinc-100 shadow-xl hover:shadow-lg p-4 rounded-xl h-64 transition-shadow cursor-pointer" onClick={() => { router.push("/tasks/" + taskId) }}>
            <div className="flex justify-between bg-gray-200 p-2 rounded-lg w-full">
                <div className="flex items-center gap-10">
                    <h2 className="font-bold text-gray-700">{taskId}</h2>
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold ${status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                        {status}
                    </span>
                </div>
            </div>
            <div>
                <p className="mb-2">{task.title}</p>
                <p className="mb-2">{task.description}</p>
                <p className="mb-2">{task.district}</p>
                <p className="mb-2">{task.detail_address}</p>
                <p className="mb-2">{task.estimated_duration}</p>
            </div>
        </div>
    )
}