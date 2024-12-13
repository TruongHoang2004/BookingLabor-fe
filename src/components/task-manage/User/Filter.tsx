// components/tasks/TaskFilter.tsx
import { TaskCardforUser } from "@/types/Tasks";

interface TaskFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    tasks: TaskCardforUser[];
}

export default function TaskFilter({
    selectedCategory,
    onCategoryChange,
    tasks
}: TaskFilterProps) {
    // Lấy danh sách categories duy nhất
    const categories = ['all', ...new Set(tasks.map(task => task.district))];

    return (
        <div className="flex justify-end mb-6 w-full">
            <select title="abc"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="bg-white shadow-md hover:shadow-lg px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-shadow focus:outline-none"
            >
                {categories.map(category => (
                    <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                    </option>
                ))}
            </select>
        </div>
    );
}