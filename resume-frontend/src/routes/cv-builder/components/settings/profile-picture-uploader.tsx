import React, { useState, useCallback, useRef } from 'react';
import { Upload, message, Modal, Slider, Typography, Space } from 'antd';
import {
  UserOutlined,
  LoadingOutlined,
  RotateRightOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Avatar } from 'antd';
import Cropper from 'react-easy-crop';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile } from 'antd/es/upload/interface';
import { supabase } from 'core/lib/supabaseClient'; // Ensure this path is correct

const { Text } = Typography;

interface ProfilePictureUploaderProps {
  initialImageUrl?: string;
  userId: string;
  onUploadSuccess: (publicUrl: string) => void;
  loading: boolean;
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
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
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

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas origin to the center of the image
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels values are relative to the rotated image
  // so we need to translate them back to the original image context
  const data = ctx.getImageData(
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  // set canvas width to final desired cropped image size - this will clear the canvas
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  // paste generated rotated image at the top left corner
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
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileRef = useRef<RcFile | null>(null);

  const handleFileChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      const file = info.file.originFileObj as RcFile;
      fileRef.current = file;
      getBase64(file, (url) => {
        setImageSrc(url);
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
    if (!imageSrc || !croppedAreaPixels || !fileRef.current) {
      message.error('No image selected or cropped area defined.');
      return;
    }

    setUploadingImage(true);
    try {
      const croppedBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );

      if (!croppedBlob) {
        message.error('Failed to crop image.');
        setUploadingImage(false);
        return;
      }

      const fileName = `${userId}/${Date.now()}-${fileRef.current.name}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, croppedBlob, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'image/jpeg', // Ensure correct content type for blobs
        });

      if (uploadError) {
        console.error(
          'Supabase Storage Upload Error:',
          uploadError.message,
          uploadError
        );
        message.error('Failed to upload image: ' + uploadError.message);
        setUploadingImage(false);
        return;
      }

      const { data: publicURLData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      if (!publicURLData || !publicURLData.publicUrl) {
        console.error('Failed to get public URL for uploaded image.');
        message.error('Failed to get public URL for image.');
        setUploadingImage(false);
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
      setUploadingImage(false);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    resetCropperState();
  };

  const resetCropperState = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    fileRef.current = null;
  };

  const uploadButton = (
    <div>
      {loading || uploadingImage ? <LoadingOutlined /> : <UserOutlined />}
      <div style={{ marginTop: 8 }}>
        {loading || uploadingImage ? 'Uploading' : 'Change'}
      </div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        accept="image/*"
        customRequest={({ file, onSuccess }) => {
          // This customRequest allows us to intercept the file before Ant Design's default upload.
          // We mark it as 'done' so onChange is triggered, and handle the actual upload in handleOk.
          setTimeout(() => {
            if (onSuccess) onSuccess('ok');
          }, 0);
        }}
        onChange={handleFileChange}
        disabled={loading || uploadingImage}
      >
        {initialImageUrl && !loading && !uploadingImage ? (
          <Avatar size={100} src={initialImageUrl} />
        ) : (
          uploadButton
        )}
      </Upload>

      <Modal
        title="Crop and Adjust Image"
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        confirmLoading={uploadingImage}
        okText={uploadingImage ? 'Uploading...' : 'Apply & Upload'}
        cancelButtonProps={{ disabled: uploadingImage }}
        maskClosable={!uploadingImage}
        closable={!uploadingImage}
      >
        {imageSrc && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 400,
              background: '#333',
            }}
          >
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1} // Square aspect ratio for avatar
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              cropShape="round" // Make it round for avatars
              showGrid={false}
            />
          </div>
        )}
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
                tooltip={{ formatter: (val) => `Zoom: ${val?.toFixed(1)}x` }}
                disabled={uploadingImage}
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
                disabled={uploadingImage}
              />
              <Text style={{ minWidth: 40, textAlign: 'right' }}>
                {rotation}°
              </Text>
            </div>
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default ProfilePictureUploader;
