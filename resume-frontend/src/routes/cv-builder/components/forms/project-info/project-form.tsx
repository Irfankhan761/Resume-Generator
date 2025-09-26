import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Card, Button, Form, Typography, message, Spin, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Project } from '@routes/cv-builder/types/types';
import dayjs, { Dayjs } from 'dayjs';
import { ProjectList } from './project-list';
import { ProjectModal } from './project-modal';
import { projectService } from '../../../services/project-services';

const { Title } = Typography;
const { confirm } = Modal;

type ProjectFormData = Omit<Project, 'id' | 'startDate' | 'endDate'> & {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};

interface ProjectFormProps {
  onChange: (data: Project[]) => void;
}

const ProjectFormComponent: React.FC<ProjectFormProps> = ({ onChange }) => {
  const [modalForm] = Form.useForm<ProjectFormData>();
  const [projectList, setProjectList] = useState<Project[]>([]);
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
      const { data: savedData, error } = await projectService.loadProjects();

      if (error) {
        // Only show error if it's not a "no data found" error
        if ((error as any).code !== 'PGRST116') {
          console.error('Failed to load project details:', error);
          message.error('Failed to load project details.');
        }
      }

      const loadedList = savedData || [];
      console.log('Loaded project list:', loadedList);
      setProjectList(loadedList);
      onChangeRef.current(loadedList);
    } catch (err) {
      console.error('Error loading projects:', err);
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
      technologies: [''],
      title: '',
      link: '',
      description: '',
    });
    setIsModalOpen(true);
  }, [modalForm]);

  const showEditModal = useCallback(
    (index: number) => {
      const recordToEdit = projectList[index];
      if (recordToEdit) {
        setEditingIndex(index);

        const formValues = {
          ...recordToEdit,
          startDate: recordToEdit.startDate
            ? dayjs(recordToEdit.startDate)
            : null,
          endDate: recordToEdit.endDate ? dayjs(recordToEdit.endDate) : null,
          technologies:
            recordToEdit.technologies && recordToEdit.technologies.length > 0
              ? recordToEdit.technologies
              : [''],
        };

        console.log('Setting form values for edit:', formValues);
        modalForm.setFieldsValue(formValues);
        setIsModalOpen(true);
      }
    },
    [projectList, modalForm]
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
            ? projectList[editingIndex].id
            : `temp-${Date.now()}`;

        // Format the item for saving
        const itemToSave: Project = {
          id: currentId,
          title: modalValues.title?.trim() || '',
          link: modalValues.link?.trim() || '',
          description: modalValues.description?.trim() || '',
          startDate: modalValues.startDate
            ? dayjs(modalValues.startDate).format('YYYY-MM-DD')
            : '',
          endDate: modalValues.endDate
            ? dayjs(modalValues.endDate).format('YYYY-MM-DD')
            : '',
          technologies: (modalValues.technologies || []).filter(
            (tech: string) => tech && tech.trim()
          ),
        };

        console.log('Item to save:', itemToSave);

        const { error, data } = await projectService.saveProject(itemToSave);

        if (error) {
          console.error('Save error:', error);
          throw new Error(error.message || 'Failed to save project');
        }

        console.log('Save successful:', data);

        message.success(
          `Project ${editingIndex !== null ? 'updated' : 'added'} successfully!`
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
            : 'An error occurred while saving the project.'
        );
      } finally {
        setIsSaving(false);
      }
    },
    [modalForm, editingIndex, projectList, loadData, showAddModal, handleCancel]
  );

  const handleDelete = useCallback(
    (indexToDelete: number) => {
      const itemToDelete = projectList[indexToDelete];

      if (!itemToDelete?.id || itemToDelete.id.startsWith('temp-')) {
        message.warning('Cannot delete unsaved item');
        return;
      }

      confirm({
        title: 'Are you sure you want to delete this project?',
        content: `This will permanently remove "${itemToDelete.title}".`,
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: async () => {
          try {
            setIsSaving(true);
            const { error } = await projectService.deleteProject(
              itemToDelete.id
            );

            if (error) {
              throw new Error(error.message || 'Failed to delete project');
            }

            message.success('Project deleted successfully!');
            await loadData(false);
            handleCancel();
          } catch (err) {
            console.error('Delete error:', err);
            message.error(
              err instanceof Error
                ? err.message
                : 'An error occurred while deleting the project.'
            );
          } finally {
            setIsSaving(false);
          }
        },
      });
    },
    [projectList, loadData, handleCancel]
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
            Projects
          </Title>
        }
        extra={
          <Button onClick={showAddModal} type="primary" icon={<PlusOutlined />}>
            Add Project
          </Button>
        }
      >
        <ProjectList
          projectItems={projectList}
          onEditItem={showEditModal}
          onDeleteItem={handleDelete}
        />
      </Card>
      <ProjectModal
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

export const ProjectForm = memo(ProjectFormComponent);
