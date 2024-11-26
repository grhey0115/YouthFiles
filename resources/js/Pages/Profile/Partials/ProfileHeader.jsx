import React, { useState } from 'react';
import { Avatar, Card, Button, Upload, message } from 'antd';
import { UserOutlined, CheckCircleFilled } from '@ant-design/icons';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';

export default function ProfileHeader({ user }) {
  const [avatarUrl, setAvatarUrl] = useState(
    user.avatar 
      ? `/storage/avatars/${user.avatar}` 
      : "/default_avatar1.png"
  );

  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.post(route('profile.updateAvatar'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setAvatarUrl(response.data.avatar);
      message.success(response.data.message);
      onSuccess(response.data);
    } catch (error) {
      console.error('Avatar upload error:', error);
      
      if (error.response) {
        console.error('Server responded with:', error.response.data);
        message.error(
          error.response.data.message || 
          error.response.data.error || 
          'Failed to upload avatar'
        );
      } else if (error.request) {
        console.error('No response received:', error.request);
        message.error('No response from server');
      } else {
        console.error('Error setting up request:', error.message);
        message.error('Error uploading avatar');
      }

      onError(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Card
        bordered={false}
        className="flex items-center bg-gradient-to-r from-red-500 to-gray-700 text-white p-6 rounded-t-lg relative"
      >
        <div className="relative inline-block">
          <Avatar
            src={avatarUrl}
            size={100}
            icon={<UserOutlined />}
            alt="User Avatar"
            className="object-cover"
          />
          {/* Verification Badge - Positioned at the bottom center */}
          
          <Upload
            name="avatar"
            accept="image/*"
            showUploadList={false}
            customRequest={customRequest}
          >
            <Button
              icon={<FaCamera />}
              className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700"
              style={{ 
                position: 'absolute', 
                bottom: '-3px', 
                right: '5px',
                zIndex: 10 
              }}
            />
          </Upload>
        </div>
        <div className="ml-4 flex flex-col">
            <div className="flex items-center">
                <h1 className="text-xl font-semibold mr-2">
                {user?.first_name} {user?.last_name}
                </h1>
                {user.account_status === 'verified' && (
                <CheckCircleFilled 
                    style={{ 
                    color: '#1877F2', // Facebook blue
                    fontSize: '16px' 
                    }} 
                />
                )}
            </div>
            <p className="text-gray-200">
                {user?.email}
            </p>
            </div>
      </Card>
    </div>
  );
}