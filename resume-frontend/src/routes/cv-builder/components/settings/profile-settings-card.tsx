import { useState, useEffect, useMemo } from 'react';
import { Card, Button, Input, Upload, message } from 'antd';
import { supabase } from 'core/lib/supabaseClient';

import ProfilePictureUploader from './profile-picture-uploader';

interface ProfileSettingsCardProps {
  initialUser: any;
  onUserUpdate: (updatedUser: any) => void;
  onShowResetPasswordModal: () => void;
}

const ProfileSettingsCard = ({
  initialUser,
  onUserUpdate,
  onShowResetPasswordModal,
}: ProfileSettingsCardProps) => {
  const [editableUsername, setEditableUsername] = useState<string>('');
  const [displayImageUrl, setDisplayImageUrl] = useState<string | undefined>();
  const [uploadedStorageUrl, setUploadedStorageUrl] = useState<string | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isImageUploadingInternal, setIsImageUploadingInternal] =
    useState(false);

  useEffect(() => {
    if (initialUser) {
      setEditableUsername(initialUser.user_metadata?.username || '');
      setDisplayImageUrl(initialUser.user_metadata?.avatar_url);
    }
  }, [initialUser]);

  const handleImageUploadSuccess = (publicUrl: string) => {
    setUploadedStorageUrl(publicUrl);
    setDisplayImageUrl(publicUrl);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    let updates: { [key: string]: any } = {};
    if (
      uploadedStorageUrl &&
      uploadedStorageUrl !== initialUser?.user_metadata?.avatar_url
    ) {
      updates.avatar_url = uploadedStorageUrl;
    }

    const currentDbUsername = initialUser?.user_metadata?.username ?? '';
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
      if (data.user) {
        onUserUpdate(data.user);
        if (uploadedStorageUrl) {
          setUploadedStorageUrl(null);
        }
        setDisplayImageUrl(data.user.user_metadata?.avatar_url);
        setEditableUsername(data.user.user_metadata?.username || '');
      }
      message.success('Profile updated successfully!');
    }
    setIsSaving(false);
  };

  const hasChanges = useMemo(() => {
    const currentDbUsername = initialUser?.user_metadata?.username ?? '';
    const usernameChanged = editableUsername !== currentDbUsername;
    const avatarChanged =
      uploadedStorageUrl !== null &&
      uploadedStorageUrl !== initialUser?.user_metadata?.avatar_url;
    return usernameChanged || avatarChanged;
  }, [editableUsername, uploadedStorageUrl, initialUser]);

  return (
    <Card
      title="Profile Information"
      className="shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-center space-x-6 mb-8">
        <ProfilePictureUploader
          initialImageUrl={displayImageUrl}
          userId={initialUser?.id} // Pass the user ID for unique storage paths
          onUploadSuccess={handleImageUploadSuccess}
          loading={isImageUploadingInternal} // Pass internal loading state to uploader
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {editableUsername || initialUser?.email?.split('@')[0]}
          </h2>
          <p className="text-gray-500">{initialUser?.email}</p>
          <p className="text-sm text-gray-400 mt-1">
            Member since{' '}
            {initialUser?.created_at
              ? new Date(initialUser.created_at).toLocaleDateString()
              : 'N/A'}
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
          <Input value={initialUser?.email} disabled className="bg-gray-50" />
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
              onClick={onShowResetPasswordModal}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Reset Password
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            We'll send a password reset link to your email
          </p>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100 mt-6">
          <Button
            type="primary"
            onClick={handleSaveChanges}
            loading={isSaving || isImageUploadingInternal} // Disable save button if image is being uploaded
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!hasChanges || isSaving || isImageUploadingInternal}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProfileSettingsCard;
