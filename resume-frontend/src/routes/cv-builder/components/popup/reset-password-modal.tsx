import React from 'react';
import { Modal, message } from 'antd';
import { supabase } from '../../../../core/lib/supabaseClient';
import { resetPasswordForEmail } from '../../../../core/services/auth-services';
import { useNavigate } from 'react-router-dom';

interface ResetPasswordModalProps {
  isVisible: boolean;
  onClose: () => void;
  userEmail: string | undefined;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isVisible,
  onClose,
  userEmail,
}) => {
  const navigate = useNavigate();

  const handleConfirmReset = async () => {
    onClose(); // Close modal immediately
    if (userEmail) {
      const { error } = await resetPasswordForEmail(userEmail);
      if (error) {
        message.error(error.message);
      } else {
        message.success(
          'Password reset email sent! Please check your inbox. You will be logged out automatically to set a new password.'
        );
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) {
          console.error(
            'Error signing out after password reset request:',
            signOutError.message
          );
        }
        navigate('/login');
      }
    } else {
      message.error('User email not found. Cannot reset password.');
    }
  };

  return (
    <Modal
      title="Confirm Password Reset"
      open={isVisible}
      onOk={handleConfirmReset}
      onCancel={onClose}
      okText="Yes, Reset My Password"
      cancelText="Cancel"
    >
      <p>
        Are you sure you want to reset your password? An email with instructions
        will be sent to your registered email address ({userEmail || 'N/A'}).
        You will be logged out automatically after this action to complete the
        reset process.
      </p>
    </Modal>
  );
};

export default ResetPasswordModal;
