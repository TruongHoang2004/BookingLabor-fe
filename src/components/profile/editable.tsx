import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { Edit3, Save } from 'react-feather';

interface EditableFieldProps {
  label: string;
  type: string;
  defaultValue?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ label, type, defaultValue }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(defaultValue || '');

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        label={label}
        type={type}
        value={value}
        onChange={handleChange}
        isDisabled={!isEditable}
        fullWidth
      />
      <Button
        isIconOnly
        startContent={isEditable ? <Save size={16} /> : <Edit3 size={16} />}
        onClick={toggleEditable}
        aria-label={isEditable ? 'Save' : 'Edit'}
      />
    </div>
  );
};

export default EditableField;