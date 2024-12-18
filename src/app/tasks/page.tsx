'use client'
//import TaskSearchBar from "@/components/tasks/SearchBar";
import TasksList from "@/components/tasks/TasksList";
import { ProtectedRoute } from '../../components/protectedRoute';

export default function TasksView() {
    return (
  < ProtectedRoute >
         <div className="flex flex-col p-4 w-full">
            <div className="desktop:w-5/6 laptop:w-5/6 mx-auto w-full">
                <TasksList />
            </div>
        </div>
   </ProtectedRoute>
    );
}