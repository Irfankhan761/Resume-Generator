import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, Button, Form, Typography, message, Spin, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Skill } from '@routes/cv-builder/types/types';
import { skillService } from '../../../services/skill-services';
import { SkillList } from './skills-list';
import { SkillModal } from './skills-modal';

const { Title } = Typography;
const { confirm } = Modal;

interface SkillFormProps {
  onChange: (data: Skill[]) => void;
}

export const SkillForm: React.FC<SkillFormProps> = ({ onChange }) => {
  const [modalForm] = Form.useForm();
  const [skillList, setSkillList] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const doLoad = async () => {
      setLoading(true);
      const { data: savedData, error } = await skillService.loadSkills();
      if (error && error.code !== 'PGRST116') {
        message.error('Failed to load skill details.');
      }
      const loadedList = savedData || [];
      setSkillList(loadedList);
      onChangeRef.current(loadedList);
      setLoading(false);
    };
    doLoad();
  }, []);

  const reloadData = useCallback(async () => {
    const { data: savedData, error } = await skillService.loadSkills();
    if (error) message.error('Failed to reload skill details.');
    const reloadedList = savedData || [];
    setSkillList(reloadedList);
    onChangeRef.current(reloadedList);
  }, []);

  const showAddModal = useCallback(() => {
    setEditingIndex(null);
    modalForm.resetFields();
    modalForm.setFieldsValue({ skills: [{ name: '' }] });
    setIsModalOpen(true);
  }, [modalForm]);

  const showEditModal = useCallback(
    (index: number) => {
      setEditingIndex(index);
      const recordToEdit = skillList[index];
      modalForm.setFieldsValue(recordToEdit);
      setIsModalOpen(true);
    },
    [skillList, modalForm]
  );

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setEditingIndex(null);
  }, []);

  const handleModalSave = useCallback(
    async (continueAdding = false) => {
      try {
        const modalValues = await modalForm.validateFields();
        setIsSaving(true);
        const currentId =
          editingIndex !== null
            ? skillList[editingIndex].id
            : `temp-${Date.now()}`;
        const itemToSave: Skill = {
          ...modalValues,
          id: currentId,
          skills: (modalValues.skills || []).filter(
            (skill: { name: string }) =>
              skill && skill.name && skill.name.trim() !== ''
          ),
        };

        await skillService.saveSkill(itemToSave);
        message.success(
          `Skills ${editingIndex !== null ? 'updated' : 'saved'} successfully!`
        );
        await reloadData();

        if (continueAdding) {
          showAddModal();
        } else {
          handleCancel();
        }
      } catch (error) {
        message.error('An error occurred while saving.');
      } finally {
        setIsSaving(false);
      }
    },
    [modalForm, editingIndex, skillList, reloadData, showAddModal, handleCancel]
  );

  const handleDelete = useCallback(
    (indexToDelete: number) => {
      const itemToDelete = skillList[indexToDelete];
      if (!itemToDelete?.id || itemToDelete.id.startsWith('temp-')) return;

      confirm({
        title: 'Are you sure you want to delete this skill category?',
        content: `This will permanently remove "${itemToDelete.category}".`,
        okText: 'Delete',
        okType: 'danger',
        onOk: async () => {
          try {
            setIsSaving(true);
            await skillService.deleteSkill(itemToDelete.id);
            message.success('Skill category deleted successfully!');
            await reloadData();
            handleCancel();
          } catch (err) {
            message.error('An error occurred while deleting.');
          } finally {
            setIsSaving(false);
          }
        },
      });
    },
    [skillList, reloadData, handleCancel]
  );

  const onSave = useCallback(() => handleModalSave(false), [handleModalSave]);
  const onSaveAndContinue = useCallback(
    () => handleModalSave(true),
    [handleModalSave]
  );
  const onDeleteFromModal = useCallback(() => {
    if (editingIndex !== null) handleDelete(editingIndex);
  }, [editingIndex, handleDelete]);

  if (loading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Card
        className="mb-8"
        style={{
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: 'none',
        }}
        title={
          <Title level={4} style={{ margin: 0 }}>
            Skills
          </Title>
        }
        extra={
          <Button onClick={showAddModal} type="primary" icon={<PlusOutlined />}>
            Add Skills
          </Button>
        }
      >
        <SkillList
          skillItems={skillList}
          onEditItem={showEditModal}
          onDeleteItem={handleDelete}
        />
      </Card>
      <SkillModal
        form={modalForm}
        isOpen={isModalOpen}
        isSaving={isSaving}
        isEditing={editingIndex !== null}
        onCancel={handleCancel}
        onSave={onSave}
        onSaveAndContinue={onSaveAndContinue}
        onDelete={onDeleteFromModal}
      />
    </>
  );
};
