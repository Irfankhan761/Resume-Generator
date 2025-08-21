import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, Button, Form, Typography, message, Spin, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Project } from '@routes/cv-builder/types/types';
import dayjs from 'dayjs';
import { ProjectList } from './project-list';
import { ProjectModal } from './project-modal';
import { projectService } from '../../../services/project-services';

const { Title } = Typography;
const { confirm } = Modal;

interface ProjectFormProps {
  onChange: (data: Project[]) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onChange }) => {
  const [modalForm] = Form.useForm();
  const [projectList, setProjectList] = useState<Project[]>([]);
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
      const { data: savedData, error } = await projectService.loadProjects();
      if (error && error.code !== 'PGRST116') {
        message.error('Failed to load project details.');
      }
      const loadedList = savedData || [];
      setProjectList(loadedList);
      onChangeRef.current(loadedList);
      setLoading(false);
    };
    doLoad();
  }, []);

  const reloadData = useCallback(async () => {
    const { data: savedData, error } = await projectService.loadProjects();
    if (error) message.error('Failed to reload project details.');
    const reloadedList = savedData || [];
    setProjectList(reloadedList);
    onChangeRef.current(reloadedList);
  }, []);

  const showAddModal = useCallback(() => {
    setEditingIndex(null);
    modalForm.resetFields();
    modalForm.setFieldsValue({ technologies: [''] });
    setIsModalOpen(true);
  }, [modalForm]);

  const showEditModal = useCallback(
    (index: number) => {
      setEditingIndex(index);
      const recordToEdit = projectList[index];
      modalForm.setFieldsValue({
        ...recordToEdit,
        startDate: recordToEdit.startDate
          ? dayjs(recordToEdit.startDate)
          : null,
        endDate: recordToEdit.endDate ? dayjs(recordToEdit.endDate) : null,
      });
      setIsModalOpen(true);
    },
    [projectList, modalForm]
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
            ? projectList[editingIndex].id
            : `temp-${Date.now()}`;
        const itemToSave: Project = {
          ...modalValues,
          id: currentId,
          startDate: dayjs(modalValues.startDate).format('YYYY-MM-DD'),
          endDate: modalValues.endDate
            ? dayjs(modalValues.endDate).format('YYYY-MM-DD')
            : undefined,
          technologies: (modalValues.technologies || []).filter(Boolean),
        };

        await projectService.saveProject(itemToSave);
        message.success(
          `Project ${editingIndex !== null ? 'updated' : 'added'} successfully!`
        );
        await reloadData();

        if (continueAdding) {
          showAddModal();
        } else {
          handleCancel();
        }
      } catch (error) {
        message.error('An error occurred while saving the project.');
      } finally {
        setIsSaving(false);
      }
    },
    [
      modalForm,
      editingIndex,
      projectList,
      reloadData,
      showAddModal,
      handleCancel,
    ]
  );

  const handleDelete = useCallback(
    (indexToDelete: number) => {
      const itemToDelete = projectList[indexToDelete];
      if (!itemToDelete?.id || itemToDelete.id.startsWith('temp-')) return;

      confirm({
        title: 'Are you sure you want to delete this project?',
        content: `This will permanently remove "${itemToDelete.title}".`,
        okText: 'Delete',
        okType: 'danger',
        onOk: async () => {
          try {
            setIsSaving(true);
            await projectService.deleteProject(itemToDelete.id);
            message.success('Project deleted successfully!');
            await reloadData();
            handleCancel();
          } catch (err) {
            message.error('An error occurred while deleting the project.');
          } finally {
            setIsSaving(false);
          }
        },
      });
    },
    [projectList, reloadData, handleCancel]
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
