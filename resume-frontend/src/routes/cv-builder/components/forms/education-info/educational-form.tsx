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

// Define the interface for the props that EducationForm will accept
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
  const didLoadRef = useRef(false);

  // Use a ref to hold the latest onChange function to avoid dependency issues in useCallback
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const loadData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const { data: savedData, error } = await educationService.loadEducation();

      if (error) {
        if ((error as any).code !== 'PGRST116') {
          console.error('Failed to load education details:', error);
          message.error('Failed to load education details.');
        }
      }

      const loadedList = savedData || [];
      setEducationList(loadedList);
      // Call the parent component's onChange with the loaded data
      onChangeRef.current(loadedList);
    } catch (err) {
      console.error('Error loading education:', err);
      message.error('Failed to load education details.');
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (didLoadRef.current) return;
    didLoadRef.current = true;
    loadData();
  }, [loadData]);

  const showAddModal = useCallback(() => {
    setEditingIndex(null);
    modalForm.resetFields();
    modalForm.setFieldsValue({
      gpaType: 'gpa',
      isCurrent: false,
      degreeTitle: '',
      majors: '',
      institute: '',
      city: '',
      gpaValue: null,
    });
    setIsModalOpen(true);
  }, [modalForm]);

  const showEditModal = useCallback(
    (index: number) => {
      setEditingIndex(index);
      const recordToEdit = educationList[index];

      const formValues = {
        ...recordToEdit,
        startDate: recordToEdit.startDate
          ? dayjs(recordToEdit.startDate)
          : null,
        endDate: recordToEdit.endDate ? dayjs(recordToEdit.endDate) : null,
      };

      modalForm.setFieldsValue(formValues);
      setIsModalOpen(true);
    },
    [educationList, modalForm]
  );

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setEditingIndex(null);
    modalForm.resetFields();
  }, [modalForm]);

  // Function to reload data and notify parent of changes
  const reloadData = useCallback(async () => {
    await loadData(false);
  }, [loadData]);

  const handleModalSave = useCallback(
    async (continueAdding = false) => {
      try {
        await modalForm.validateFields();
        const modalValues = modalForm.getFieldsValue();
        setIsSaving(true);

        const currentId =
          editingIndex !== null
            ? educationList[editingIndex].id
            : `temp-${Date.now()}`;

        const itemToSave: Education = {
          id: currentId,
          degreeTitle: modalValues.degreeTitle?.trim() || '',
          majors: modalValues.majors?.trim() || '',
          institute: modalValues.institute?.trim() || '',
          city: modalValues.city?.trim() || '',
          gpaValue: modalValues.gpaValue || null,
          gpaType: modalValues.gpaType || 'gpa',
          startDate: modalValues.startDate
            ? dayjs(modalValues.startDate).format('YYYY-MM-DD')
            : '',
          endDate: modalValues.isCurrent
            ? undefined
            : modalValues.endDate
            ? dayjs(modalValues.endDate).format('YYYY-MM-DD')
            : '',
          isCurrent: Boolean(modalValues.isCurrent),
        };

        const { error } = await educationService.saveEducation(itemToSave);

        if (error) {
          throw new Error(error.message || 'Failed to save education');
        }

        message.success(
          `Education ${
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

      if (!itemToDelete?.id || itemToDelete.id.startsWith('temp-')) {
        message.warning('Cannot delete unsaved item');
        return;
      }

      confirm({
        title: 'Are you sure you want to delete this education entry?',
        content: 'This action cannot be undone.',
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: async () => {
          try {
            setIsSaving(true);
            const { error } = await educationService.deleteEducation(
              itemToDelete.id
            );

            if (error) {
              throw new Error(error.message || 'Failed to delete education');
            }

            message.success('Education entry deleted successfully!');
            await reloadData();
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
    [educationList, reloadData, handleCancel]
  );

  // Memoized handlers for the modal
  const onSave = useCallback(() => handleModalSave(false), [handleModalSave]);
  const onSaveAndContinue = useCallback(
    () => handleModalSave(true),
    [handleModalSave]
  );
  const onDeleteFromModal = useCallback(() => {
    if (editingIndex !== null) {
      handleDelete(editingIndex);
    }
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
            Add
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
