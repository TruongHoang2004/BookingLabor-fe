'use client'
import React, { useState } from 'react';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { Edit3, Save } from 'react-feather';

interface EditableSelectProps {
  label: string;
  field: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  onChange: (field: string, value: string) => void;
}

const EditableSelect: React.FC<EditableSelectProps> = ({ label, field, options, defaultValue, onChange }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue || '');

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(field, newValue);
  };


  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
          <Select
            label={label}
            selectedKeys={new Set([selectedValue])}
            defaultSelectedKeys={new Set([defaultValue || ''])}
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
            onClick={toggleEditable}
            aria-label={isEditable ? 'Save' : 'Edit'}
          />
      </div>
    </div>
  );
};

export default EditableSelect;