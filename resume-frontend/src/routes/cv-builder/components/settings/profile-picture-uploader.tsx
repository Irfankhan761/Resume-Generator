import React, { useState, useCallback, useRef } from 'react';
import {
  Upload,
  message,
  Modal,
  Slider,
  Typography,
  Space,
  Button,
} from 'antd';
import {
  UserOutlined,
  LoadingOutlined,
  RotateRightOutlined,
  ZoomOutOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Avatar } from 'antd';
import Cropper from 'react-easy-crop';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile } from 'antd/es/upload/interface';
import { supabase } from 'core/lib/supabaseClient';

const { Text } = Typography;

interface ProfilePictureUploaderProps {
  initialImageUrl?: string;
  userId: string;
  onUploadSuccess: (publicUrl: string | null) => void;
  loading: boolean;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  croppedAreaPixels: any,
  rotation = 0
) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  const rotRad = (rotation * Math.PI) / 180;

  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.putImageData(data, 0, 0);

  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(
      (file) => {
        resolve(file);
      },
      'image/jpeg',
      0.95
    );
  });
};

const rotateSize = (width: number, height: number, rotation: number) => {
  const rotRad = (rotation * Math.PI) / 180;
  return {
    width:
      Math.abs(width * Math.cos(rotRad)) + Math.abs(height * Math.sin(rotRad)),
    height:
      Math.abs(width * Math.sin(rotRad)) + Math.abs(height * Math.cos(rotRad)),
  };
};

