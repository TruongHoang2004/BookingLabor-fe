'use client'
import { Suspense  } from "react";
import TaskFormPage from "@/components/taskform/TaskFormPage";

export default function Home() {
    <Suspense fallback={<div>Loading...</div>}>
            <TaskFormPage />
    </Suspense>
}