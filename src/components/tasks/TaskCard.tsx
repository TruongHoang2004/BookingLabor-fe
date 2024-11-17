import { Task } from "@/types/Task";
import { useRouter } from "next/navigation";

export default function TaskCard({ task }: { task: Task }) {
    const formatTaskId = (id: number) => {
        const letterCode = Math.floor((id - 1) / 9999);
        const letter = String.fromCharCode(65 + letterCode);
        const number = ((id - 1) % 9999) + 1;
        return `${letter}${String(number).padStart(4, '0')}`;
    }
    const taskId = formatTaskId(task.id);

    const router = useRouter();

    return (
        <div className="flex flex-col gap-4 bg-zinc-100 shadow-xl hover:shadow-lg p-4 rounded-xl h-64 transition-shadow cursor-pointer" onClick={() => { router.push("/tasks/" + taskId) }}>
            <div className="bg-gray-200 p-2 rounded-lg w-full">
                <h2 className="font-bold text-gray-700">{taskId}</h2>
            </div>
            <div>
                <p className="mb-2">{task.title}</p>
                <p>{task.description}</p>
                <p>{task.location}</p>
                <p>{task.category}</p>
            </div>
        </div>
    )
}