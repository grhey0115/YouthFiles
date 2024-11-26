import React from 'react';
import { Tabs, Card } from 'antd';
import ProfileInfo from '../components/ProfileInfo';
import UserEvents from '../components/UserEvents';
import UserPoints from '../components/UserPoints';
import UpdateProfileInformationForm from '../Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from '../Partials/UpdatePasswordForm';
import DeleteUserForm from '../Partials/DeleteUserForm';

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
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white shadow-sm sm:rounded-lg">
      <Tabs defaultActiveKey="1" centered className="profile-tabs">
        <TabPane tab="Profile" key="1">
          <ProfileInfo
            personalInformation={personalInformation}
            educationalBackground={educationalBackground}
            additionalInformation={additionalInformation}
            emergencyContact={emergencyContact}
          />
        </TabPane>

        <TabPane tab="Your Events" key="2">
          <UserEvents 
            userEvents={userEvents} 
            isLoadingEvents={isLoadingEvents} 
          />
        </TabPane>

        <TabPane tab="Your Points" key="3">
          <UserPoints
            userPoints={user?.youth_points}
            redemptionOptions={redemptionOptions}
            isLoadingOptions={isLoadingOptions}
            handleOpenGCashModal={handleOpenGCashModal}
          />
        </TabPane>

        <TabPane tab="Account Settings" key="4">
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
              <Card bordered={false}>
                <UpdateProfileInformationForm
                  mustVerifyEmail={mustVerifyEmail}
                  status={status}
                  className="max-w-xl"
                />
              </Card>

              <Card bordered={false}>
                <UpdatePasswordForm className="max-w-xl" />
              </Card>

              <Card bordered={false}>
                <DeleteUserForm className="max-w-xl" />
              </Card>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}