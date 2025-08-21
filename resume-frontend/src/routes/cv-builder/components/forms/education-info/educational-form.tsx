import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, Button, Form, Typography, message, Spin, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Education } from '@routes/cv-builder/types/types';
import dayjs from 'dayjs';
import { EducationList } from './education-list';
import { EducationModal } from './education-modal';
import { educationService } from '../../../services/education-services';

const { Title } = Typography;
const { confirm } = Modal;

interface EducationFormProps {
  onChange: (data: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ onChange }) => {
  const [modalForm] = Form.useForm();
  const [educationList, setEducationList] = useState<Education[]>([]);
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
      const { data: savedData, error } = await educationService.loadEducation();
      if (error && error.code !== 'PGRST116') {
        message.error('Failed to load education details.');
      }
      const loadedList = savedData || [];
      setEducationList(loadedList);
      // Call the function from the ref, not the prop directly
      onChangeRef.current(loadedList);

      setLoading(false);
    };

    doLoad();
  }, []);

  const showAddModal = useCallback(() => {
    setEditingIndex(null);
    modalForm.resetFields();
    modalForm.setFieldsValue({ gpaType: 'gpa', isCurrent: false });
    setIsModalOpen(true);
  }, [modalForm]);

  const showEditModal = useCallback(
    (index: number) => {
      setEditingIndex(index);
      const recordToEdit = educationList[index];
      modalForm.setFieldsValue({
        ...recordToEdit,
        startDate: recordToEdit.startDate
          ? dayjs(recordToEdit.startDate)
          : null,
        endDate: recordToEdit.endDate ? dayjs(recordToEdit.endDate) : null,
      });
      setIsModalOpen(true);
    },
    [educationList, modalForm]
  );

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setEditingIndex(null);
  }, []);

  const reloadData = useCallback(async () => {
    const { data: savedData, error } = await educationService.loadEducation();
    if (error) message.error('Failed to reload education details.');
    const loadedList = savedData || [];
    setEducationList(loadedList);
    onChangeRef.current(loadedList);
  }, []);

  const handleModalSave = useCallback(
    async (continueAdding = false) => {
      try {
        const modalValues = await modalForm.validateFields();
        setIsSaving(true);
        const currentId =
          editingIndex !== null
            ? educationList[editingIndex].id
            : `temp-${Date.now()}`;
        const itemToSave: Education = {
          ...modalValues,
          id: currentId,
          startDate: dayjs(modalValues.startDate).format('YYYY-MM-DD'),
          endDate: modalValues.isCurrent
            ? undefined
            : dayjs(modalValues.endDate).format('YYYY-MM-DD'),
          isCurrent: modalValues.isCurrent || false,
        };

        const { error } = await educationService.saveEducation(itemToSave);
        if (error) throw error;

        message.success(
          `Education ${
            editingIndex !== null ? 'updated' : 'added'
          } successfully!`
        );
        await reloadData(); // Use the stable reload function

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
      educationList,
      reloadData,
      showAddModal,
      handleCancel,
    ]
  );

  const handleDelete = useCallback(
    (indexToDelete: number) => {
      const itemToDelete = educationList[indexToDelete];
      if (!itemToDelete?.id || itemToDelete.id.startsWith('temp-')) return;

      confirm({
        title: 'Are you sure you want to delete this entry?',
        okText: 'Delete',
        okType: 'danger',
        onOk: async () => {
          try {
            setIsSaving(true);
            const { error } = await educationService.deleteEducation(
              itemToDelete.id
            );
            if (error) throw error;
            message.success('Education entry deleted successfully!');
            await reloadData(); // Use the stable reload function
            handleCancel();
          } catch (err) {
            message.error('An error occurred while deleting.');
          } finally {
            setIsSaving(false);
          }
        },
      });
    },
    [educationList, reloadData, handleCancel]
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
            Education
          </Title>
        }
        extra={
          <Button onClick={showAddModal} type="primary" icon={<PlusOutlined />}>
            Add Education
          </Button>
        }
      >
        <EducationList
          educationItems={educationList}
          onEditItem={showEditModal}
          onDeleteItem={handleDelete}
        />
      </Card>

      <EducationModal
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
