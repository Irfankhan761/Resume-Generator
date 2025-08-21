import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, Button, Typography, message, Spin, Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BriefcaseBusinessIcon } from 'lucide-react';
import type { WorkExperience } from '@routes/cv-builder/types/types';
import dayjs from 'dayjs';
import { WorkExperienceList } from './work-experience-list';
import { WorkExperienceModal } from './work-experience-modal';
import { workExperienceService } from '../../../services/work-experience';

const { Title } = Typography;
const { confirm } = Modal;

interface WorkExperienceFormProps {
  onChange: (data: WorkExperience[]) => void;
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  onChange,
}) => {
  const [modalForm] = Form.useForm();
  const [experienceList, setExperienceList] = useState<WorkExperience[]>([]);
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
      const { data: savedData, error } =
        await workExperienceService.loadWorkExperience();
      if (error && error.code !== 'PGRST116') {
        message.error('Failed to load work experience.');
      }
      const loadedList = savedData || [];
      setExperienceList(loadedList);
      onChangeRef.current(loadedList);
      setLoading(false);
    };
    doLoad();
  }, []);

  const reloadData = useCallback(async () => {
    const { data: savedData, error } =
      await workExperienceService.loadWorkExperience();
    if (error) message.error('Failed to reload work experience.');
    const reloadedList = savedData || [];
    setExperienceList(reloadedList);
    onChangeRef.current(reloadedList);
  }, []);

  const showAddModal = useCallback(() => {
    setEditingIndex(null);
    modalForm.resetFields();
    modalForm.setFieldsValue({ currentlyWorking: false, description: [''] });
    setIsModalOpen(true);
  }, [modalForm]);

  const showEditModal = useCallback(
    (index: number) => {
      setEditingIndex(index);
      const recordToEdit = experienceList[index];
      modalForm.setFieldsValue({
        ...recordToEdit,
        startDate: recordToEdit.startDate
          ? dayjs(recordToEdit.startDate)
          : null,
        endDate: recordToEdit.endDate ? dayjs(recordToEdit.endDate) : null,
      });
      setIsModalOpen(true);
    },
    [experienceList, modalForm]
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
            ? experienceList[editingIndex].id
            : `temp-${Date.now()}`;
        const itemToSave: WorkExperience = {
          ...modalValues,
          id: currentId,
          startDate: modalValues.startDate?.format('YYYY-MM-DD') || null,
          endDate:
            !modalValues.currentlyWorking && modalValues.endDate
              ? modalValues.endDate.format('YYYY-MM-DD')
              : null,
          description: (modalValues.description || []).filter(
            (d: string) => d && d.trim() !== ''
          ),
        };

        const { error } = await workExperienceService.saveWorkExperience(
          itemToSave
        );
        if (error) throw error;

        message.success(
          `Work experience ${
            editingIndex !== null ? 'updated' : 'added'
          } successfully!`
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
    [
      modalForm,
      editingIndex,
      experienceList,
      reloadData,
      showAddModal,
      handleCancel,
    ]
  );

  const handleDelete = useCallback(
    (indexToDelete: number) => {
      const itemToDelete = experienceList[indexToDelete];
      if (!itemToDelete?.id || itemToDelete.id.startsWith('temp-')) return;

      confirm({
        title: 'Are you sure you want to delete this experience?',
        okText: 'Delete',
        okType: 'danger',
        onOk: async () => {
          try {
            setIsSaving(true);
            const { error } = await workExperienceService.deleteWorkExperience(
              itemToDelete.id
            );
            if (error) throw error;
            message.success('Work experience deleted successfully!');
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
    [experienceList, reloadData, handleCancel]
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
        title={
          <Title level={4} style={{ margin: 0 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BriefcaseBusinessIcon size={20} />
              Work Experience
            </span>
          </Title>
        }
        extra={
          <Button onClick={showAddModal} type="primary" icon={<PlusOutlined />}>
            Add Experience
          </Button>
        }
      >
        <WorkExperienceList
          experienceItems={experienceList}
          onEditItem={showEditModal}
          onDeleteItem={handleDelete}
        />
      </Card>

      <WorkExperienceModal
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
