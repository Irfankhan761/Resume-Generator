import { useState, useEffect, useMemo } from 'react';
import { Card, Button, Input, message } from 'antd';
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
  // Track if image was explicitly changed (uploaded or removed)
  const [imageWasChanged, setImageWasChanged] = useState(false);

  useEffect(() => {
    if (initialUser) {
      setEditableUsername(initialUser.user_metadata?.username || '');
      setDisplayImageUrl(initialUser.user_metadata?.avatar_url);
      // Reset change tracking when initialUser changes
      setImageWasChanged(false);
      setUploadedStorageUrl(null);
    }
  }, [initialUser]);

  // Updated to handle `null` for image removal
  const handleImageUploadSuccess = (publicUrl: string | null) => {
    setUploadedStorageUrl(publicUrl);
    setDisplayImageUrl(publicUrl || undefined);
    setImageWasChanged(true); // Mark that image was explicitly changed
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    let updates: { [key: string]: any } = {};

    // Check if avatar changed (including removal) - only if explicitly changed
    if (imageWasChanged) {
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
        // Reset state after successful save
        setUploadedStorageUrl(null);
        setImageWasChanged(false);
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

    // Only consider avatar changed if it was explicitly changed
    const avatarChanged = imageWasChanged;

    return usernameChanged || avatarChanged;
  }, [editableUsername, imageWasChanged, initialUser]);

  return (
    <Card
      title="Profile Information"
      className="shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-center space-x-6 mb-8">
        <ProfilePictureUploader
          initialImageUrl={displayImageUrl}
          userId={initialUser?.id}
          onUploadSuccess={handleImageUploadSuccess}
          onUploadStart={() => setIsImageUploadingInternal(true)}
          onUploadEnd={() => setIsImageUploadingInternal(false)}
          loading={isImageUploadingInternal}
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
            loading={isSaving || isImageUploadingInternal}
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
