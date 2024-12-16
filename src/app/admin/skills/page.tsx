// pages/admin/skills/page.tsx
'use client';

import { ScrollShadow } from "@nextui-org/react";
import { SkillRequest, Skill } from "@/interface/skill";
import SkillsCard from "@/components/admin/skills";
import { SkillService } from "@/service/skill/skill";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ProtectedRoute } from "@/components/protectedRoute";
import useSWR from 'swr';

export default function SkillsPage() {
  const { data, isLoading, error, mutate } = useSWR('/skills', SkillService.getAllSkills);

  const handleAdd = async (newSkill: SkillRequest) => {
    await mutate(); // Refresh the skills list
    console.log("Added skill:", newSkill);
  };

  const handleModify = async (skill: Skill) => {
    await mutate(); // Refresh the skills list
    console.log("Modified skill:", skill);
  };

  const handleDelete = async (skill: Skill) => {
    await mutate(); // Refresh the skills list
    console.log("Deleted skill:", skill);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-5xl font-extrabold text-emerald-800 text-center py-8">
          Skills Management
        </h1>
        <div className="mt-12 w-full mx-auto bg-white p-6 rounded-lg shadow-md space-y-2">
          <ScrollShadow className="h-[800px] w-full">
            <div className="space-y-4 p-4">
              <SkillsCard
                skills={[...(data || [])].reverse()}
                onAdd={handleAdd}
                onModify={handleModify}
                onDelete={handleDelete}
              />
            </div>
          </ScrollShadow>
        </div>
      </div>
    </ProtectedRoute>
  );
}