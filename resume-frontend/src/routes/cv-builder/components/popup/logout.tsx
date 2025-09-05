import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { signOut } from 'core/services/auth-services';

const { confirm } = Modal;

export const showLogoutConfirm = (navigate: any) => {
  confirm({
    title: 'Are you sure you want to logout?',
    icon: <ExclamationCircleOutlined />,
    content: 'Any unsaved changes might be lost.',
    okText: 'Yes, logout',
    okType: 'danger',
    cancelText: 'Cancel',
    centered: true,
    maskClosable: true,
    async onOk() {
      try {
        const { error } = await signOut();
        if (error) throw error;
        navigate('/');
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
  });
};
