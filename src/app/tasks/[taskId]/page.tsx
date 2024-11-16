'use client'
import { useRouter } from "next/navigation";

export default function TaskDetail({
    params: { taskId }
}: {
    params: { taskId: string }
}) {
    const router = useRouter();

    return (
        <div className="p-4">
            <button
                onClick={() => router.back()}
                className="bg-gray-100 hover:bg-gray-200 mb-4 px-4 py-2 rounded-lg"
            >
                Back
            </button>
            <h1 className="font-bold text-xl">Task ID: {taskId}</h1>
        </div>
    );
}