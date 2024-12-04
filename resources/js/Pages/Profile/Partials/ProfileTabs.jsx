import React from 'react';
import { Tabs, Card, Badge, Button, Tooltip, Empty } from 'antd';
import { 
  UserOutlined, 
  CalendarOutlined, 
  TrophyOutlined,
  SettingOutlined,
  BookOutlined,
  TeamOutlined,
  BankOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import ProfileInfo from '../components/ProfileInfo';
import UserEvents from '../components/UserEvents';
import UserPoints from '../components/UserPoints';
import UpdateProfileInformationForm from './UpdateProfileInformationForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import DeleteUserForm from './DeleteUserForm';

const { TabPane } = Tabs;

export default function ProfileTabs({
  user,
  personalInformation,
  educationalBackground,
  additionalInformation,
  emergencyContact,
  userEvents,
  isLoadingEvents,
  redemptionOptions,
  isLoadingOptions,
  handleOpenGCashModal,
  mustVerifyEmail,
  status
}) {
  // Custom tab items with icons and badges
  const tabItems = [
    {
      key: "1",
      label: (
        <span className="flex items-center gap-2">
          <UserOutlined />
          Profile
        </span>
      ),
      children: (
        <div className="bg-white rounded-lg">
          <ProfileInfo
            personalInformation={personalInformation}
            educationalBackground={educationalBackground}
            additionalInformation={additionalInformation}
            emergencyContact={emergencyContact}
          />
        </div>
      )
    },
    {
      key: "2",
      label: (
        <span className="flex items-center gap-2">
          <CalendarOutlined />
          Your Events
          {userEvents?.length > 0 && (
            <Badge 
              count={userEvents.length} 
              size="small"
              style={{ backgroundColor: '#52c41a' }}
            />
          )}
        </span>
      ),
      children: (
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Events</h2>
            <Tooltip title="Browse More Events">
              <Button 
                type="primary"
                icon={<CalendarOutlined />}
                href={route('events.index')}
              >
                Browse Events
              </Button>
            </Tooltip>
          </div>
          <UserEvents 
            userEvents={userEvents} 
            isLoadingEvents={isLoadingEvents} 
          />
        </div>
      )
    },
    {
      key: "3",
      label: (
        <span className="flex items-center gap-2">
          <TrophyOutlined />
          Your Points
          <Badge 
            count={user?.youth_points || 0} 
            style={{ 
              backgroundColor: user?.youth_points > 0 ? '#52c41a' : '#d9d9d9'
            }}
          />
        </span>
      ),
      children: (
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Points & Rewards</h2>
            <div className="flex items-center gap-2">
              <Badge 
                count={`${user?.youth_points || 0} Points Available`}
                style={{ backgroundColor: '#52c41a' }}
              />
            </div>
          </div>
          <UserPoints
            userPoints={user?.youth_points}
            redemptionOptions={redemptionOptions}
            isLoadingOptions={isLoadingOptions}
            handleOpenGCashModal={handleOpenGCashModal}
          />
        </div>
      )
    },
    {
      key: "4",
      label: (
        <span className="flex items-center gap-2">
          <SettingOutlined />
          Account Settings
        </span>
      ),
      children: (
        <div className="py-6">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            {/* Profile Information */}
            <Card 
              title={
                <span className="flex items-center gap-2">
                  <EditOutlined />
                  Profile Information
                </span>
              }
              bordered={false}
              className="shadow-sm hover:shadow-md transition-all"
            >
              <UpdateProfileInformationForm
                mustVerifyEmail={mustVerifyEmail}
                status={status}
                className="max-w-xl"
              />
            </Card>

            {/* Password Update */}
            <Card 
              title={
                <span className="flex items-center gap-2">
                  <TeamOutlined />
                  Update Password
                </span>
              }
              bordered={false}
              className="shadow-sm hover:shadow-md transition-all"
            >
              <UpdatePasswordForm className="max-w-xl" />
            </Card>

            {/* Delete Account */}
            <Card 
              title={
                <span className="flex items-center gap-2 text-red-500">
                  <DeleteOutlined />
                  Delete Account
                </span>
              }
              bordered={false}
              className="shadow-sm hover:shadow-md transition-all"
            >
              <DeleteUserForm className="max-w-xl" />
            </Card>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
      <Card className="shadow-sm">
        <Tabs 
          defaultActiveKey="1" 
          items={tabItems}
          className="profile-tabs"
          animated={{ tabPane: true }}
          size="large"
          tabBarGutter={24}
          tabBarStyle={{
            marginBottom: 24,
            borderBottom: '1px solid #f0f0f0',
            paddingBottom: 0
          }}
        />
      </Card>
    </div>
  );
}