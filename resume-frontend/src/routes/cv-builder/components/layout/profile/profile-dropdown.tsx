import { useState, useEffect } from 'react';
import { Dropdown, Menu, Avatar, Button } from 'antd';
import {
  UserOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getCurrentUser } from 'core/services/auth-services';

const ProfileDropdown = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<QuestionCircleOutlined />}>
        <Link to="/support">Support</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<QuestionCircleOutlined />}>
        <Link to="/help">Help</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<SettingOutlined />}>
        <Link to="/create-cv/settings">Settings</Link>
      </Menu.Item>
    </Menu>
  );

  const displayName =
    user?.user_metadata?.username ||
    user?.email?.split('@')[0] || // fallback to email prefix
    'User';

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button
        type="text"
        onClick={(e) => e.preventDefault()}
        className="flex items-center space-x-2"
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
          {user?.user_metadata?.avatar_url ? (
            <Avatar src={user.user_metadata.avatar_url} />
          ) : (
            <UserOutlined className="text-lg text-gray-600" />
          )}
        </div>
        <span className="text-gray-800 font-medium hidden sm:block">
          {displayName}
        </span>
      </Button>
    </Dropdown>
  );
};

export default ProfileDropdown;