const ProfilePictureUploader: React.FC<ProfilePictureUploaderProps> = ({
  initialImageUrl,
  userId,
  onUploadSuccess,
  loading,
  onUploadStart,
  onUploadEnd,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cropperImageSrc, setCropperImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const fileRef = useRef<RcFile | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const resetCropperAdjustments = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
  };

  const resetCropperState = () => {
    setCropperImageSrc(null);
    resetCropperAdjustments();
    fileRef.current = null;
  };

  const handleOpenModal = (imageToCrop?: string) => {
    if (imageToCrop) {
      setCropperImageSrc(imageToCrop);
    } else {
      setCropperImageSrc(null);
    }
    resetCropperAdjustments();
    setModalVisible(true);
  };

  const handleFileChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      const file = info.file.originFileObj as RcFile;
      fileRef.current = file;
      getBase64(file, (url) => {
        setCropperImageSrc(url);
        resetCropperAdjustments();
        setModalVisible(true);
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleOk = async () => {
    if (!cropperImageSrc || !croppedAreaPixels) {
      message.error('No image selected or cropped area defined.');
      return;
    }

    onUploadStart?.();
    try {
      const croppedBlob = await getCroppedImg(
        cropperImageSrc,
        croppedAreaPixels,
        rotation
      );

      if (!croppedBlob) {
        message.error('Failed to crop image.');
        return;
      }

      const originalFileName = fileRef.current?.name || 'avatar.jpeg';
      const fileName = `${userId}/${Date.now()}-${originalFileName}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, croppedBlob, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'image/jpeg',
        });

      if (uploadError) {
        console.error(
          'Supabase Storage Upload Error:',
          uploadError.message,
          uploadError
        );
        message.error('Failed to upload image: ' + uploadError.message);
        return;
      }

      const { data: publicURLData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      if (!publicURLData || !publicURLData.publicUrl) {
        console.error('Failed to get public URL for uploaded image.');
        message.error('Failed to get public URL for image.');
        return;
      }

      onUploadSuccess(publicURLData.publicUrl);
      message.success(
        'Image uploaded successfully! Click "Save Changes" to update your profile.'
      );
      setModalVisible(false);
      resetCropperState();
    } catch (error: any) {
      console.error('General upload error:', error.message);
      message.error('An unexpected error occurred during image upload.');
    } finally {
      onUploadEnd?.();
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    resetCropperState();
  };

  const handleRemovePicture = async () => {
    if (!initialImageUrl) {
      message.info('No profile picture to remove.');
      return;
    }

    Modal.confirm({
      title: 'Confirm Removal',
      content:
        'Are you sure you want to remove your profile picture? This action cannot be undone.',
      okText: 'Remove',
      okType: 'danger',
      onOk: async () => {
        onUploadStart?.();
        try {
          const urlParts = initialImageUrl.split('/');
          const bucketName = 'avatars';
          const filePathIndex = urlParts.findIndex(
            (part) => part === bucketName
          );
          const filePath = urlParts.slice(filePathIndex + 1).join('/');

          if (!filePath) {
            message.error('Could not determine file path for deletion.');
            return;
          }

          const { error: deleteError } = await supabase.storage
            .from(bucketName)
            .remove([filePath]);

          if (deleteError) {
            console.error(
              'Supabase Storage Deletion Error:',
              deleteError.message,
              deleteError
            );
            message.error('Failed to remove image: ' + deleteError.message);
            return;
          }

          onUploadSuccess(null);
          message.success(
            'Profile picture removed successfully! Click "Save Changes" to update your profile.'
          );
          setModalVisible(false);
          resetCropperState();
        } catch (error: any) {
          console.error('General removal error:', error.message);
          message.error('An unexpected error occurred during image removal.');
        } finally {
          onUploadEnd?.();
        }
      },
      okButtonProps: { loading: loading },
    });
  };

  return (
    <>
      <div
        style={{
          position: 'relative',
          width: 100,
          height: 100,
          cursor: 'pointer',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleOpenModal(initialImageUrl)}
      >
        {initialImageUrl && !loading ? (
          <Avatar size={100} src={initialImageUrl} />
        ) : (
          <Avatar
            size={100}
            icon={loading ? <LoadingOutlined /> : <UserOutlined />}
          />
        )}

        {/* Hover overlay and icon */}
        {isHovered && !loading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: 24,
            }}
          >
            <EditOutlined />
          </div>
        )}
      </div>

      <Modal
        title="Edit Profile Picture"
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        confirmLoading={loading}
        okText={loading ? 'Processing...' : 'Apply & Save'}
        cancelButtonProps={{ disabled: loading }}
        maskClosable={!loading}
        closable={!loading}
        footer={[
          initialImageUrl && (
            <Button
              key="remove"
              danger
              onClick={handleRemovePicture}
              disabled={loading}
              icon={<DeleteOutlined />}
            >
              Remove Picture
            </Button>
          ),
          <Upload
            key="upload-new"
            name="avatar-new-modal"
            showUploadList={false}
            accept="image/*"
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                if (onSuccess) onSuccess('ok');
              }, 0);
            }}
            onChange={handleFileChange}
            disabled={loading}
          >
            <Button disabled={loading} icon={<UploadOutlined />}>
              Upload New
            </Button>
          </Upload>,
          <Button key="cancel" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            loading={loading}
            disabled={!cropperImageSrc || loading}
          >
            {loading ? 'Processing...' : 'Apply & Save'}
          </Button>,
        ]}
      >
        {cropperImageSrc ? (
          <>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 400,
                background: '#333',
              }}
            >
              <Cropper
                image={cropperImageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                cropShape="round"
                showGrid={false}
              />
            </div>
            <div style={{ padding: '20px 0' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ZoomOutOutlined style={{ fontSize: 16 }} />
                  <Slider
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={setZoom}
                    style={{ flexGrow: 1 }}
                    tooltip={{
                      formatter: (val) => `Zoom: ${val?.toFixed(1)}x`,
                    }}
                    disabled={loading}
                  />
                  <ZoomOutOutlined style={{ fontSize: 16 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <RotateRightOutlined style={{ fontSize: 16 }} />
                  <Slider
                    min={0}
                    max={360}
                    step={1}
                    value={rotation}
                    onChange={setRotation}
                    style={{ flexGrow: 1 }}
                    tooltip={{ formatter: (val) => `Rotation: ${val}°` }}
                    disabled={loading}
                  />
                  <Text style={{ minWidth: 40, textAlign: 'right' }}>
                    {rotation}°
                  </Text>
                </div>
              </Space>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <p>No image selected for cropping.</p>
            <p>
              Use the "Upload New" button below to select a picture, or click
              "Cancel".
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProfilePictureUploader;
