'use client'
import { Suspense  } from "react";
import TaskFormPage from "@/components/taskform/TaskFormPage";
import { ProtectedRoute } from "@/components/protectedRoute";

export default function Home() {
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute>
                <TaskFormPage />
            </ProtectedRoute>
        </Suspense>
    )
}