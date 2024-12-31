import React from 'react';
import { Tabs, Card, Badge, Button, Tooltip, Empty, Divider } from 'antd';
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
import { 
  UserCircle, 
  KeyRound, 
  AlertTriangle,
  Mail,
  Shield
} from 'lucide-react';
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
      <div className="max-w-4xl mx-auto space-y-6">
        {status && (
          <Alert className="mb-6">
            <AlertDescription>{status}</AlertDescription>
          </Alert>
        )}

        {/* Profile Information Section */}
        <Card 
          title={
            <div className="flex items-center gap-3">
              <UserCircle className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Profile Information</h3>
                <p className="text-sm text-gray-500 font-normal">
                  Update your account's profile information and email address
                </p>
              </div>
            </div>
          }
          className="shadow-sm hover:shadow-md transition-all duration-200"
        >
          <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
            className="max-w-xl"
          />
          
          {mustVerifyEmail && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-amber-600">
                <Mail className="h-5 w-5" />
                <span className="text-sm">
                  Your email address is unverified
                </span>
              </div>
            </div>
          )}
        </Card>

        {/* Security Section */}
        <Card 
          title={
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Security</h3>
                <p className="text-sm text-gray-500 font-normal">
                  Ensure your account stays secure by updating your password regularly
                </p>
              </div>
            </div>
          }
          className="shadow-sm hover:shadow-md transition-all duration-200"
        >
          <UpdatePasswordForm className="max-w-xl" />
        </Card>

        {/* Danger Zone */}
        <Card 
          title={
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-red-500">Danger Zone</h3>
                <p className="text-sm text-gray-500 font-normal">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
              </div>
            </div>
          }
          className="border-red-100 shadow-sm hover:shadow-md transition-all duration-200"
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