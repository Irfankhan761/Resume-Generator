import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { supabase } from 'core/lib/supabaseClient'; // Ensure this path is correct
import { DashboardLayout } from '../layout/dashboard-layout/dashboard-layout';
import type { CVSection } from '../../types/types';
import ResetPasswordModal from '../popup/reset-password-modal';
import ProfileSettingsCard from './profile-settings-card';
import CvPreferencesCard from './cv-preferences-card';
import DataStorageCard from './data-storage-card';

const SettingsPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection] = useState<CVSection>('Personal Info');
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);

  const navigate = useNavigate();

  const handleSectionChange = (section: CVSection) => {
    navigate('/create-cv');
  };

  useEffect(() => {
    const initUser = async () => {
      setLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error.message);
      }
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
    };
    initUser();
  }, []);

  const showResetPasswordModal = () => {
    setIsResetModalVisible(true);
  };

  const handleCancelResetPassword = () => {
    setIsResetModalVisible(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e6f7ff]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <DashboardLayout
      sidebarConfig={{
        activeSection,
        onSectionChange: handleSectionChange,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600">
            Manage your profile and account preferences
          </p>
        </div>

        <div className="grid gap-6">
          <ProfileSettingsCard
            initialUser={user}
            onUserUpdate={setUser}
            onShowResetPasswordModal={showResetPasswordModal}
          />

          <CvPreferencesCard />

          <DataStorageCard />
        </div>
      </div>
      <ResetPasswordModal
        isVisible={isResetModalVisible}
        onClose={handleCancelResetPassword}
        userEmail={user?.email}
      />
    </DashboardLayout>
  );
};

export default SettingsPage;
