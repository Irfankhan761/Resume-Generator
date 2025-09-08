import React, { useState, useEffect } from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
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
        <a href="#">Support</a>
      </Menu.Item>
      <Menu.Item key="2" icon={<QuestionCircleOutlined />}>
        <a href="#">Help</a>
      </Menu.Item>
      <Menu.Item key="3" icon={<SettingOutlined />}>
        <Link to="/create-cv/settings">Settings</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()} className="flex items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
          {user?.user_metadata?.avatar_url ? (
            <Avatar src={user.user_metadata.avatar_url} />
          ) : (
            <UserOutlined className="text-lg text-gray-600" />
          )}
        </div>
      </a>
    </Dropdown>
  );
};

export default ProfileDropdown;
