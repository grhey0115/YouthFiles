import React from 'react';
import { Card, Descriptions, Badge, Divider } from 'antd';
import { 
  UserOutlined, 
  BookOutlined, 
  InfoCircleOutlined, 
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
  TeamOutlined,
  HeartOutlined
} from '@ant-design/icons';

const DescriptionItem = ({ label, value, icon }) => (
  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
    {icon && <span className="text-gray-500 mt-1">{icon}</span>}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || 'Not provided'}</p>
    </div>
  </div>
);

export default function ProfileInfo({ 
  personalInformation, 
  educationalBackground, 
  additionalInformation, 
  emergencyContact 
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card 
          title={
            <div className="flex items-center gap-2">
              <UserOutlined />
              <span>Personal Information</span>
            </div>
          }
          className="shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="grid gap-4">
            <DescriptionItem 
              label="Sitio"
              value={personalInformation?.sitio}
              icon={<HomeOutlined />}
            />
            <DescriptionItem 
              label="Birth Date & Age"
              value={`${personalInformation?.date_of_birth} (${personalInformation?.age} years old)`}
              icon={<CalendarOutlined />}
            />
            <DescriptionItem 
              label="Civil Status"
              value={personalInformation?.civil_status}
              icon={<HeartOutlined />}
            />
            <DescriptionItem 
              label="Family Members"
              value={`${personalInformation?.family_members} members, ${personalInformation?.siblings} siblings`}
              icon={<TeamOutlined />}
            />
          </div>
        </Card>

        {/* Educational Background */}
        <Card 
          title={
            <div className="flex items-center gap-2">
              <BookOutlined />
              <span>Educational Background</span>
            </div>
          }
          className="shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="grid gap-4">
            <DescriptionItem 
              label="Current Status"
              value={
                <Badge 
                  status={educationalBackground?.current_status === 'Studying' ? 'processing' : 'success'} 
                  text={educationalBackground?.current_status}
                />
              }
            />
            <DescriptionItem 
              label="Course & Year Level"
              value={`${educationalBackground?.course} (${educationalBackground?.year_level})`}
            />
            <DescriptionItem 
              label="Year Graduated"
              value={educationalBackground?.year_graduated}
            />
          </div>
        </Card>

        {/* Additional Information */}
        <Card 
          title={
            <div className="flex items-center gap-2">
              <InfoCircleOutlined />
              <span>Additional Information</span>
            </div>
          }
          className="shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="grid gap-4">
            {/* Convert boolean values to badges */}
            {Object.entries({
              'Currently Working': additionalInformation?.is_currently_working === "1",
              'PWD': additionalInformation?.is_pwd === "1",
              'Indigenous': additionalInformation?.is_indigenous === "1",
              'Registered Voter': additionalInformation?.is_registered_voter === "1",
              'Attended Assembly': additionalInformation?.attended_assembly === "1"
            }).map(([label, value]) => (
              <DescriptionItem 
                key={label}
                label={label}
                value={
                  <Badge 
                    status={value ? 'success' : 'default'} 
                    text={value ? 'Yes' : 'No'}
                  />
                }
              />
            ))}
            <DescriptionItem 
              label="Hobbies"
              value={additionalInformation?.hobbies?.join(", ")}
            />
          </div>
        </Card>

        {/* Emergency Contact */}
        <Card 
          title={
            <div className="flex items-center gap-2">
              <PhoneOutlined />
              <span>Emergency Contact</span>
            </div>
          }
          className="shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="grid gap-4">
            <DescriptionItem 
              label="Name & Relationship"
              value={`${emergencyContact?.name} (${emergencyContact?.relationship})`}
            />
            <DescriptionItem 
              label="Contact Number"
              value={emergencyContact?.contact_number}
            />
            <DescriptionItem 
              label="Address"
              value={emergencyContact?.address}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}