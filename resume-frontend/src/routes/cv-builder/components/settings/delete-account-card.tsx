// src/components/settings/delete-account-card.tsx
import React, { useState } from 'react';
import { Card, Button, Modal, Typography, message, Spin } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { deleteUserAccountDataAndSignOut } from 'core/services/auth-services';

const { Title, Paragraph } = Typography;
const { confirm } = Modal;

interface DeleteAccountCardProps {
  userId: string;
}

const DeleteAccountCard: React.FC<DeleteAccountCardProps> = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete your account?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <Paragraph>
          This action is irreversible. All your associated data (e.g., profiles,
          CVs) will be permanently deleted, and you will be logged out. You will
          not be able to log in with this account again.
        </Paragraph>
      ),
      okText: 'Yes, Delete My Account',
      okType: 'danger',
      cancelText: 'No, Cancel',
      onOk: handleDeleteAccount,
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      // In a real application, you might want to ask for password confirmation here
      // to ensure it's the legitimate user.

      const { error } = await deleteUserAccountDataAndSignOut(userId);

      if (error) {
        message.error(`Failed to delete account: ${error.message}`);
        console.error('Account deletion error:', error);
      } else {
        message.success('Your account has been successfully deleted.');
        // Redirect to a public page after deletion and sign out
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error('Unexpected error during account deletion:', error);
      message.error('An unexpected error occurred during account deletion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border border-red-200">
      <div className="flex justify-between items-center">
        <div>
          <Title level={4} className="!mb-1 text-red-700">
            Delete Account
          </Title>
          <Paragraph type="secondary">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </Paragraph>
        </div>
        <Button
          type="primary"
          danger
          icon={loading ? <Spin /> : <DeleteOutlined />}
          onClick={showDeleteConfirm}
          loading={loading}
        >
          {loading ? 'Deleting...' : 'Delete Account'}
        </Button>
      </div>
    </Card>
  );
};

export default DeleteAccountCard;
