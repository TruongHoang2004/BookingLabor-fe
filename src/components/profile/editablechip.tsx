import React, { useState } from 'react';
import { Input, Button, Chip } from '@nextui-org/react';
import { Edit3, Save} from 'react-feather';

interface EditableChipInputProps {
  label: string;
  defaultSkills?: string[];
}

const EditableChipInput: React.FC<EditableChipInputProps> = ({ label, defaultSkills = [] }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(defaultSkills);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const handleSkillAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && skillInput.trim() !== '') {
      event.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
      <Input
          label={label}
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleSkillAdd}
          isDisabled={!isEditable}
          className="mt-2"
        />
        <Button
          isIconOnly
          startContent={isEditable ? <Save size={16} /> : <Edit3 size={16} />}
          onPress={toggleEditable}
          aria-label={isEditable ? 'Save' : 'Edit'}
        />
      </div>    
      <div className="flex flex-wrap mt-2 gap-2">
        {skills.map((skill) => (
          <Chip
            key={skill}
            variant="solid"
            color="default"
            onClose={() => handleSkillRemove(skill)}
            className="flex items-center"
          >
            {skill}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default EditableChipInput;