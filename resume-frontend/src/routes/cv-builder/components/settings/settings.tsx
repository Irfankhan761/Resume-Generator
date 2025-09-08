import { useState, useEffect, useMemo } from 'react';
import { Card, Avatar, Button, Input, Upload, message, Spin } from 'antd';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { supabase } from 'core/lib/supabaseClient';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile } from 'antd/es/upload/interface';
import { DashboardLayout } from '../layout/dashboard-layout/dashboard-layout';
import type { CVSection } from '../../types/types';
import ResetPasswordModal from '../popup/reset-password-modal';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const SettingsPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [displayImageUrl, setDisplayImageUrl] = useState<string>();
  const [uploading, setUploading] = useState(false);
  const [activeSection] = useState<CVSection>('Personal Info');
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const [editableUsername, setEditableUsername] = useState<string>('');
  const [uploadedStorageUrl, setUploadedStorageUrl] = useState<string | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);

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
        setDisplayImageUrl(session.user.user_metadata?.avatar_url);
        setEditableUsername(session.user.user_metadata?.username || '');
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

  const handleImageUpload = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, async (url) => {
        setDisplayImageUrl(url);
        setUploading(true);

        const file = info.file.originFileObj as RcFile;
        const userId = user?.id;
        if (!userId) {
          message.error('User not authenticated. Please log in again.');
          setUploading(false);
          setDisplayImageUrl(user?.user_metadata?.avatar_url);
          return;
        }
        const fileName = `${userId}/${Date.now()}-${file.name}`;

        try {
          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, file, { cacheControl: '3600', upsert: true });

          if (uploadError) {
            console.error(
              'Supabase Storage Upload Error:',
              uploadError.message,
              uploadError
            );
            message.error('Failed to upload image: ' + uploadError.message);
            setUploading(false);
            setDisplayImageUrl(user?.user_metadata?.avatar_url);
            return;
          }

          const { data: publicURLData } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);

          if (!publicURLData || !publicURLData.publicUrl) {
            console.error('Failed to get public URL for uploaded image.');
            message.error('Failed to get public URL for image.');
            setUploading(false);
            setDisplayImageUrl(user?.user_metadata?.avatar_url);
            return;
          }
          setUploadedStorageUrl(publicURLData.publicUrl);
          message.success(
            'Image uploaded successfully! Click "Save Changes" to update your profile.'
          );
        } catch (error: any) {
          console.error('General upload error:', error.message);
          message.error('An unexpected error occurred during image upload.');
          setDisplayImageUrl(user?.user_metadata?.avatar_url);
        } finally {
          setUploading(false);
        }
      });
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    let updates: { [key: string]: any } = {};
    if (
      uploadedStorageUrl &&
      uploadedStorageUrl !== user?.user_metadata?.avatar_url
    ) {
      updates.avatar_url = uploadedStorageUrl;
    }

    // Check for username change
    const currentDbUsername = user?.user_metadata?.username ?? '';
    if (editableUsername !== currentDbUsername) {
      updates.username = editableUsername;
    }

    if (Object.keys(updates).length === 0) {
      message.info('No changes to save.');
      setIsSaving(false);
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    });

    if (error) {
      console.error('Supabase User Update Error:', error.message, error);
      message.error('Failed to save changes: ' + error.message);
    } else {
      setUser(data.user);
      if (uploadedStorageUrl) {
        setUploadedStorageUrl(null); // Clear the pending storage URL once saved
      } else {
        setDisplayImageUrl(
          data.user?.user_metadata?.avatar_url || displayImageUrl
        );
      }

      message.success('Profile updated successfully!');
    }
    setIsSaving(false);
  };

  const hasChanges = useMemo(() => {
    const currentDbUsername = user?.user_metadata?.username ?? '';
    const usernameChanged = editableUsername !== currentDbUsername;
    const avatarChanged =
      uploadedStorageUrl !== null &&
      uploadedStorageUrl !== user?.user_metadata?.avatar_url;
    return usernameChanged || avatarChanged;
  }, [editableUsername, uploadedStorageUrl, user]);

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <UserOutlined />}
      <div style={{ marginTop: 8 }}>{uploading ? 'Uploading' : 'Change'}</div>
    </div>
  );

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
          <Card
            title="Profile Information"
            className="shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center space-x-6 mb-8">
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                customRequest={({ onSuccess }) => {
                  setTimeout(() => {
                    if (onSuccess) onSuccess('ok');
                  }, 0);
                }}
                onChange={handleImageUpload}
              >
                {displayImageUrl && !uploading ? (
                  <Avatar size={100} src={displayImageUrl} />
                ) : (
                  uploadButton
                )}
              </Upload>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {editableUsername || user?.email?.split('@')[0]}
                </h2>
                <p className="text-gray-500">{user?.email}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Member since {new Date(user?.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <Input
                  value={editableUsername}
                  onChange={(e) => setEditableUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="bg-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This name will be displayed on your profile.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input value={user?.email} disabled className="bg-gray-50" />
                <p className="text-xs text-gray-500 mt-1">
                  Contact support to change your email address
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="flex items-center space-x-4">
                  <Input.Password
                    value="••••••••••"
                    disabled
                    className="bg-gray-50 flex-1"
                  />
                  <Button
                    type="primary"
                    onClick={showResetPasswordModal}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Reset Password
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  We'll send a password reset link to your email
                </p>
              </div>

              {/* Save Changes Button */}
              <div className="flex justify-end pt-4 border-t border-gray-100 mt-6">
                <Button
                  type="primary"
                  onClick={handleSaveChanges}
                  loading={isSaving || uploading} // Disable if still uploading or saving
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!hasChanges || isSaving || uploading} // Disable if no changes or busy
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </Card>

          {/* CV Preferences */}
          <Card
            title="CV Builder Preferences"
            className="shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-800">Auto-save</h3>
                  <p className="text-sm text-gray-500">
                    Automatically save CV changes
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Enabled
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-800">
                    Real-time Preview
                  </h3>
                  <p className="text-sm text-gray-500">
                    Show live preview while editing
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Enabled
                </span>
              </div>
            </div>
          </Card>
          <Card
            title="Data & Storage"
            className="shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
          >
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">CV</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">
                      Your CV data is secure
                    </h3>
                    <p className="text-sm text-blue-600">
                      All information is encrypted and stored securely
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
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
