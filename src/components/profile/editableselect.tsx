'use client'
import React, { useState } from 'react';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { Edit3, Save } from 'react-feather';

interface EditableSelectProps {
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}

const EditableSelect: React.FC<EditableSelectProps> = ({ label, options, defaultValue }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Select
        label={label}
        selectionMode='multiple'
        defaultSelectedKeys={selectedValue}
        onChange={handleChange}
        isDisabled={!isEditable}
        fullWidth
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      <Button
        isIconOnly
        startContent={isEditable ? <Save size={16} /> : <Edit3 size={16} />}
        onPress={toggleEditable}
        aria-label={isEditable ? 'Save' : 'Edit'}
      />
    </div>
  );
};

export default EditableSelect;