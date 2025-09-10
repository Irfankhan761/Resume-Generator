import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Card, Button, Typography, message, Spin, Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BriefcaseBusinessIcon } from 'lucide-react';
import type { WorkExperience } from '@routes/cv-builder/types/types';
import dayjs, { Dayjs } from 'dayjs';
import { WorkExperienceList } from './work-experience-list';
import { WorkExperienceModal } from './work-experience-modal';
import { workExperienceService } from '../../../services/work-experience';

const { Title } = Typography;
const { confirm } = Modal;

type WorkExperienceFormData = Omit<
  WorkExperience,
  'id' | 'startDate' | 'endDate'
> & {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};

interface WorkExperienceFormProps {
  onChange: (data: WorkExperience[]) => void;
}

const WorkExperienceFormComponent: React.FC<WorkExperienceFormProps> = ({
  onChange,
}) => {
  const [modalForm] = Form.useForm<WorkExperienceFormData>();
  const [experienceList, setExperienceList] = useState<WorkExperience[]>([]);
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
      const { data: savedData, error } =
        await workExperienceService.loadWorkExperience();

      if (error) {
        // Only show error if it's not a "no data found" error
        if ((error as any).code !== 'PGRST116') {
          console.error('Failed to load work experience:', error);
          message.error('Failed to load work experience.');
        }
      }

      const loadedList = savedData || [];
      console.log('Loaded work experience list:', loadedList);
      setExperienceList(loadedList);
      onChangeRef.current(loadedList);
    } catch (err) {
      console.error('Error loading work experience:', err);
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
      currentlyWorking: false,
      description: [''],
      company: '',
      position: '',
      location: '',
    });
    setIsModalOpen(true);
  }, [modalForm]);

  const showEditModal = useCallback(
    (index: number) => {
      const recordToEdit = experienceList[index];
      if (recordToEdit) {
        setEditingIndex(index);

        const formValues = {
          ...recordToEdit,
          startDate: recordToEdit.startDate
            ? dayjs(recordToEdit.startDate)
            : null,
          endDate: recordToEdit.endDate ? dayjs(recordToEdit.endDate) : null,
          description:
            recordToEdit.description && recordToEdit.description.length > 0
              ? recordToEdit.description
              : [''],
        };

        console.log('Setting form values for edit:', formValues);
        modalForm.setFieldsValue(formValues);
        setIsModalOpen(true);
      }
    },
    [experienceList, modalForm]
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
            ? experienceList[editingIndex].id
            : `temp-${Date.now()}`;

        // Format the item for saving
        const itemToSave: WorkExperience = {
          id: currentId,
          company: modalValues.company?.trim() || '',
          position: modalValues.position?.trim() || '',
          location: modalValues.location?.trim() || '',
          startDate: modalValues.startDate
            ? dayjs(modalValues.startDate).format('YYYY-MM-DD')
            : '',
          endDate:
            !modalValues.currentlyWorking && modalValues.endDate
              ? dayjs(modalValues.endDate).format('YYYY-MM-DD')
              : '',
          currentlyWorking: Boolean(modalValues.currentlyWorking),
          description: (modalValues.description || []).filter(
            (d: string) => d && d.trim() !== ''
          ),
        };

        console.log('Item to save:', itemToSave);

        const { error, data } = await workExperienceService.saveWorkExperience(
          itemToSave
        );

        if (error) {
          console.error('Save error:', error);
          throw new Error(error.message || 'Failed to save work experience');
        }

        console.log('Save successful:', data);

        message.success(
          `Work experience ${
            editingIndex !== null ? 'updated' : 'added'
          } successfully!`
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
    [
      modalForm,
      editingIndex,
      experienceList,
      loadData,
      showAddModal,
      handleCancel,
    ]
  );

  const handleDelete = useCallback(
    (indexToDelete: number) => {
      const itemToDelete = experienceList[indexToDelete];

      if (!itemToDelete?.id || itemToDelete.id.startsWith('temp-')) {
        message.warning('Cannot delete unsaved item');
        return;
      }

      confirm({
        title: 'Are you sure you want to delete this work experience?',
        content: `This will permanently remove the position at "${itemToDelete.company}".`,
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: async () => {
          try {
            setIsSaving(true);
            const { error } = await workExperienceService.deleteWorkExperience(
              itemToDelete.id
            );

            if (error) {
              throw new Error(
                error.message || 'Failed to delete work experience'
              );
            }

            message.success('Work experience deleted successfully!');
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
    [experienceList, loadData, handleCancel]
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

export const WorkExperienceForm = memo(WorkExperienceFormComponent);
