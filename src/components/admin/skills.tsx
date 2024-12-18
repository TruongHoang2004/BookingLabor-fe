'use client';
import React from 'react';
import { 
  Card, 
  CardBody, 
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
} from '@nextui-org/react';
import { Skill, SkillRequest } from '@/interface/skill';
import { SkillService } from '@/service/skill/skill';
import { useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SkillsCardProps {
  skills: Skill[];
  onAdd: (skill: SkillRequest) => void;
  onModify: (skill: Skill) => void;
  onDelete: (skill: Skill) => void;
}
const SkillsCard: React.FC<SkillsCardProps> = ({ skills, onAdd, onModify, onDelete }) => {
    const router = useRouter();
    const {isOpen, onOpen, onClose} = useDisclosure();
  const [newSkill, setNewSkill] = useState<SkillRequest>({ name: '', description: '' });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const handleSubmit = async () => {
    try {
      await SkillService.addSkill(newSkill);
      onAdd(newSkill); // Pass the new skill to the onAdd callback
      handleClose();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleModify = async (skill: Skill) => {
    try {
      await SkillService.updateSkill(skill);
      onModify(skill); // Pass the modified skill to the onModify callback
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (skill: Skill) => {
    try {
      await SkillService.deleteSkill(skill);
      onDelete(skill); // Pass the skill to the onDelete callback
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setNewSkill({ name: '', description: '' });
    setSelectedSkill(null);
    onClose();
  };

  return (
    <>
      <Card className="w-full">
        <CardBody className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Skills</h3>
            <Button 
              color="primary" 
              size="sm"
              onPress={onOpen}
            >
              Add Skill
            </Button>
          </div>

          <div className="space-y-2">
            {skills.map((skill) => (
              <div 
                key={skill.id} 
                className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
              >
                <span>{skill.name}: {skill.description}</span>
                <Dropdown>
                  <DropdownTrigger>
                    <Button size="sm" variant="light">Actions</Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem 
                      key="modify"
                      onPress={() => {
                        setSelectedSkill(skill);
                        onOpen();
                      }}
                    >
                      Modify
                    </DropdownItem>
                    <DropdownItem 
                      key="delete"
                      className="text-danger"
                      color="danger"
                      onPress={() => handleDelete(skill)}
                    >
                      Delete
                    </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <ModalHeader>{selectedSkill ? 'Modify Skill' : 'Add New Skill'}</ModalHeader>
          <ModalBody>
            <Input
              label="Skill Name"
              value={selectedSkill ? selectedSkill.name : newSkill.name}
              onChange={(e) => {
                if (selectedSkill) {
                  setSelectedSkill({ ...selectedSkill, name: e.target.value });
                } else {
                  setNewSkill({ ...newSkill, name: e.target.value });
                }
              }}
              required
            />
            <Textarea
              label="Description"
              value={selectedSkill ? selectedSkill.description : newSkill.description}
              onChange={(e) => {
                if (selectedSkill) {
                  setSelectedSkill({ ...selectedSkill, description: e.target.value });
                } else {
                  setNewSkill({ ...newSkill, description: e.target.value });
                }
              }}
              required
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              Cancel
            </Button>
            <Button 
              color="primary" 
              onPress={() => {
                if (selectedSkill) {
                  handleModify(selectedSkill);
                } else {
                  handleSubmit();
                }
              }}
            >
              {selectedSkill ? 'Modify' : 'Add'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SkillsCard;