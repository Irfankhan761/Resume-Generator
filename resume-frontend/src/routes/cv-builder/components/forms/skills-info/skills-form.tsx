import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
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

const SkillFormComponent: React.FC<SkillFormProps> = ({ onChange }) => {
  const [modalForm] = Form.useForm<Skill>();
  const [skillList, setSkillList] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const isMounted = useRef(false);

  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const loadData = useCallback(async (showLoadingSpinner = true) => {
    if (showLoadingSpinner) setLoading(true);
    try {
      const { data: savedData, error } = await skillService.loadSkills();

      if (error) {
        // Only show error if it's not a "no data found" error
        if ((error as any).code !== 'PGRST116') {
          console.error('Failed to load skill details:', error);
          message.error('Failed to load skill details.');
        }
      }

      const loadedList = savedData || [];
      console.log('Loaded skill list:', loadedList);
      setSkillList(loadedList);
      onChangeRef.current(loadedList);
    } catch (err) {
      console.error('Error loading skills:', err);
      message.error(
        err instanceof Error ? err.message : 'An unknown error occurred.'
      );
    } finally {
      if (showLoadingSpinner) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      loadData();
    }
  }, [loadData]);

  const showAddModal = useCallback(() => {
    setEditingIndex(null);
    modalForm.resetFields();
    modalForm.setFieldsValue({
      skills: [{ name: '' }],
      category: '',
    });
    setIsModalOpen(true);
  }, [modalForm]);

  const showEditModal = useCallback(
    (index: number) => {
      const recordToEdit = skillList[index];
      if (recordToEdit) {
        setEditingIndex(index);

        const formValues = {
          ...recordToEdit,
          skills:
            recordToEdit.skills && recordToEdit.skills.length > 0
              ? recordToEdit.skills
              : [{ name: '' }],
        };

        console.log('Setting form values for edit:', formValues);
        modalForm.setFieldsValue(formValues);
        setIsModalOpen(true);
      }
    },
    [skillList, modalForm]
  );

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setEditingIndex(null);
    modalForm.resetFields();
  }, [modalForm]);

  const handleModalSave = useCallback(
    async (continueAdding = false) => {
      try {
        await modalForm.validateFields();
        const modalValues = modalForm.getFieldsValue();

        console.log('Form values before saving:', modalValues);

        setIsSaving(true);

        // Determine the ID for the item
        const currentId =
          editingIndex !== null
            ? skillList[editingIndex].id
            : `temp-${Date.now()}`;

        // Format the item for saving
        const itemToSave: Skill = {
          id: currentId,
          category: modalValues.category?.trim() || '',
          skills: (modalValues.skills || []).filter(
            (skill: { name: string }) =>
              skill && skill.name && skill.name.trim() !== ''
          ),
        };

        console.log('Item to save:', itemToSave);

        const { error, data } = await skillService.saveSkill(itemToSave);

        if (error) {
          console.error('Save error:', error);
          throw new Error(error.message || 'Failed to save skills');
        }

        console.log('Save successful:', data);

        message.success(
          `Skills ${editingIndex !== null ? 'updated' : 'saved'} successfully!`
        );

        // Reload data to reflect changes
        await loadData(false);

        if (continueAdding) {
          showAddModal();
        } else {
          handleCancel();
        }
      } catch (error) {
        // Don't show error message for validation errors (they have their own UI)
        if (error && (error as any).errorFields) return;

        console.error('Error in handleModalSave:', error);
        message.error(
          error instanceof Error
            ? error.message
            : 'An error occurred while saving.'
        );
      } finally {
        setIsSaving(false);
      }
    },
    [modalForm, editingIndex, skillList, loadData, showAddModal, handleCancel]
  );

  const handleDelete = useCallback(
    (indexToDelete: number) => {
      const itemToDelete = skillList[indexToDelete];

      if (!itemToDelete?.id || itemToDelete.id.startsWith('temp-')) {
        message.warning('Cannot delete unsaved item');
        return;
      }

      confirm({
        title: 'Are you sure you want to delete this skill category?',
        content: `This will permanently remove "${itemToDelete.category}".`,
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: async () => {
          try {
            setIsSaving(true);
            const { error } = await skillService.deleteSkill(itemToDelete.id);

            if (error) {
              throw new Error(
                error.message || 'Failed to delete skill category'
              );
            }

            message.success('Skill category deleted successfully!');
            await loadData(false);
            handleCancel();
          } catch (err) {
            console.error('Delete error:', err);
            message.error(
              err instanceof Error
                ? err.message
                : 'An error occurred while deleting.'
            );
          } finally {
            setIsSaving(false);
          }
        },
      });
    },
    [skillList, loadData, handleCancel]
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
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: 'none' }}
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

// Export the memoized version of the component for optimal performance
export const SkillForm = memo(SkillFormComponent);
